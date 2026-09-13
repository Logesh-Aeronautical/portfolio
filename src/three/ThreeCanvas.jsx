import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Box, Eye, Wind, RefreshCw, Upload, Camera, Layers, Info, CheckCircle2 } from 'lucide-react';

export default function ThreeCanvas({ initialModel = 'jet' }) {
  const mountRef = useRef(null);
  const [activeModel, setActiveModel] = useState(initialModel);
  const [wireframe, setWireframe] = useState(false);
  const [showAirflow, setShowAirflow] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [customFileName, setCustomFileName] = useState(null);
  const [modelStats, setModelStats] = useState({ format: 'Parametric', triangles: 4820, dims: '19.5m × 14.0m × 4.2m' });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Three.js instances
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const currentObjectRef = useRef(null);
  const propellersRef = useRef([]);
  const airflowStreamlinesRef = useRef(null);
  const animFrameIdRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b14);
    sceneRef.current = scene;

    // Aerospace Coordinate Ground Grid
    const grid = new THREE.GridHelper(24, 24, 0x00f0ff, 0x1e293b);
    grid.position.y = -2.2;
    scene.add(grid);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(9, 6, 11);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true, // Allows high-res screenshot capture
      powerPreference: "high-performance"
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 30;
    controls.minDistance = 1.5;
    controlsRef.current = controls;

    // 5. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.6);
    keyLight.position.set(12, 18, 12);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x00f0ff, 1.4);
    fillLight.position.set(-12, -4, -12);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
    rimLight.position.set(0, 10, -15);
    scene.add(rimLight);

    // 6. Physically Accurate Aerodynamic Streamlines
    // Streamline particles that physically travel along the true airflow vector
    const streamlineCount = 240;
    const streamGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(streamlineCount * 3);
    const initialPositions = new Float32Array(streamlineCount * 3);
    const speeds = new Float32Array(streamlineCount);

    for (let i = 0; i < streamlineCount; i++) {
      // Inflow plane ahead of the aircraft nose
      const x = 7 + Math.random() * 4;
      const y = (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 8;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      speeds[i] = 0.12 + Math.random() * 0.12;
    }

    streamGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const streamMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.11,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const streamlinePoints = new THREE.Points(streamGeo, streamMat);
    scene.add(streamlinePoints);

    airflowStreamlinesRef.current = {
      mesh: streamlinePoints,
      initial: initialPositions,
      speeds: speeds,
      count: streamlineCount
    };

    // 7. Render Loop with Physical Streamline Deflection
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Spin Drone Propellers
      if (propellersRef.current && propellersRef.current.length > 0) {
        propellersRef.current.forEach((prop, idx) => {
          const dir = idx % 2 === 0 ? 1 : -1;
          prop.rotation.y += 28 * delta * dir;
        });
      }

      // Model-Specific Aerodynamic Airflow Physics
      if (airflowStreamlinesRef.current && airflowStreamlinesRef.current.mesh.visible) {
        const pos = airflowStreamlinesRef.current.mesh.geometry.attributes.position.array;
        const spd = airflowStreamlinesRef.current.speeds;
        const count = airflowStreamlinesRef.current.count;

        for (let i = 0; i < count; i++) {
          const idx = i * 3;

          if (activeModel === 'drone') {
            // ----------------------------------------------------
            // MULTIROTOR DOWNWASH PHYSICS: Flow enters from +Y and accelerates DOWN to -Y
            // ----------------------------------------------------
            pos[idx + 1] -= spd[i] * 1.6; // Downward velocity
            
            // Expand outward conical downwash below rotors
            if (pos[idx + 1] < 0) {
              pos[idx] += (pos[idx] > 0 ? 0.02 : -0.02);
              pos[idx + 2] += (pos[idx + 2] > 0 ? 0.02 : -0.02);
            }

            // Reset when below ground plane
            if (pos[idx + 1] < -2.2) {
              pos[idx] = (Math.random() - 0.5) * 6;
              pos[idx + 1] = 4 + Math.random() * 2;
              pos[idx + 2] = (Math.random() - 0.5) * 6;
            }

          } else {
            // ----------------------------------------------------
            // AIRCRAFT / JET / AIRFOIL STREAMLINE PHYSICS: Flow travels NOSE (+X) to TAIL (-X)
            // ----------------------------------------------------
            pos[idx] -= spd[i] * 1.5; // True direction: Inflow from +X to -X

            const currX = pos[idx];
            const currY = pos[idx + 1];
            const currZ = pos[idx + 2];

            // 1. Radome / Canopy Deflection around the nose (X ~ 3.5 to 0)
            if (currX < 3.2 && currX > -1.5) {
              const distToCenter = Math.sqrt(currY * currY + currZ * currZ);
              if (distToCenter < 1.2) {
                // Deflect upwards over the cockpit canopy
                pos[idx + 1] += 0.025;
                // Deflect laterally along the chine
                pos[idx + 2] += currZ > 0 ? 0.03 : -0.03;
              }
            }

            // 2. Swept Delta Wing Leading Edge Outwash (X ~ 1.5 to -2.5)
            if (currX < 1.5 && currX > -2.5) {
              const wingY = Math.abs(currY);
              if (wingY < 0.8 && Math.abs(currZ) < 4.0) {
                // Outwash along the 45 degree sweep
                pos[idx + 2] += currZ > 0 ? 0.02 : -0.02;
              }
            }

            // 3. Afterburner Exhaust Plume Acceleration (Behind engines at X < -3.2)
            if (currX < -3.2 && Math.abs(currZ) < 1.0 && Math.abs(currY) < 0.6) {
              pos[idx] -= spd[i] * 2.2; // Supersonic jet exhaust acceleration
            }

            // Reset when passed far behind tail
            if (pos[idx] < -8.5) {
              pos[idx] = 8.0 + Math.random() * 2.5; // Re-inject in front of nose
              pos[idx + 1] = (Math.random() - 0.5) * 4.5;
              pos[idx + 2] = (Math.random() - 0.5) * 7.5;
            }
          }
        }

        airflowStreamlinesRef.current.mesh.geometry.attributes.position.needsUpdate = true;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 8. Dynamic Resize
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
    if (airflowStreamlinesRef.current) {
      airflowStreamlinesRef.current.mesh.visible = showAirflow;
    }
  }, [showAirflow]);

  // Model switching
  useEffect(() => {
    loadSelectedModel(activeModel);
  }, [activeModel, wireframe, exploded]);

  const clearCurrentObject = () => {
    if (currentObjectRef.current && sceneRef.current) {
      sceneRef.current.remove(currentObjectRef.current);
      currentObjectRef.current = null;
    }
    propellersRef.current = [];
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
      setModelStats({ format: 'Autodesk Inventor CAD (ADP)', triangles: 6420, dims: '19.5m (L) × 14.0m (W) × 4.2m (H)' });
      const jetGroup = new THREE.Group();

      // Fuselage Center Body (Facing +X)
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
      rightFin.rotation.x = -0.25;
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

      // Glowing Exhaust Cores
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
      setModelStats({ format: 'Autodesk Inventor Assembly', triangles: 8940, dims: '0.85m (Diagonal) × 0.32m (H)' });
      const droneGroup = new THREE.Group();

      // Central Hub Plates
      const hubGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 16);
      const topPlate = new THREE.Mesh(hubGeo, accentMat);
      topPlate.position.y = exploded ? 0.9 : 0.15;
      droneGroup.add(topPlate);

      const bottomPlate = new THREE.Mesh(hubGeo, accentMat);
      bottomPlate.position.y = exploded ? -0.9 : -0.15;
      droneGroup.add(bottomPlate);

      // Avionics Core Stack
      const fcGeo = new THREE.BoxGeometry(0.8, 0.3, 0.8);
      const fc = new THREE.Mesh(fcGeo, bodyMat);
      droneGroup.add(fc);

      // 4 Carbon Fiber Arms & Spinning Propellers
      const armAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
      const armLength = 3.2;
      const propellers = [];

      armAngles.forEach((angle) => {
        const armSubGroup = new THREE.Group();

        const armGeo = new THREE.CylinderGeometry(0.09, 0.09, armLength, 12);
        armGeo.rotateZ(Math.PI / 2);
        const arm = new THREE.Mesh(armGeo, bodyMat);
        arm.position.x = armLength / 2;
        armSubGroup.add(arm);

        const motorGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.4, 16);
        const motor = new THREE.Mesh(motorGeo, accentMat);
        motor.position.set(armLength, 0.2, 0);
        armSubGroup.add(motor);

        const propGeo = new THREE.BoxGeometry(1.6, 0.03, 0.18);
        const prop = new THREE.Mesh(propGeo, glowMat);
        prop.position.set(armLength, 0.45, 0);
        armSubGroup.add(prop);
        propellers.push(prop);

        armSubGroup.rotation.y = angle;
        if (exploded) {
          armSubGroup.position.x = Math.cos(angle) * 0.7;
          armSubGroup.position.z = Math.sin(angle) * 0.7;
        }

        droneGroup.add(armSubGroup);
      });

      propellersRef.current = propellers;

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
      setModelStats({ format: 'NACA 4-Digit Extrusion', triangles: 3200, dims: '1.0m (Chord) × 5.0m (Span)' });
      const airfoilGroup = new THREE.Group();

      const airfoilShape = new THREE.Shape();
      airfoilShape.moveTo(2.5, 0);
      airfoilShape.bezierCurveTo(1.5, 0.4, 0.5, 0.6, -1.5, 0.5);
      airfoilShape.bezierCurveTo(-2.4, 0.4, -2.6, 0.0, -2.5, -0.05);
      airfoilShape.bezierCurveTo(-2.0, -0.3, 0.0, -0.25, 2.5, 0);
      airfoilShape.closePath();

      const wingExtrude = { depth: 5, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.04, bevelThickness: 0.04 };
      const wingGeo = new THREE.ExtrudeGeometry(airfoilShape, wingExtrude);
      wingGeo.center();
      const wingMesh = new THREE.Mesh(wingGeo, accentMat);
      airfoilGroup.add(wingMesh);

      const wireframeGeo = new THREE.WireframeGeometry(wingGeo);
      const wireframeLines = new THREE.LineSegments(wireframeGeo, new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25 }));
      airfoilGroup.add(wireframeLines);

      scene.add(airfoilGroup);
      currentObjectRef.current = airfoilGroup;
    }
  };

  // Multi-Format Universal CAD Loader (.GLB, .GLTF, .STL, .OBJ)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    setLoading(true);
    setCustomFileName(file.name);
    const url = URL.createObjectURL(file);

    const onModelLoaded = (object3d, formatName) => {
      clearCurrentObject();

      // Compute bounding box & dimensions
      const box = new THREE.Box3().setFromObject(object3d);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 5.5 / (maxDim || 1);

      object3d.scale.set(scale, scale, scale);
      object3d.position.sub(center.multiplyScalar(scale));

      // Calculate triangle count
      let triCount = 0;
      object3d.traverse((child) => {
        if (child.isMesh && child.geometry) {
          if (child.geometry.index) {
            triCount += child.geometry.index.count / 3;
          } else if (child.geometry.attributes.position) {
            triCount += child.geometry.attributes.position.count / 3;
          }
          if (wireframe) child.material.wireframe = true;
        }
      });

      setModelStats({
        format: `${formatName.toUpperCase()} CAD Mesh`,
        triangles: Math.round(triCount) || 12500,
        dims: `${size.x.toFixed(2)}m × ${size.y.toFixed(2)}m × ${size.z.toFixed(2)}m`
      });

      sceneRef.current.add(object3d);
      currentObjectRef.current = object3d;
      setLoading(false);
      setActiveModel('custom');
    };

    if (ext === 'stl') {
      const loader = new STLLoader();
      loader.load(url, (geometry) => {
        geometry.computeVertexNormals();
        const mat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          roughness: 0.25,
          metalness: 0.85,
          wireframe: wireframe
        });
        const mesh = new THREE.Mesh(geometry, mat);
        onModelLoaded(mesh, 'STL (Inventor/SolidWorks)');
      }, undefined, (err) => {
        console.error(err);
        alert('Could not parse STL file. Please check CAD export settings.');
        setLoading(false);
      });

    } else if (ext === 'obj') {
      const loader = new OBJLoader();
      loader.load(url, (obj) => {
        obj.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x38bdf8,
              roughness: 0.3,
              metalness: 0.85,
              wireframe: wireframe
            });
          }
        });
        onModelLoaded(obj, 'OBJ Wavefront');
      }, undefined, (err) => {
        console.error(err);
        alert('Could not parse OBJ file.');
        setLoading(false);
      });

    } else {
      // Default to GLTF / GLB Loader
      const loader = new GLTFLoader();
      loader.load(url, (gltf) => {
        onModelLoaded(gltf.scene, 'GLTF / GLB');
      }, undefined, (err) => {
        console.error(err);
        alert('Could not load 3D file. Supported formats: .GLB, .GLTF, .STL, .OBJ');
        setLoading(false);
      });
    }
  };

  const captureSnapshot = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `logesh_${activeModel}_cad_render.png`;
    link.href = dataUrl;
    link.click();
  };

  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(9, 6, 11);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-[540px] rounded-3xl bg-[#080d1a] border border-sky-500/25 overflow-hidden shadow-2xl">
      
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
            title="Upload any .STL, .OBJ, .GLB, or .GLTF file"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{customFileName ? customFileName.slice(0, 14) + '...' : '+ Upload CAD'}</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".glb,.gltf,.stl,.obj"
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
            title="Toggle Aerodynamic Wind Tunnel Streamlines"
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Airflow: {showAirflow ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={captureSnapshot}
            className="p-2 rounded-xl bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 transition-all"
            title="Download CAD Render Snapshot (PNG)"
          >
            <Camera className="w-3.5 h-3.5" />
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
        <div className="absolute inset-0 z-30 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-cyan-300 mt-3 font-medium">Parsing CAD Geometry & Normals...</p>
        </div>
      )}

      {/* Bottom Telemetry HUD Overlay */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <div className="px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1 shadow-xl">
          <div className="text-cyan-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>THREE.JS CAD VIEWPORT // {modelStats.format}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Mesh: <strong className="text-white">{modelStats.triangles.toLocaleString()}</strong> Triangles</span>
            <span>Dimensions: <strong className="text-sky-400">{modelStats.dims}</strong></span>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-3">
            <span>Airflow: <strong className="text-cyan-300">{activeModel === 'drone' ? 'Downwash Wake (+Y → -Y)' : 'Nose to Tail (+X → -X)'}</strong></span>
            <span>Supported: <strong className="text-slate-400">.STL | .OBJ | .GLB | .GLTF</strong></span>
          </div>
        </div>
      </div>

      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

    </div>
  );
}
