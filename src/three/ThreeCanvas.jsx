import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Box, Eye, Wind, RefreshCw, Upload, Maximize2, Layers } from 'lucide-react';

export default function ThreeCanvas({ initialModel = 'jet' }) {
  const mountRef = useRef(null);
  const [activeModel, setActiveModel] = useState(initialModel);
  const [wireframe, setWireframe] = useState(false);
  const [showAirflow, setShowAirflow] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [customFileName, setCustomFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // References to Three.js internal objects
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const currentObjectRef = useRef(null);
  const propellersRef = useRef([]);
  const airflowParticlesRef = useRef(null);
  const explodedPartsRef = useRef([]);
  const animFrameIdRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b14);
    sceneRef.current = scene;

    // Subtle Aerospace Coordinate Grid
    const grid = new THREE.GridHelper(20, 20, 0x00f0ff, 0x1e293b);
    grid.position.y = -2;
    scene.add(grid);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(7, 5, 10);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 25;
    controls.minDistance = 2;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00f0ff, 1.2);
    dirLight2.position.set(-10, -5, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x00f0ff, 2, 20);
    pointLight.position.set(0, 3, 0);
    scene.add(pointLight);

    // 6. Airflow Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      speeds[i] = 0.08 + Math.random() * 0.08;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const airflowParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(airflowParticles);
    airflowParticlesRef.current = { mesh: airflowParticles, speeds };

    // 7. Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Spin Drone Propellers
      if (propellersRef.current && propellersRef.current.length > 0) {
        propellersRef.current.forEach((prop, idx) => {
          const dir = idx % 2 === 0 ? 1 : -1;
          prop.rotation.y += 25 * delta * dir;
        });
      }

      // Animate Airflow particles
      if (airflowParticlesRef.current && airflowParticlesRef.current.mesh.visible) {
        const pos = airflowParticlesRef.current.mesh.geometry.attributes.position.array;
        const spd = airflowParticlesRef.current.speeds;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3] += spd[i]; // Move forward along X
          if (pos[i * 3] > 8) {
            pos[i * 3] = -8;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
          }
        }
        airflowParticlesRef.current.mesh.geometry.attributes.position.needsUpdate = true;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!currentMount || !renderer || !camera) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (renderer && renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Airflow Visibility
  useEffect(() => {
    if (airflowParticlesRef.current) {
      airflowParticlesRef.current.mesh.visible = showAirflow;
    }
  }, [showAirflow]);

  // Handle Model Loading when activeModel changes
  useEffect(() => {
    loadSelectedModel(activeModel);
  }, [activeModel, wireframe, exploded]);

  const clearCurrentObject = () => {
    if (currentObjectRef.current && sceneRef.current) {
      sceneRef.current.remove(currentObjectRef.current);
      currentObjectRef.current = null;
    }
    propellersRef.current = [];
    explodedPartsRef.current = [];
  };

  const loadSelectedModel = (modelType) => {
    const scene = sceneRef.current;
    if (!scene) return;
    clearCurrentObject();

    const matColor = wireframe ? 0x00f0ff : 0x1e293b;
    const bodyMat = new THREE.MeshStandardMaterial({
      color: matColor,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: wireframe
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.3,
      metalness: 0.9,
      wireframe: wireframe
    });

    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: wireframe
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.65,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      wireframe: wireframe
    });

    if (modelType === 'jet') {
      // ----------------------------------------------------
      // PROCEDURAL 4.5-GEN INTERCEPTOR JET
      // ----------------------------------------------------
      const jetGroup = new THREE.Group();

      // Fuselage Center Body
      const fuselageGeo = new THREE.ConeGeometry(0.8, 6.5, 16);
      fuselageGeo.rotateZ(-Math.PI / 2);
      const fuselage = new THREE.Mesh(fuselageGeo, bodyMat);
      fuselage.scale.set(1, 0.6, 1.2);
      jetGroup.add(fuselage);

      // Cockpit Canopy
      const canopyGeo = new THREE.SphereGeometry(0.5, 16, 12);
      canopyGeo.scale(2.2, 0.7, 0.8);
      const canopy = new THREE.Mesh(canopyGeo, glassMat);
      canopy.position.set(0.6, 0.45, 0);
      jetGroup.add(canopy);

      // 45-Degree Swept Delta Wings
      const wingShape = new THREE.Shape();
      wingShape.moveTo(1.5, 0);
      wingShape.lineTo(-2.0, 3.8); // Swept tip
      wingShape.lineTo(-2.8, 3.8); // Trailing tip
      wingShape.lineTo(-2.4, 0);   // Trailing root
      wingShape.closePath();

      const extrudeSettings = { depth: 0.08, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
      const rightWingGeo = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);
      rightWingGeo.rotateX(Math.PI / 2);
      const rightWing = new THREE.Mesh(rightWingGeo, accentMat);
      rightWing.position.set(0, 0, 0);
      jetGroup.add(rightWing);

      const leftWingGeo = rightWingGeo.clone();
      leftWingGeo.scale(1, 1, -1);
      const leftWing = new THREE.Mesh(leftWingGeo, accentMat);
      jetGroup.add(leftWing);

      // Twin Canted Vertical Stabilizers
      const finShape = new THREE.Shape();
      finShape.moveTo(0, 0);
      finShape.lineTo(-1.2, 1.6);
      finShape.lineTo(-1.8, 1.6);
      finShape.lineTo(-1.6, 0);
      finShape.closePath();

      const finGeo = new THREE.ExtrudeGeometry(finShape, extrudeSettings);
      const rightFin = new THREE.Mesh(finGeo, accentMat);
      rightFin.position.set(-1.0, 0.2, 0.7);
      rightFin.rotation.x = -0.25; // Canted outwards for stealth
      jetGroup.add(rightFin);

      const leftFin = new THREE.Mesh(finGeo, accentMat);
      leftFin.position.set(-1.0, 0.2, -0.7);
      leftFin.rotation.x = 0.25;
      jetGroup.add(leftFin);

      // Dual Afterburner Exhaust Nozzles
      const exhaustGeo = new THREE.CylinderGeometry(0.32, 0.35, 0.6, 16);
      exhaustGeo.rotateZ(Math.PI / 2);
      const exhaust1 = new THREE.Mesh(exhaustGeo, bodyMat);
      exhaust1.position.set(-3.2, 0.05, 0.45);
      jetGroup.add(exhaust1);

      const exhaust2 = new THREE.Mesh(exhaustGeo, bodyMat);
      exhaust2.position.set(-3.2, 0.05, -0.45);
      jetGroup.add(exhaust2);

      // Afterburner Core Glow Rings
      const glowGeo = new THREE.RingGeometry(0.1, 0.28, 16);
      glowGeo.rotateY(Math.PI / 2);
      const glow1 = new THREE.Mesh(glowGeo, glowMat);
      glow1.position.set(-3.51, 0.05, 0.45);
      jetGroup.add(glow1);

      const glow2 = new THREE.Mesh(glowGeo, glowMat);
      glow2.position.set(-3.51, 0.05, -0.45);
      jetGroup.add(glow2);

      scene.add(jetGroup);
      currentObjectRef.current = jetGroup;

    } else if (modelType === 'drone') {
      // ----------------------------------------------------
      // PROCEDURAL QUADCOPTER DRONE WITH SPINNING ROTORS
      // ----------------------------------------------------
      const droneGroup = new THREE.Group();
      const explodedParts = [];

      // Central Hub Plates
      const hubGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 16);
      const topPlate = new THREE.Mesh(hubGeo, accentMat);
      topPlate.position.y = exploded ? 0.8 : 0.15;
      droneGroup.add(topPlate);
      explodedParts.push({ mesh: topPlate, defaultY: 0.15, explodedY: 0.8 });

      const bottomPlate = new THREE.Mesh(hubGeo, accentMat);
      bottomPlate.position.y = exploded ? -0.8 : -0.15;
      droneGroup.add(bottomPlate);
      explodedParts.push({ mesh: bottomPlate, defaultY: -0.15, explodedY: -0.8 });

      // Core Avionics / Flight Controller Stack
      const fcGeo = new THREE.BoxGeometry(0.8, 0.3, 0.8);
      const fc = new THREE.Mesh(fcGeo, bodyMat);
      droneGroup.add(fc);

      // 4 Carbon Fiber Tubular Arms & Motors
      const armAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
      const armLength = 3.2;
      const propellers = [];

      armAngles.forEach((angle, idx) => {
        const armSubGroup = new THREE.Group();

        const armGeo = new THREE.CylinderGeometry(0.09, 0.09, armLength, 12);
        armGeo.rotateZ(Math.PI / 2);
        const arm = new THREE.Mesh(armGeo, bodyMat);
        arm.position.x = armLength / 2;
        armSubGroup.add(arm);

        // Brushless Motor Pod
        const motorGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.4, 16);
        const motor = new THREE.Mesh(motorGeo, accentMat);
        motor.position.set(armLength, 0.2, 0);
        armSubGroup.add(motor);

        // Propeller Rotor Blades
        const propGeo = new THREE.BoxGeometry(1.6, 0.03, 0.18);
        const prop = new THREE.Mesh(propGeo, glowMat);
        prop.position.set(armLength, 0.45, 0);
        armSubGroup.add(prop);
        propellers.push(prop);

        // Position sub group by angle
        armSubGroup.rotation.y = angle;
        if (exploded) {
          armSubGroup.position.x = Math.cos(angle) * 0.6;
          armSubGroup.position.z = Math.sin(angle) * 0.6;
        }

        droneGroup.add(armSubGroup);
        explodedParts.push({ mesh: armSubGroup, defaultX: 0, explodedX: Math.cos(angle) * 0.6, defaultZ: 0, explodedZ: Math.sin(angle) * 0.6 });
      });

      propellersRef.current = propellers;
      explodedPartsRef.current = explodedParts;

      // Landing Skids
      const skidGeo = new THREE.TorusGeometry(1.8, 0.06, 8, 24, Math.PI);
      skidGeo.rotateX(Math.PI / 2);
      const skid1 = new THREE.Mesh(skidGeo, bodyMat);
      skid1.position.set(0, -1.2, 1.2);
      skid1.rotation.y = Math.PI / 2;
      droneGroup.add(skid1);

      const skid2 = new THREE.Mesh(skidGeo, bodyMat);
      skid2.position.set(0, -1.2, -1.2);
      skid2.rotation.y = Math.PI / 2;
      droneGroup.add(skid2);

      scene.add(droneGroup);
      currentObjectRef.current = droneGroup;

    } else if (modelType === 'airfoil') {
      // ----------------------------------------------------
      // PROCEDURAL NACA AIRFOIL SECTION
      // ----------------------------------------------------
      const airfoilGroup = new THREE.Group();

      const airfoilShape = new THREE.Shape();
      // Precise NACA 4-digit coordinates
      airfoilShape.moveTo(2.5, 0); // Trailing edge
      airfoilShape.bezierCurveTo(1.5, 0.4, 0.5, 0.6, -1.5, 0.5); // Upper camber
      airfoilShape.bezierCurveTo(-2.4, 0.4, -2.6, 0.0, -2.5, -0.05); // Rounded leading edge
      airfoilShape.bezierCurveTo(-2.0, -0.3, 0.0, -0.25, 2.5, 0); // Lower surface
      airfoilShape.closePath();

      const wingExtrude = { depth: 5, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.04, bevelThickness: 0.04 };
      const wingGeo = new THREE.ExtrudeGeometry(airfoilShape, wingExtrude);
      wingGeo.center();
      const wingMesh = new THREE.Mesh(wingGeo, accentMat);
      airfoilGroup.add(wingMesh);

      // Add boundary layer inflation lines
      const wireframeGeo = new THREE.WireframeGeometry(wingGeo);
      const wireframeLines = new THREE.LineSegments(wireframeGeo, new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25 }));
      airfoilGroup.add(wireframeLines);

      scene.add(airfoilGroup);
      currentObjectRef.current = airfoilGroup;
    }
  };

  // Drag and Drop GLTF Loader
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setCustomFileName(file.name);
    const url = URL.createObjectURL(file);
    const loader = new GLTFLoader();

    loader.load(
      url,
      (gltf) => {
        clearCurrentObject();
        const root = gltf.scene;

        // Auto-scale and center user's CAD model
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5 / (maxDim || 1);
        root.scale.set(scale, scale, scale);
        root.position.sub(center.multiplyScalar(scale));

        sceneRef.current.add(root);
        currentObjectRef.current = root;
        setLoading(false);
        setActiveModel('custom');
      },
      undefined,
      (error) => {
        console.error('Error loading custom GLTF/GLB:', error);
        alert('Could not load 3D file. Please upload a valid .GLB or .GLTF file.');
        setLoading(false);
      }
    );
  };

  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(7, 5, 10);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-[520px] rounded-2xl bg-[#080d1a] border border-sky-500/20 overflow-hidden shadow-2xl">
      
      {/* Top Controls Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Model Switcher Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 pointer-events-auto">
          <button
            onClick={() => setActiveModel('jet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${activeModel === 'jet' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            ✈️ 4.5-Gen Jet
          </button>
          <button
            onClick={() => setActiveModel('drone')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${activeModel === 'drone' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            🛸 UAS Drone
          </button>
          <button
            onClick={() => setActiveModel('airfoil')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${activeModel === 'airfoil' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            💨 NACA Airfoil
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${activeModel === 'custom' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-cyan-400 hover:bg-slate-800'}`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{customFileName ? customFileName.slice(0, 12) + '...' : 'Upload .GLB'}</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".glb,.gltf"
            className="hidden"
          />
        </div>

        {/* Viewport Action Toggles */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {activeModel === 'drone' && (
            <button
              onClick={() => setExploded(!exploded)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono backdrop-blur-md border transition-all flex items-center gap-1.5 ${exploded ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white'}`}
              title="Explode Assembly"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{exploded ? 'Exploded: ON' : 'Explode CAD'}</span>
            </button>
          )}

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono backdrop-blur-md border transition-all flex items-center gap-1.5 ${wireframe ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white'}`}
            title="Toggle Wireframe Mesh"
          >
            <Box className="w-3.5 h-3.5" />
            <span>{wireframe ? 'Mesh' : 'Shaded'}</span>
          </button>

          <button
            onClick={() => setShowAirflow(!showAirflow)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono backdrop-blur-md border transition-all flex items-center gap-1.5 ${showAirflow ? 'bg-sky-500/20 text-sky-300 border-sky-500/50' : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:text-white'}`}
            title="Toggle Wind Tunnel Streamlines"
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Airflow</span>
          </button>

          <button
            onClick={resetCamera}
            className="p-2 rounded-xl bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 transition-all"
            title="Reset Camera"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-30 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-cyan-300 mt-3">Parsing 3D CAD Mesh...</p>
        </div>
      )}

      {/* Bottom Telemetry HUD Overlay */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <div className="px-3.5 py-2 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-400 space-y-0.5">
          <div className="text-cyan-400 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            THREE.JS INTERACTIVE 3D VIEWPORT
          </div>
          <div>Rotate: <span className="text-slate-200">Left Click + Drag</span> | Zoom: <span className="text-slate-200">Scroll Wheel</span></div>
          <div>Renderer: <span className="text-sky-400">WebGL 2.0 (PBR Shading)</span></div>
        </div>
      </div>

      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

    </div>
  );
}
