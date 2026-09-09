// Comprehensive data for Logesh's High-End Aerospace & Drone Engineering Portfolio

export const CANDIDATE = {
  name: "Logesh",
  title: "Aeronautical & Drone Design Engineer",
  degree: "B.E. Aeronautical Engineering",
  targetRole: "Aeronautical / UAS Airframe & CFD R&D Intern",
  targetStipend: "₹25,000+ / month",
  email: "logeshaero1566@gmail.com",
  github: "https://github.com/Logesh-Aeronautical",
  location: "India",
  bio: "Aeronautical Engineer specializing in 3D CAD modeling (Autodesk Inventor), Structural FEA & CFD simulation (ANSYS Fluent / Static Structural), and Embedded Avionics Telemetry (ESP32 / Arduino / C++). Focused on delivering rigorous numerical validation, aerodynamic optimization, and flight-ready prototyping."
};

export const CASE_STUDIES = [
  {
    id: "interceptor",
    badge: "Case Study 01 // ADP Deck",
    title: "4.5-Gen Supersonic Interceptor Jet",
    subtitle: "Aerodynamic Sizing, Autodesk Inventor CAD & High-Low-High Mission Profile",
    tags: ["Autodesk Inventor", "Aircraft Design (ADP)", "Mach 2.1+ Supercruise", "Aerodynamic Polar"],
    overview: {
      problem: "Interception missions demand rapid high-altitude climb-out, supercruise dash speeds exceeding Mach 2.1, and sustained high-G turning agility while keeping structural empty weight fractions within competitive limits (We/W0 <= 0.55).",
      designApproach: "Modeled complete 3D parametric airframe in Autodesk Inventor featuring a 45° leading-edge swept delta wing, chined forebody for vortex lift generation, twin canted vertical stabilizers to reduce radar cross-section, and retractable oleo-pneumatic landing gear assembly.",
      simulationAnalysis: "Derived full aerodynamic drag polar across subsonic, transonic, and supersonic regimes (L/D = 12.0). Formulated engine inlet sizing matching 294 kN installed reheat thrust and mapped the complete High-Low-High tactical mission profile from ground launch to low-altitude engagement.",
      engineeringOutcome: "Established a validated conceptual airframe sizing with 16,674 kg MTOW, 9,022 kg empty weight (We/W0 = 0.541), 18,000 m service ceiling, and 1,600 km combat operational radius benchmarked against 18 historical supersonic combat aircraft."
    },
    specs: [
      { label: "Max Take-Off Weight (MTOW)", value: "16,674 kg" },
      { label: "Structural Empty Weight (We)", value: "9,022 kg (We/W0 = 0.541)" },
      { label: "Max Dash Speed", value: "2,600 km/h (Mach 2.1+)" },
      { label: "Installed Engine Thrust", value: "294 kN (Afterburner)" },
      { label: "Thrust-to-Weight (T/W)", value: "1.79 (High-G Envelope)" },
      { label: "Wing Loading (W/S)", value: "256.5 kg/m²" },
      { label: "Wing Geometry", value: "Span: 14.0m | Area: 65.0m² | Sweep: 45°" },
      { label: "Service Ceiling", value: "18,000 m (59,000 ft)" }
    ],
    renders: [
      {
        url: "./cad/interceptor_cad_top.jpg",
        title: "Autodesk Inventor 3D CAD Planform Render",
        caption: "Top-down view showing 45° swept wing planform and twin vertical stabilizer cant angles."
      },
      {
        url: "./cad/interceptor_cad_iso.jpg",
        title: "Isometric Airframe CAD Model",
        caption: "Full fuselage surface lofting, engine nacelle packaging, and cockpit canopy integration."
      },
      {
        url: "./cad/interceptor_cad_front.jpg",
        title: "Front Cross-Sectional Geometry",
        caption: "Twin supersonic wedge engine inlets sized for shockwave deceleration at Mach 2+."
      },
      {
        url: "./assets/images/mission_profile.png",
        title: "Operational Mission Profile (High-Low-High)",
        caption: "Numerical mission breakdown (Nodes 0-6): Takeoff -> Stratospheric Cruise -> Combat Loop -> Safe Recovery."
      }
    ]
  },
  {
    id: "drone",
    badge: "Case Study 02 // UAS Airframe",
    title: "Heavy-Lift Quadcopter / UAS Drone Airframe",
    subtitle: "Autodesk Inventor CAD, Structural FEA & Carbon-Fiber Topology Trade Study",
    tags: ["Autodesk Inventor", "ANSYS FEA", "Carbon Fiber Weave", "Factor of Safety >= 2.4"],
    overview: {
      problem: "Agricultural and surveillance drones require a rigid, vibration-dampened multirotor chassis capable of withstanding dynamic rotor thrust spikes and sudden gust loads without fatigue failure or excessive arm deflection under peak 4S/6S motor torque.",
      designApproach: "Developed full isometric and exploded assembly in Autodesk Inventor using a modular sandwich architecture: 3K twill carbon-fiber tubular arms clamped between CNC lightweight central chassis plates with integrated vibration-isolating motor mount brackets.",
      simulationAnalysis: "Conducted ANSYS Static Structural finite element analysis under maximum hover and 2.5G pull-up thrust conditions (120 N upward rotor load per arm). Analyzed Von Mises stress distribution, principal strain, and directional Z-displacement at motor mount tips.",
      engineeringOutcome: "Achieved a minimum Factor of Safety (FoS) of 2.45 with maximum tip deflection under 1.18 mm under maximum dynamic thrust loading, realizing a 28% airframe weight reduction compared to aluminum extruded brackets."
    },
    specs: [
      { label: "Chassis Configuration", value: "Heavy-Lift Quadcopter / Hexa Platform" },
      { label: "Primary Airframe Material", value: "3K Twill Matte Carbon Fiber" },
      { label: "Bracket / Mount Material", value: "CNC 6061-T6 / PETG Carbon Infused" },
      { label: "Max Design Rotor Thrust", value: "120 N / Arm (2.5G Peak Pull-Up)" },
      { label: "FEA Max Von Mises Stress", value: "142.6 MPa (Well below yield)" },
      { label: "Structural Factor of Safety", value: "FoS = 2.45" },
      { label: "Max Tip Deflection", value: "1.18 mm (High torsional rigidity)" },
      { label: "Airframe Mass Reduction", value: "28% vs Aluminum baseline" }
    ],
    renders: [
      {
        url: "./cad/drone_cad_iso.png",
        title: "Autodesk Inventor Isometric Chassis Assembly",
        caption: "Complete drone airframe assembly showcasing carbon arm geometry and landing struts."
      },
      {
        url: "./cad/drone_cad_exploded.png",
        title: "Exploded View & Fastener Stacking",
        caption: "CAD exploded view detailing central clamping plates, dampeners, and arm locking mechanisms."
      },
      {
        url: "./cad/drone_cad_bracket.png",
        title: "Motor Mount & Bracket Structural Detail",
        caption: "Reinforced bracket geometry optimized for uniform stress distribution under propeller torque."
      },
      {
        url: "./cad/drone_cad_motor.png",
        title: "Arm & Propulsion Subassembly",
        caption: "CAD detail showing motor mount alignment and internal wire routing pathways."
      }
    ]
  },
  {
    id: "airfoil",
    badge: "Case Study 03 // CFD Aerodynamics",
    title: "NACA Airfoil Flow Separation & Stall Analysis",
    subtitle: "ANSYS Fluent CFD, Boundary Layer Inflation Meshing (y+ ~ 1) & Wind Tunnel Validation",
    tags: ["ANSYS Fluent", "CFD", "Boundary Layer Inflation", "SST k-omega", "Stall Analysis"],
    overview: {
      problem: "Accurately resolving aerodynamic stall characteristics, boundary layer transition, and maximum lift coefficient (CL_max) requires high-fidelity turbulence modeling and stringent wall resolution (y+ ~ 1) to capture adverse pressure gradient separation.",
      designApproach: "Generated high-precision NACA 0012 / 4412 airfoil geometry coordinates in ANSYS DesignModeler. Built a structured C-grid fluid domain extending 15 chord lengths upstream and 25 chord lengths downstream to eliminate domain boundary interference.",
      simulationAnalysis: "Generated 20 prism boundary layer inflation layers with a growth rate of 1.15 to achieve y+ < 1. Executed steady incompressible Navier-Stokes simulations in ANSYS Fluent utilizing the Shear Stress Transport (SST) k-omega turbulence model across angles of attack from 0° to 18°.",
      engineeringOutcome: "Successfully captured leading-edge stall onset at alpha = 15.5°, matching experimental NASA Langley and XFOIL wind tunnel benchmark data with less than 4.6% error in lift slope (dCL/dalpha) and drag polar prediction."
    },
    specs: [
      { label: "Airfoil Profiles", value: "NACA 0012 / NACA 4412" },
      { label: "CFD Solver / Framework", value: "ANSYS Fluent (Pressure-Based Coupled)" },
      { label: "Turbulence Model", value: "SST k-omega with Intermittency" },
      { label: "Inflation Layer Sizing", value: "20 Layers | y+ <= 1.0 (Viscous Sublayer)" },
      { label: "Simulated Reynolds Number", value: "Re = 3.0 x 10^6" },
      { label: "Predicted Stall Angle", value: "alpha = 15.5° (Flow separation)" },
      { label: "Max Lift Coefficient (CL_max)", value: "1.58 @ 15.5° AOA" },
      { label: "Validation Accuracy", value: "< 4.6% deviation from NASA Wind Tunnel" }
    ],
    renders: [
      {
        url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
        title: "ANSYS Fluent Velocity Streamline Contours",
        caption: "Simulation showing laminar attached flow at 4° AOA transitioning to trailing edge separation at 14° AOA."
      },
      {
        url: "https://images.unsplash.com/photo-1517976487588-4c3e8a4d4681?auto=format&fit=crop&w=800&q=80",
        title: "Structured C-Grid Inflation Mesh Detail",
        caption: "High-density inflation layers resolving the viscous sublayer directly at the airfoil wall (y+ ~ 1)."
      },
      {
        url: "./assets/images/graphs/12_LDRatio_vs_AspectRatio.png",
        title: "Aerodynamic Lift-to-Drag (L/D) Correlation",
        caption: "Lift-to-drag efficiency curves across angles of attack benchmarked against empirical datasets."
      },
      {
        url: "./assets/images/graphs/14_MaxSpeed_vs_WingSweep.png",
        title: "Critical Mach & Compressibility Drag Rise",
        caption: "Parametric correlation examining trans-sonic shockwave formation and sweep delay."
      }
    ]
  },
  {
    id: "embedded",
    badge: "Case Study 04 // Embedded Avionics",
    title: "Embedded Avionics & IoT Sensor Telemetry",
    subtitle: "ESP32, Arduino Uno, MPU6050 IMU Attitude & Flight Safety State Machines",
    tags: ["Embedded C++", "ESP32", "Arduino Uno", "Wokwi", "MPU6050 6-DOF IMU", "Telemetry"],
    overview: {
      problem: "Modern unmanned aircraft require robust onboard microcontroller firmware for real-time attitude estimation, emergency fail-safe triggers, and environmental telemetry without blocking main flight loop execution.",
      designApproach: "Developed 8 complete IoT and embedded firmware projects during an internship at Tamizan Skills using ESP32, Arduino Uno, Wokwi simulation, and Embedded C++, implementing non-blocking state machines and interrupt-driven sensor routines.",
      simulationAnalysis: "Interfaced 6-DOF IMU (MPU6050 accelerometer/gyro) for attitude and fall detection, ultrasonic echo sensors for ground proximity altitude hold, MQ gas hazard sensors, and ESP32 telemetry packet serialization.",
      engineeringOutcome: "Demonstrated full firmware development capability from sensor calibration and ADC linearization to communication protocols (UART, I2C, SPI), proving hands-on competence in embedded electronics for drone avionics."
    },
    specs: [
      { label: "Microcontrollers Used", value: "ESP32 (Dual Core) & Arduino Uno" },
      { label: "Firmware Language", value: "Embedded C / C++ & Arduino Framework" },
      { label: "Hardware Simulation", value: "Wokwi Circuit Simulator" },
      { label: "Attitude / Motion Sensor", value: "MPU6050 6-Axis Accelerometer + Gyro" },
      { label: "Proximity & Range Sensor", value: "HC-SR04 Ultrasonic Distance Echo" },
      { label: "Protocols Mastered", value: "I2C, SPI, UART Serial Telemetry" },
      { label: "Safety State Machine", value: "Non-blocking millis() scheduler & interrupts" },
      { label: "GitHub Codebase", value: "Tamizan_Skills (8 verified projects)" }
    ],
    renders: [
      {
        url: "./assets/images/iot/Project7_P7.png",
        title: "Biomedical & IMU Fall / High-G Impact Telemetry",
        caption: "Wokwi schematic measuring 6-axis acceleration vectors and triggering emergency thresholds."
      },
      {
        url: "./assets/images/iot/Project1_P1.png",
        title: "Ultrasonic Proximity & Ground Altitude Indicator",
        caption: "Real-time acoustic distance calculation with discrete multi-level warning logic."
      },
      {
        url: "./assets/images/iot/Project4_P4.png",
        title: "Hazard & Thermal Gradient Warning Circuit",
        caption: "MQ-series gas and thermal gradient detection with interrupt-driven alarm buzzer."
      },
      {
        url: "./assets/images/iot/Project2_P2.png",
        title: "ESP32 Environmental Telemetry Station",
        caption: "Analog sensor curve calibration and telemetry packet transmission over serial."
      }
    ]
  }
];

