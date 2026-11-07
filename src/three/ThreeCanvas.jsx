import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Box, Eye, Wind, RefreshCw, Upload, Camera, Layers, Flame, Shield, CheckCircle2 } from 'lucide-react';

export default function ThreeCanvas({ initialModel = 'nozzle' }) {
  const mountRef = useRef(null);
  const [activeModel, setActiveModel] = useState(initialModel);
  const [wireframe, setWireframe] = useState(false);
  const [showAirflow, setShowAirflow] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [customFileName, setCustomFileName] = useState(null);
  const [modelStats, setModelStats] = useState({ format: 'Propulsion CAD', triangles: 5120, dims: '2.8m (L) × 1.4m (Ø)' });
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
    scene.background = new THREE.Color(0x060a07);
    sceneRef.current = scene;

    // Tactical HUD Ground Grid (Yellow & Deep Green)
    const grid = new THREE.GridHelper(24, 24, 0xfacc15, 0x182c1e);
    grid.position.y = -2.2;
    scene.add(grid);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(7, 5, 9);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    currentMount.replaceChildren(renderer.domElement);

    // 4. Studio Lighting Rig (Yellow Key Light & Green Fill Light)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfef08a, 2.0); // Warm yellow sunlight
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x4ade80, 1.2); // Green rim light
    dirLight2.position.set(-10, -5, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xfacc15, 2.0, 30);
    pointLight.position.set(0, 3, 5);
    scene.add(pointLight);

    // 5. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.minDistance = 2.5;
    controls.maxDistance = 40;
    controlsRef.current = controls;

    // 6. Dual-Stream Streamline Particle System (Yellow: Hot Core Flow, Green: Coolant Bleed Air)
    const streamlineCount = 380;
    const streamGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(streamlineCount * 3);
    const initialPositions = new Float32Array(streamlineCount * 3);
    const colors = new Float32Array(streamlineCount * 3);
    const speeds = new Float32Array(streamlineCount);
    const streamTypes = new Uint8Array(streamlineCount); // 0 = Core (Yellow), 1 = Bleed Coolant (Green)

    for (let i = 0; i < streamlineCount; i++) {
      const isBleed = i % 3 === 0;
      streamTypes[i] = isBleed ? 1 : 0;

      const x = 6 + Math.random() * 4;
      const y = (Math.random() - 0.5) * 4;
      const z = (Math.random() - 0.5) * 4;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      speeds[i] = 0.14 + Math.random() * 0.14;

      if (isBleed) {
        // Neon Coolant Green
        colors[i * 3] = 0.13;
        colors[i * 3 + 1] = 0.77;
        colors[i * 3 + 2] = 0.37;
      } else {
        // High-Temp Amber / Yellow Core
        colors[i * 3] = 0.98;
        colors[i * 3 + 1] = 0.80;
        colors[i * 3 + 2] = 0.08;
      }
    }

    streamGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    streamGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const streamMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const streamlinePoints = new THREE.Points(streamGeo, streamMat);
    scene.add(streamlinePoints);

    airflowStreamlinesRef.current = {
      mesh: streamlinePoints,
      initial: initialPositions,
      speeds: speeds,
      types: streamTypes,
      count: streamlineCount
    };

    // 7. Render Loop with Physical Fluid / Gas Dynamics
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Spin Drone Propellers if loaded
      if (propellersRef.current && propellersRef.current.length > 0) {
        propellersRef.current.forEach((prop, idx) => {
          const dir = idx % 2 === 0 ? 1 : -1;
          prop.rotation.y += 28 * delta * dir;
        });
      }

      // Model-Specific Streamline Physics
      if (airflowStreamlinesRef.current && airflowStreamlinesRef.current.mesh.visible) {
        const pos = airflowStreamlinesRef.current.mesh.geometry.attributes.position.array;
        const spd = airflowStreamlinesRef.current.speeds;
        const types = airflowStreamlinesRef.current.types;
        const count = airflowStreamlinesRef.current.count;

        for (let i = 0; i < count; i++) {
          const idx = i * 3;
          const currX = pos[idx];
          const currY = pos[idx + 1];
          const currZ = pos[idx + 2];

          if (activeModel === 'nozzle') {
            // JET NOZZLE GAS DYNAMICS: Core flow (Yellow) accelerates through convergent-divergent duct
            // Coolant Bleed Air (Green) wraps annular bypass jacket and enters liner
            const r = Math.sqrt(currY * currY + currZ * currZ);

            if (types[i] === 1) {
              // Bleed Coolant Circuit: Follows outer annular jacket (r ~ 1.1)
              pos[idx] -= spd[i] * 1.2;
              if (currX > -0.5 && currX < 2.0) {
                // Pinched along cooling duct
                const targetR = 1.15;
                if (r > 0.1) {
                  pos[idx + 1] += (currY / r) * (targetR - r) * 0.08;
                  pos[idx + 2] += (currZ / r) * (targetR - r) * 0.08;
                }
              }
            } else {
              // Hot Core Exhaust Gas: Choked at throat (X ~ 0), expands supersonically (X < 0)
              const throatSpeed = currX < 0 ? spd[i] * 2.8 : spd[i] * 1.5;
              pos[idx] -= throatSpeed;

              // Converge towards throat at X > 0, expand at X < 0
              if (currX > 0 && currX < 2.5 && r > 0.45) {
                pos[idx + 1] *= 0.96;
                pos[idx + 2] *= 0.96;
              } else if (currX <= 0 && currX > -3.5) {
                // Supersonic expansion plume angle
                pos[idx + 1] += (currY > 0 ? 0.025 : -0.025);
                pos[idx + 2] += (currZ > 0 ? 0.025 : -0.025);
              }
            }

            // Reset when far behind nozzle
            if (pos[idx] < -7.0) {
              pos[idx] = 6.0 + Math.random() * 2.5;
              pos[idx + 1] = (Math.random() - 0.5) * 3.0;
              pos[idx + 2] = (Math.random() - 0.5) * 3.0;
            }

          } else if (activeModel === 'skid') {
            // HELICOPTER SKID: Dynamic ground ground effect & airflow across cross-members
            pos[idx] -= spd[i] * 1.3;

            // Deflect over forward cross-tube and landing skids
            if (Math.abs(currX) < 1.8 && currY < -0.4 && currY > -1.8) {
              pos[idx + 1] += 0.02; // Ground boundary layer displacement
            }

            if (pos[idx] < -7.5) {
              pos[idx] = 6.5 + Math.random() * 2.0;
              pos[idx + 1] = (Math.random() - 0.5) * 3.5;
              pos[idx + 2] = (Math.random() - 0.5) * 4.5;
            }

          } else {
            // JET / AIRFOIL STREAMLINES
            pos[idx] -= spd[i] * 1.5;
            if (currX < 3.0 && currX > -1.5) {
              const distToCenter = Math.sqrt(currY * currY + currZ * currZ);
              if (distToCenter < 1.1) {
                pos[idx + 1] += 0.025;
                pos[idx + 2] += currZ > 0 ? 0.025 : -0.025;
              }
            }

            if (pos[idx] < -8.0) {
              pos[idx] = 7.5 + Math.random() * 2.5;
              pos[idx + 1] = (Math.random() - 0.5) * 4.0;
              pos[idx + 2] = (Math.random() - 0.5) * 6.5;
            }
          }
        }

        airflowStreamlinesRef.current.mesh.geometry.attributes.position.needsUpdate = true;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

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
    if (airflowStreamlinesRef.current && airflowStreamlinesRef.current.mesh) {
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

    const matColor = wireframe ? 0xfacc15 : 0x18241b;
    const bodyMat = new THREE.MeshStandardMaterial({
      color: matColor,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: wireframe
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xeab308, // Gold / Amber
      roughness: 0.3,
      metalness: 0.9,
      wireframe: wireframe
    });

    const greenMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e, // Emerald Green
      roughness: 0.3,
      metalness: 0.8,
      wireframe: wireframe
    });

    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      wireframe: wireframe
    });

    const translucentLinerMat = new THREE.MeshPhysicalMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0.55,
      roughness: 0.2,
      metalness: 0.3,
      transmission: 0.8,
      wireframe: wireframe
    });

    if (modelType === 'nozzle') {
      // ----------------------------------------------------
      // JET ENGINE NOZZLE WITH BLEED AIR COOLING SYSTEM
      // ----------------------------------------------------
      setModelStats({
        format: 'Autodesk Inventor CAD / CFD CHT',
        triangles: 8460,
        dims: '2.8m (L) × 1.35m (Outer Ø)'
      });

      const nozzleGroup = new THREE.Group();

      // 1. Outer Annular Bleed Air Casing (Transparent / Cutaway)
      const outerCasingGeo = new THREE.CylinderGeometry(1.2, 1.35, 3.6, 28, 1, true);
      outerCasingGeo.rotateZ(Math.PI / 2);
      const outerCasing = new THREE.Mesh(outerCasingGeo, translucentLinerMat);
      outerCasing.position.set(-0.2, 0, 0);
      nozzleGroup.add(outerCasing);

      // 2. Convergent Flap Liner (Inlet +X to Throat at X = 0)
      const convGeo = new THREE.CylinderGeometry(0.7, 1.15, 2.0, 28, 1, true);
      convGeo.rotateZ(Math.PI / 2);
      const convLiner = new THREE.Mesh(convGeo, bodyMat);
      convLiner.position.set(1.0, 0, 0);
      nozzleGroup.add(convLiner);

      // 3. Divergent Flap Liner (Throat at X = 0 to Exit at -X)
      const divGeo = new THREE.CylinderGeometry(1.18, 0.7, 1.8, 28, 1, true);
      divGeo.rotateZ(Math.PI / 2);
      const divLiner = new THREE.Mesh(divGeo, accentMat);
      divLiner.position.set(-0.9, 0, 0);
      nozzleGroup.add(divLiner);

      // 4. Throat Constriction Ring (Mach 1.0 Choke Point)
      const throatRingGeo = new THREE.TorusGeometry(0.7, 0.05, 12, 32);
      throatRingGeo.rotateY(Math.PI / 2);
      const throatRing = new THREE.Mesh(throatRingGeo, glowMat);
      throatRing.position.set(0, 0, 0);
      nozzleGroup.add(throatRing);

      // 5. Compressor Bleed Air Inflow Manifold & Ports (Green)
      const manifoldGeo = new THREE.TorusGeometry(1.25, 0.08, 12, 32);
      manifoldGeo.rotateY(Math.PI / 2);
      const manifold = new THREE.Mesh(manifoldGeo, greenMat);
      manifold.position.set(1.6, 0, 0);
      nozzleGroup.add(manifold);

      // Secondary Bleed Injection Tubes (8 Radial Struts)
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const tubeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.35, 10);
        const tube = new THREE.Mesh(tubeGeo, greenMat);
        tube.position.set(1.6, Math.cos(angle) * 1.15, Math.sin(angle) * 1.15);
        tube.rotation.x = angle;
        nozzleGroup.add(tube);
      }

      // 6. Actuator Push-Rods for Divergent Nozzle Petals
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        const rodGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.4, 8);
        rodGeo.rotateZ(Math.PI / 2);
        const rod = new THREE.Mesh(rodGeo, accentMat);
        rod.position.set(-0.9, Math.cos(angle) * 1.25, Math.sin(angle) * 1.25);
        nozzleGroup.add(rod);
      }

      scene.add(nozzleGroup);
      currentObjectRef.current = nozzleGroup;

    } else if (modelType === 'skid') {
      // ----------------------------------------------------
      // HELICOPTER SKID LANDING GEAR ASSEMBLY
      // ----------------------------------------------------
      setModelStats({
        format: 'Autodesk Inventor CAD / Drop FEA',
        triangles: 6240,
        dims: '3.6m (L) × 2.2m (W) × 1.1m (H)'
      });

      const skidGroup = new THREE.Group();

      // Forward & Aft Curved Cross-Tubes
      const createCrossTube = (posX) => {
        const tubeCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(posX, -0.9, -1.1),
          new THREE.Vector3(posX, -0.2, -0.6),
          new THREE.Vector3(posX, 0.1, 0),
          new THREE.Vector3(posX, -0.2, 0.6),
          new THREE.Vector3(posX, -0.9, 1.1)
        ]);
        const tubeGeo = new THREE.TubeGeometry(tubeCurve, 24, 0.08, 12, false);
        return new THREE.Mesh(tubeGeo, bodyMat);
      };

      const forwardCrossTube = createCrossTube(1.2);
      skidGroup.add(forwardCrossTube);

      const aftCrossTube = createCrossTube(-1.2);
      skidGroup.add(aftCrossTube);

      // Left & Right Ground Contact Skids with Curved Upward Toes
      const createSkidBeam = (posZ) => {
        const skidCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(2.2, -0.5, posZ), // Curved front toe
          new THREE.Vector3(1.7, -0.9, posZ),
          new THREE.Vector3(0, -0.9, posZ),
          new THREE.Vector3(-1.7, -0.9, posZ),
          new THREE.Vector3(-2.0, -0.7, posZ) // Curved aft heel
        ]);
        const skidGeo = new THREE.TubeGeometry(skidCurve, 32, 0.09, 12, false);
        return new THREE.Mesh(skidGeo, accentMat);
      };

      const leftSkid = createSkidBeam(-1.1);
      skidGroup.add(leftSkid);

      const rightSkid = createSkidBeam(1.1);
      skidGroup.add(rightSkid);

      // Cross-Tube Clamping Brackets & Dampener Bushings (Green)
      const bracketGeo = new THREE.BoxGeometry(0.24, 0.24, 0.24);
      [-1.2, 1.2].forEach((posX) => {
        [-1.1, 1.1].forEach((posZ) => {
          const bracket = new THREE.Mesh(bracketGeo, greenMat);
          bracket.position.set(posX, -0.9, posZ);
          skidGroup.add(bracket);
        });
      });

      // Airframe Fuselage Mount Trunnions
      const trunnionGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.3, 12);
      const trunnion1 = new THREE.Mesh(trunnionGeo, glowMat);
      trunnion1.position.set(1.2, 0.15, 0);
      skidGroup.add(trunnion1);

      const trunnion2 = new THREE.Mesh(trunnionGeo, glowMat);
      trunnion2.position.set(-1.2, 0.15, 0);
      skidGroup.add(trunnion2);

      scene.add(skidGroup);
      currentObjectRef.current = skidGroup;

    } else if (modelType === 'jet') {
      // ----------------------------------------------------
      // SUPERSONIC INTERCEPTOR JET
      // ----------------------------------------------------
      setModelStats({ format: 'Autodesk Inventor CAD (ADP)', triangles: 6420, dims: '19.5m (L) × 14.0m (W) × 4.2m (H)' });
      const jetGroup = new THREE.Group();

      const fuselageGeo = new THREE.ConeGeometry(0.8, 6.5, 16);
      fuselageGeo.rotateZ(-Math.PI / 2);
      const fuselage = new THREE.Mesh(fuselageGeo, bodyMat);
      fuselage.scale.set(1, 0.6, 1.2);
      jetGroup.add(fuselage);

      const canopyGeo = new THREE.SphereGeometry(0.5, 16, 12);
      canopyGeo.scale(2.2, 0.7, 0.8);
      const canopy = new THREE.Mesh(canopyGeo, translucentLinerMat);
      canopy.position.set(0.6, 0.45, 0);
      jetGroup.add(canopy);

      const wingShape = new THREE.Shape();
      wingShape.moveTo(1.5, 0);
      wingShape.lineTo(-2.0, 3.8);
      wingShape.lineTo(-2.8, 3.8);
      wingShape.lineTo(-2.4, 0);
      wingShape.closePath();

      const extrudeSettings = { depth: 0.08, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
      const rightWingGeo = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);
      rightWingGeo.rotateX(Math.PI / 2);
      const rightWing = new THREE.Mesh(rightWingGeo, accentMat);
      jetGroup.add(rightWing);

      const leftWingGeo = rightWingGeo.clone();
      leftWingGeo.scale(1, 1, -1);
      const leftWing = new THREE.Mesh(leftWingGeo, accentMat);
      jetGroup.add(leftWing);

      const finShape = new THREE.Shape();
      finShape.moveTo(0, 0);
      finShape.lineTo(-1.2, 1.6);
      finShape.lineTo(-1.8, 1.6);
      finShape.lineTo(-1.6, 0);
      finShape.closePath();

      const rightFinGeo = new THREE.ExtrudeGeometry(finShape, extrudeSettings);
      const rightFin = new THREE.Mesh(rightFinGeo, bodyMat);
      rightFin.position.set(-1.0, 0.2, 0.7);
      rightFin.rotation.z = -0.15;
      jetGroup.add(rightFin);

      const leftFin = new THREE.Mesh(rightFinGeo.clone(), bodyMat);
      leftFin.position.set(-1.0, 0.2, -0.7);
      leftFin.rotation.z = 0.15;
      jetGroup.add(leftFin);

      // Twin Reheat Exhaust Nozzles
      const nozzleGeo = new THREE.CylinderGeometry(0.35, 0.42, 1.2, 16);
      nozzleGeo.rotateZ(Math.PI / 2);
      const noz1 = new THREE.Mesh(nozzleGeo, glowMat);
      noz1.position.set(-3.2, 0, 0.45);
      jetGroup.add(noz1);

      const noz2 = new THREE.Mesh(nozzleGeo.clone(), glowMat);
      noz2.position.set(-3.2, 0, -0.45);
      jetGroup.add(noz2);

      scene.add(jetGroup);
      currentObjectRef.current = jetGroup;

    } else if (modelType === 'airfoil') {
      // ----------------------------------------------------
      // NACA AIRFOIL SECTION
      // ----------------------------------------------------
      setModelStats({ format: 'NACA 4-Digit Extrusion', triangles: 3200, dims: '1.0m (Chord) × 5.0m (Span)' });
      const airfoilShape = new THREE.Shape();
      const numPoints = 40;
      for (let i = 0; i <= numPoints; i++) {
        const x = (i / numPoints);
        const yt = 5 * 0.12 * (0.2969 * Math.sqrt(x) - 0.126 * x - 0.3516 * x * x + 0.2843 * Math.pow(x, 3) - 0.1015 * Math.pow(x, 4));
        if (i === 0) airfoilShape.moveTo(x * 4 - 2, yt * 3);
        else airfoilShape.lineTo(x * 4 - 2, yt * 3);
      }
      for (let i = numPoints; i >= 0; i--) {
        const x = (i / numPoints);
        const yt = 5 * 0.12 * (0.2969 * Math.sqrt(x) - 0.126 * x - 0.3516 * x * x + 0.2843 * Math.pow(x, 3) - 0.1015 * Math.pow(x, 4));
        airfoilShape.lineTo(x * 4 - 2, -yt * 3);
      }
      airfoilShape.closePath();

      const extrudeSettings = { depth: 5, bevelEnabled: false };
      const foilGeo = new THREE.ExtrudeGeometry(airfoilShape, extrudeSettings);
      foilGeo.center();
      const foilMesh = new THREE.Mesh(foilGeo, accentMat);
      foilMesh.rotation.y = Math.PI / 2;

      scene.add(foilMesh);
      currentObjectRef.current = foilMesh;
    }
  };

  // Custom File Uploader (.STL, .OBJ, .GLB)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setCustomFileName(file.name);
    const scene = sceneRef.current;
    const ext = file.name.split('.').pop().toLowerCase();
    const url = URL.createObjectURL(file);

    const onModelLoaded = (object3d, formatName) => {
      clearCurrentObject();
      const box = new THREE.Box3().setFromObject(object3d);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 5.0 / (maxDim || 1);
      object3d.scale.set(scale, scale, scale);
      box.setFromObject(object3d);
      const center = new THREE.Vector3();
      box.getCenter(center);
      object3d.position.sub(center);

      let triCount = 0;
      object3d.traverse((child) => {
        if (child.isMesh) {
          triCount += child.geometry.attributes.position.count / 3;
          child.material = new THREE.MeshStandardMaterial({
            color: 0xfacc15,
            metalness: 0.8,
            roughness: 0.25,
            wireframe: wireframe
          });
        }
      });

      setModelStats({
        format: formatName,
        triangles: Math.round(triCount),
        dims: `${size.x.toFixed(2)}m × ${size.y.toFixed(2)}m × ${size.z.toFixed(2)}m`
      });

      scene.add(object3d);
      currentObjectRef.current = object3d;
      setLoading(false);
      setActiveModel('custom');
      URL.revokeObjectURL(url);
    };

    if (ext === 'stl') {
      const loader = new STLLoader();
      loader.load(url, (geometry) => {
        const mat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8, roughness: 0.25 });
        const mesh = new THREE.Mesh(geometry, mat);
        onModelLoaded(mesh, 'STL (Inventor/SolidWorks)');
      });
    } else if (ext === 'obj') {
      const loader = new OBJLoader();
      loader.load(url, (obj) => {
        onModelLoaded(obj, 'OBJ Wavefront');
      });
    } else if (ext === 'glb' || ext === 'gltf') {
      const loader = new GLTFLoader();
      loader.load(url, (gltf) => {
        onModelLoaded(gltf.scene, 'GLTF / GLB');
      });
    }
  };

  const captureSnapshot = () => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    const dataUrl = renderer.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `logesh_${activeModel}_propulsion_render.png`;
    link.href = dataUrl;
    link.click();
  };

  const resetCamera = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (camera && controls) {
      camera.position.set(7, 5, 9);
      controls.target.set(0, 0, 0);
      controls.update();
    }
  };

  return (
    <div className="relative w-full h-[540px] rounded-3xl bg-[#060a07] border border-yellow-500/25 overflow-hidden shadow-2xl">
      
      {/* Top Controls Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Model Switcher Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-yellow-500/30 pointer-events-auto">
          <button
            onClick={() => setActiveModel('nozzle')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1 ${
              activeModel === 'nozzle' ? 'bg-yellow-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-yellow-400'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Nozzle Bleed Air</span>
          </button>
          <button
            onClick={() => setActiveModel('skid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1 ${
              activeModel === 'skid' ? 'bg-yellow-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-yellow-400'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-green-400" />
            <span>Helicopter Skid Gear</span>
          </button>
          <button
            onClick={() => setActiveModel('jet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeModel === 'jet' ? 'bg-yellow-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-yellow-400'
            }`}
          >
            ✈️ Interceptor
          </button>
          <button
            onClick={() => setActiveModel('airfoil')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeModel === 'airfoil' ? 'bg-yellow-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-yellow-400'
            }`}
          >
            💨 Airfoil
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              activeModel === 'custom' ? 'bg-green-500 text-slate-950 font-bold' : 'text-green-400 hover:bg-slate-900'
            }`}
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
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono backdrop-blur-md border transition-all flex items-center gap-1.5 ${
              wireframe ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50' : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:text-white'
            }`}
            title="Toggle Wireframe Mesh"
          >
            <Box className="w-3.5 h-3.5" />
            <span>{wireframe ? 'Mesh' : 'Shaded'}</span>
          </button>

          <button
            onClick={() => setShowAirflow(!showAirflow)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono backdrop-blur-md border transition-all flex items-center gap-1.5 ${
              showAirflow ? 'bg-green-500/20 text-green-300 border-green-500/50' : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Toggle Dual-Color Streamline Vectors (Yellow Core & Green Bleed Coolant)"
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Flow: {showAirflow ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={captureSnapshot}
            className="p-2 rounded-xl bg-slate-950/80 text-slate-300 hover:text-yellow-400 border border-slate-800 transition-all"
            title="Download CAD Render Snapshot (PNG)"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={resetCamera}
            className="p-2 rounded-xl bg-slate-950/80 text-slate-300 hover:text-yellow-400 border border-slate-800 transition-all"
            title="Reset Camera"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-30 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-yellow-300 mt-3 font-medium">Parsing CAD Geometry & Normals...</p>
        </div>
      )}

      {/* Bottom Telemetry HUD Overlay */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <div className="px-4 py-2.5 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-yellow-500/30 text-[11px] font-mono text-slate-400 space-y-1 shadow-xl">
          <div className="text-yellow-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
            <span>THREE.JS PROPULSION VIEWPORT // {modelStats.format}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Mesh: <strong className="text-white">{modelStats.triangles.toLocaleString()}</strong> Triangles</span>
            <span>Dimensions: <strong className="text-yellow-400">{modelStats.dims}</strong></span>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-3">
            <span>Flow Physics: <strong className="text-green-400">{activeModel === 'nozzle' ? 'Hot Core (Yellow) + Bleed Cooling (Green)' : 'Aerodynamic Streamlines'}</strong></span>
            <span>Supported: <strong className="text-slate-400">.STL | .OBJ | .GLB | .GLTF</strong></span>
          </div>
        </div>
      </div>

      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

    </div>
  );
}