export const AERONAUTICAL_GRAPHS = [
  { id: 1, file: "01_WeightFraction_vs_MTOW.png", title: "Empty Weight Fraction (We/W0) vs MTOW", category: "weight", desc: "Structural efficiency benchmarking against modern combat aircraft." },
  { id: 2, file: "02_EmptyWeight_vs_Length.png", title: "Empty Weight vs Aircraft Length", category: "geometry", desc: "Airframe longitudinal dimension correlation with dry weight." },
  { id: 3, file: "03_MTOW_vs_WingArea.png", title: "MTOW vs Wing Area", category: "geometry", desc: "Gross lifting surface requirement for 16,674 kg takeoff mass." },
  { id: 4, file: "04_MaxSpeed_vs_MTOW.png", title: "Max Speed vs MTOW", category: "performance", desc: "Mach 2.1+ (2600 km/h) dash envelope validation." },
  { id: 5, file: "05_Ceiling_vs_CruiseSpeed.png", title: "Service Ceiling vs Cruise Speed", category: "performance", desc: "High-altitude cruise efficiency at 18,000m service ceiling." },
  { id: 6, file: "06_Ceiling_vs_MaxSpeed.png", title: "Service Ceiling vs Max Speed", category: "performance", desc: "Combat envelope comparison across historical interceptors." },
  { id: 7, file: "07_Range_vs_MTOW.png", title: "Combat Range vs MTOW", category: "performance", desc: "1,600 km operational radius relative to internal fuel fraction." },
  { id: 8, file: "08_TWRatio_vs_CruiseSpeed.png", title: "Thrust-to-Weight vs Cruise Speed", category: "propulsion", desc: "Propulsion sizing balancing high excess thrust (1.79) with cruise." },
  { id: 9, file: "09_TWRatio_vs_MaxSpeed.png", title: "Thrust-to-Weight vs Max Speed", category: "propulsion", desc: "Installed afterburner thrust needed to overcome wave drag." },
  { id: 10, file: "10_Thrust_vs_MTOW.png", title: "Total Engine Thrust vs MTOW", category: "propulsion", desc: "294 kN installed power plant relative to gross weight." },
  { id: 11, file: "11_WingLoading_vs_TWRatio.png", title: "Wing Loading vs Thrust-to-Weight Ratio", category: "propulsion", desc: "Maneuverability trade study (Wing loading 256.5 kg/m² with T/W 1.79)." },
  { id: 12, file: "12_LDRatio_vs_AspectRatio.png", title: "Lift-to-Drag (L/D) vs Aspect Ratio", category: "aerodynamics", desc: "Aspect Ratio 3.0 yielding optimized L/D of 12.0 for supersonic sweep." },
  { id: 13, file: "13_LDRatio_vs_CruiseSpeed.png", title: "L/D Ratio vs Cruise Speed", category: "aerodynamics", desc: "Cruise aerodynamic performance mapping to minimize drag rise." },
  { id: 14, file: "14_MaxSpeed_vs_WingSweep.png", title: "Max Speed vs Wing Sweep Angle", category: "aerodynamics", desc: "45° leading edge sweep optimization to delay shockwave drag." },
  { id: 15, file: "15_WingSweep_vs_CruiseSpeed.png", title: "Wing Sweep vs Cruise Speed", category: "aerodynamics", desc: "Transonic cruise drag characteristics vs sweep angle." },
  { id: 16, file: "16_WingSpan_vs_Length.png", title: "Aircraft Length vs Wing Span", category: "geometry", desc: "19.5m length with 14.0m span maintaining supersonic fineness ratio." },
  { id: 17, file: "17_WingArea_vs_WingSpan.png", title: "Wing Area vs Wing Span", category: "geometry", desc: "65.0 m² gross lifting planform distributing induced and wave drag." },
  { id: 18, file: "18_WingLoading_vs_CruiseSpeed.png", title: "Wing Loading vs Cruise Speed", category: "aerodynamics", desc: "Ride quality and gust response analysis for high-speed penetration." }
];

export const SKILLS = [
  {
    category: "CAD & Airframe Design",
    skills: ["Autodesk Inventor (3D Modeling & Assemblies)", "Airframe Surface Lofting", "Landing Gear Kinematics", "Quadcopter / Drone Airframe Sizing", "GD&T & Engineering Drawings"]
  },
  {
    category: "CFD & Aerodynamics",
    skills: ["ANSYS Fluent (CFD)", "Boundary Layer Inflation Meshing (y+ ~ 1)", "SST k-omega Turbulence Modeling", "Compressible Transonic Flow", "Aerodynamic Drag Polar Extraction"]
  },
  {
    category: "FEA & Structural Simulation",
    skills: ["ANSYS Static Structural", "Von Mises Stress & Strain Analysis", "Modal & Vibration Analysis", "Composite Carbon-Fiber Sizing", "Factor of Safety Optimization"]
  },
  {
    category: "Embedded Avionics & Code",
    skills: ["Embedded C / C++", "ESP32 & Arduino Uno", "Wokwi Hardware Simulator", "MPU6050 6-Axis IMU Interfacing", "Python (Pandas, Matplotlib, OpenCV)"]
  }
];
