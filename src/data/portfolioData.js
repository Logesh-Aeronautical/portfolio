// Comprehensive data for Logesh R - Space, Propulsion & Dynamics Engineering Portfolio

export const CANDIDATE = {
  name: "Logesh R",
  title: "Space, Propulsion & Dynamics Engineer",
  degree: "B.E. Aeronautical Engineering",
  institution: "Jaya Engineering College, Chennai",
  targetRole: "Propulsion R&D / Flight Dynamics & Simulation Engineer",
  targetStipend: "Core Space & Aerospace Engineering R&D",
  email: "logeshaero1566@gmail.com",
  github: "https://github.com/Logesh-Aeronautical",
  location: "Chennai, Tamil Nadu, India",
  bio: "Aeronautical Engineer specializing in Jet & Rocket Propulsion Systems (Bleed Air Nozzle Active Cooling & Conjugate Heat Transfer CFD) and Rotorcraft Dynamics (Helicopter Skid Landing Gear Impact & Structural Cross-Section Optimization). Passionate about combining 3D CAD modeling, compressible gas dynamics, and non-linear FEA to build next-generation space and flight propulsion hardware."
};

export const CASE_STUDIES = [
  {
    id: "nozzle-cooling",
    badge: "Case Study 01 // Propulsion & Aerothermodynamics",
    title: "Jet Engine Nozzle Active Cooling System via Bleed Air",
    subtitle: "Conjugate Heat Transfer (CHT) CFD, Compressor Bleed Circuit Sizing & Thermal Fatigue Life Optimization",
    tags: ["Jet Engine Propulsion", "Bleed Air Cooling", "Thermal CFD (ANSYS)", "Nozzle Heat Flux", "TSFC Preservation", "Conjugate Heat Transfer"],
    overview: {
      problem: "Modern high-performance turbojet/turbofan engines produce exhaust gas temperatures exceeding 1,600 K at peak reheat. Without active cooling, convergent-divergent nozzles suffer severe thermal oxidation, creep degradation, and low-cycle fatigue failure.",
      designApproach: "Engineered an active cooling circuit routing secondary bleed air extracted from the compressor stage through annular circumferential cooling passages and multi-slot film injection liners along the convergent flap and throat surfaces.",
      simulationAnalysis: "Conducted Conjugate Heat Transfer (CHT) and coupled compressible CFD in ANSYS Fluent. Analyzed coolant boundary layer adherence, turbulent mixing (SST k-omega), local Nusselt numbers, and wall temperature gradients across Mach 0.6 to Mach 2.2 exhaust gas velocities.",
      engineeringOutcome: "Achieved an average wall temperature drop of ΔT = 235 K at the nozzle throat while restricting bleed air mass flow extraction to under 2.1% of core mass flow, successfully preventing severe engine Thrust Specific Fuel Consumption (TSFC) penalties."
    },
    specs: [
      { label: "Core Exhaust Gas Temp", value: "1,650 K (Reheat / Afterburner Peak)" },
      { label: "Coolant Bleed Air Temp", value: "620 K (Compressor Bleed Tap)" },
      { label: "Bleed Mass Flow Fraction", value: "1.9% - 2.1% of Core Flow" },
      { label: "Throat Wall Temp Drop", value: "ΔT = 235 K (Creep Protected)" },
      { label: "Cooling Architecture", value: "Internal Passages + Film Injection" },
      { label: "Cooling Effectiveness (η)", value: "0.42 - 0.48 along divergent flap" },
      { label: "CFD Thermal Solver", value: "ANSYS Fluent Coupled CHT" },
      { label: "Structural Alloy Life", value: "+300% Extended Thermal Fatigue" }
    ],
    renders: [
      {
        url: "./cad/interceptor_cad_front.jpg",
        title: "Nozzle Gas Path & Bleed Inflow Sizing",
        caption: "Aerodynamic sizing of convergent duct and secondary bleed duct packaging."
      },
      {
        url: "./cad/interceptor_cad_iso.jpg",
        title: "Propulsion Nacelle & Exhaust Integration",
        caption: "Complete 3D CAD modeling of engine nacelle, cooling jacket bypass, and nozzle flaps."
      },
      {
        url: "./assets/images/graphs/10_Thrust_vs_MTOW.png",
        title: "Engine Installed Thrust & TSFC Impact Analysis",
        caption: "Parametric correlation between installed powerplant thrust, bleed air extraction, and gross takeoff mass."
      },
      {
        url: "./assets/images/graphs/08_TWRatio_vs_CruiseSpeed.png",
        title: "Thrust-to-Weight Envelope & Thermal Performance",
        caption: "Propulsion sizing balancing high excess thrust with cruise thermal equilibrium."
      }
    ]
  },
  {
    id: "helicopter-skid",
    badge: "Case Study 02 // Rotorcraft & Structural Dynamics",
    title: "Helicopter Skid Landing Gear Impact Dynamics & Cross-Section Study",
    subtitle: "Non-Linear Dynamic Drop Impact FEA, Energy Absorption & Cross-Sectional Geometry Trade Study",
    tags: ["Rotorcraft Dynamics", "Skid Landing Gear", "Drop Impact FEA", "Cross-Section Optimization", "Energy Absorption", "Ground Resonance Damping"],
    overview: {
      problem: "Helicopter skid landing gears undergo intense transient dynamic impact loads during autorotation touch-downs and hard landings. The structure must maximize specific energy absorption (SEA) without catastrophic fracture, plastic instability, or triggering rotor-induced ground resonance.",
      designApproach: "Modeled and benchmarked multiple structural cross-sectional profiles—standard Circular Tubular, Elliptical (low aerodynamic drag), and Box/Rectangular geometries—for forward/aft cross-tubes and longitudinal skids in Autodesk Inventor, utilizing high-strength aerospace alloys.",
      simulationAnalysis: "Conducted non-linear dynamic impact and transient explicit FEA under FAA/MIL sink rates (sink velocity 2.5 m/s to 3.5 m/s). Evaluated plastic strain progression, peak decelerative G-load, transient bending moments, and elastic-plastic springback damping.",
      engineeringOutcome: "Proved that tailored elliptical cross-sections improve energy absorption capacity by 24% over conventional circular tubing of equivalent mass, while reducing forward flight parasitic profile drag by 18% and tuning natural bending frequencies away from rotor 1/rev excitation."
    },
    specs: [
      { label: "Cross-Sections Evaluated", value: "Circular Tube, Elliptical, Rectangular Box" },
      { label: "Primary Material", value: "Aerospace Al 7075-T6 & Composite" },
      { label: "Design Touchdown Sink Rate", value: "3.5 m/s (MIL-STD Hard Landing)" },
      { label: "Energy Absorption Gain", value: "+24% Specific Energy Absorption (SEA)" },
      { label: "Forward Flight Drag Reduction", value: "18% Parasitic Drag Reduction" },
      { label: "Max Cabin Deceleration", value: "< 3.1 G (Crew Safety Compliant)" },
      { label: "FEA Solver Framework", value: "ANSYS Explicit Dynamics / FEA" },
      { label: "Ground Resonance Margin", value: "> 18% Separation from Rotor 1/rev" }
    ],
    renders: [
      {
        url: "./cad/drone_cad_iso.png",
        title: "Isometric Landing Strut & Structural Framework",
        caption: "Structural architecture illustrating cross-member load transfer and landing contact geometry."
      },
      {
        url: "./cad/drone_cad_exploded.png",
        title: "Fastener Stacking & Skid Joint Attachment",
        caption: "Exploded mechanical view detailing high-shear retention brackets and dampener bushings."
      },
      {
        url: "./cad/drone_cad_bracket.png",
        title: "Structural Junction & Stress Concentration Analysis",
        caption: "FEA-optimized fillet radii mitigating localized plastic strain spikes at cross-tube junctions."
      },
      {
        url: "./assets/images/graphs/01_WeightFraction_vs_MTOW.png",
        title: "Structural Weight Fraction Optimization",
        caption: "Benchmarking structural empty weight efficiency against dynamic operational envelopes."
      }
    ]
  },
  {
    id: "space-propulsion",
    badge: "Case Study 03 // Space Propulsion & Gas Dynamics",
    title: "Supersonic Rocket Propulsion Nozzle Flow & High-Altitude Expansion",
    subtitle: "De Laval Convergent-Divergent Contour Design, Shock Wave Dynamics & Altitude Performance",
    tags: ["Rocket Propulsion", "De Laval Nozzle", "Compressible Gas Dynamics", "Method of Characteristics", "Shockwave Dynamics", "CFD"],
    overview: {
      problem: "Rocket engines experience dangerous over-expansion shock-induced boundary layer separation at sea-level ignition and significant under-expansion thrust loss at high altitudes, demanding precise contour optimization to maintain high thrust coefficient (CF).",
      designApproach: "Designed contoured bell nozzles (Rao minimum-length contour) using Method of Characteristics (MOC) to maximize axial momentum while minimizing divergence loss and weight.",
      simulationAnalysis: "Executed compressible supersonic Navier-Stokes simulations across nozzle expansion pressure ratios ranging from sea level (1.0 bar) to high altitude (0.05 bar). Traced oblique shock structures and Summerfield separation boundaries.",
      engineeringOutcome: "Determined optimal expansion ratio (ε = 25:1) yielding a sustained thrust coefficient of CF = 1.76 at high altitude, predicting safe separation margins during sea-level liftoff without asymmetric side loads."
    },
    specs: [
      { label: "Nozzle Geometry", value: "Contoured Rao Bell Nozzle (MOC)" },
      { label: "Design Exit Mach Number", value: "Mach 3.4" },
      { label: "Chamber Stagnation Pressure", value: "7.0 MPa" },
      { label: "Area Expansion Ratio (ε)", value: "25:1" },
      { label: "Thrust Coefficient (CF)", value: "1.76 (High-Altitude Optimum)" },
      { label: "Separation Criteria", value: "Summerfield Separation Model" },
      { label: "Numerical Method", value: "Compressible Fluent & MOC" },
      { label: "Mission Domain", value: "Space Launch Vehicle Upper Stage" }
    ],
    renders: [
      {
        url: "https://images.unsplash.com/photo-1517976487588-4c3e8a4d4681?auto=format&fit=crop&w=800&q=80",
        title: "Supersonic Gas Dynamic Expansion & Shock Mesh",
        caption: "High-density mesh resolving oblique shockwaves and nozzle wall boundary layer gradient."
      },
      {
        url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
        title: "Compressible Supersonic Velocity & Mach Vectors",
        caption: "CFD visualization of choked transonic flow at the throat accelerating to Mach 3.4+ at the exit."
      },
      {
        url: "./assets/images/graphs/04_MaxSpeed_vs_MTOW.png",
        title: "High-Speed Supersonic Performance Correlation",
        caption: "Analysis of thrust capacity relative to vehicle gross mass and trajectory drag."
      },
      {
        url: "./assets/images/graphs/12_LDRatio_vs_AspectRatio.png",
        title: "Aerodynamic & Gas Dynamic Efficiency",
        caption: "Mapping momentum recovery and expansion efficiency across operating pressure ratios."
      }
    ]
  },
  {
    id: "embedded-avionics",
    badge: "Case Study 04 // Avionics & Flight Dynamics",
    title: "Embedded Avionics & Real-Time Flight Dynamics Telemetry",
    subtitle: "ESP32, Arduino Uno, MPU6050 6-DOF IMU Attitude Determination & Safety State Machines",
    tags: ["Embedded C++", "ESP32", "Arduino Uno", "Wokwi", "MPU6050 6-DOF IMU", "Flight Telemetry"],
    overview: {
      problem: "Propulsion test rigs and flight test platforms require reliable microcontroller telemetry for real-time thermal monitoring, attitude estimation, and dynamic fail-safe triggers without latency or loop execution blocking.",
      designApproach: "Developed embedded firmware systems utilizing ESP32, Arduino Uno, Wokwi circuit simulation, and Embedded C++, implementing non-blocking state machines and interrupt-driven sensor routines.",
      simulationAnalysis: "Interfaced 6-DOF IMUs (MPU6050 accelerometer and gyroscope) for real-time pitch/roll attitude estimation, temperature gradient sensing, and serial telemetry packet transmission.",
      engineeringOutcome: "Demonstrated complete firmware capability from ADC linearization to serial telemetry protocols (I2C, SPI, UART), proving hands-on ability in embedded electronics for aerospace propulsion testing and flight instrumentation."
    },
    specs: [
      { label: "Microcontrollers Used", value: "ESP32 (Dual Core) & Arduino Uno" },
      { label: "Firmware Language", value: "Embedded C / C++ & Arduino Framework" },
      { label: "Hardware Simulation", value: "Wokwi Circuit Simulator" },
      { label: "Attitude / Motion Sensor", value: "MPU6050 6-Axis Accelerometer + Gyro" },
      { label: "Proximity & Range Sensor", value: "HC-SR04 Ultrasonic Distance Echo" },
      { label: "Protocols Mastered", value: "I2C, SPI, UART Serial Telemetry" },
      { label: "Safety State Machine", value: "Non-blocking millis() scheduler & interrupts" },
      { label: "Candidate Verification", value: "Logesh R // Jaya Engineering College" }
    ],
    renders: [
      {
        url: "./assets/images/iot/Project7_P7.png",
        title: "6-Axis IMU Acceleration & Impact Telemetry",
        caption: "Hardware schematic measuring 6-axis acceleration vectors and triggering emergency limits."
      },
      {
        url: "./assets/images/iot/Project4_P4.png",
        title: "Thermal Gradient & Hazard Warning Circuit",
        caption: "Thermal gradient and limit detection with interrupt-driven safety state machine."
      },
      {
        url: "./assets/images/iot/Project1_P1.png",
        title: "Acoustic Altitude & Proximity Indicator",
        caption: "Real-time acoustic distance calculation with discrete warning thresholds."
      },
      {
        url: "./assets/images/iot/Project2_P2.png",
        title: "ESP32 Telemetry Transmitter Station",
        caption: "Sensor curve calibration and telemetry packet transmission over serial."
      }
    ]
  }
];

export const AERONAUTICAL_GRAPHS = [
  { id: 1, file: "01_WeightFraction_vs_MTOW.png", title: "Empty Weight Fraction (We/W0) vs MTOW", category: "weight", desc: "Structural efficiency benchmarking across aerospace systems." },
  { id: 2, file: "02_EmptyWeight_vs_Length.png", title: "Empty Weight vs Aircraft Length", category: "geometry", desc: "Airframe longitudinal dimension correlation with dry weight." },
  { id: 3, file: "03_MTOW_vs_WingArea.png", title: "MTOW vs Wing Area", category: "geometry", desc: "Gross lifting surface requirement for vehicle takeoff mass." },
  { id: 4, file: "04_MaxSpeed_vs_MTOW.png", title: "Max Speed vs MTOW", category: "performance", desc: "High-speed supersonic dash envelope validation." },
  { id: 5, file: "05_Ceiling_vs_CruiseSpeed.png", title: "Service Ceiling vs Cruise Speed", category: "performance", desc: "High-altitude cruise efficiency and flight ceiling." },
  { id: 6, file: "06_Ceiling_vs_MaxSpeed.png", title: "Service Ceiling vs Max Speed", category: "performance", desc: "Operational flight envelope comparison across high-speed platforms." },
  { id: 7, file: "07_Range_vs_MTOW.png", title: "Combat / Flight Range vs MTOW", category: "performance", desc: "Operational radius relative to internal fuel fraction." },
  { id: 8, file: "08_TWRatio_vs_CruiseSpeed.png", title: "Thrust-to-Weight vs Cruise Speed", category: "propulsion", desc: "Propulsion sizing balancing high excess thrust with cruise economy." },
  { id: 9, file: "09_TWRatio_vs_MaxSpeed.png", title: "Thrust-to-Weight vs Max Speed", category: "propulsion", desc: "Installed powerplant thrust needed to overcome wave drag." },
  { id: 10, file: "10_Thrust_vs_MTOW.png", title: "Total Engine Thrust vs MTOW", category: "propulsion", desc: "Installed power plant thrust relative to gross vehicle weight." },
  { id: 11, file: "11_WingLoading_vs_TWRatio.png", title: "Wing Loading vs Thrust-to-Weight Ratio", category: "propulsion", desc: "Maneuverability and climb rate trade study." },
  { id: 12, file: "12_LDRatio_vs_AspectRatio.png", title: "Lift-to-Drag (L/D) vs Aspect Ratio", category: "aerodynamics", desc: "Optimizing L/D efficiency for high-speed planforms." },
  { id: 13, file: "13_LDRatio_vs_CruiseSpeed.png", title: "L/D Ratio vs Cruise Speed", category: "aerodynamics", desc: "Cruise aerodynamic performance mapping to minimize drag rise." },
  { id: 14, file: "14_MaxSpeed_vs_WingSweep.png", title: "Max Speed vs Wing Sweep Angle", category: "aerodynamics", desc: "Leading edge sweep optimization to delay shockwave drag." },
  { id: 15, file: "15_WingSweep_vs_CruiseSpeed.png", title: "Wing Sweep vs Cruise Speed", category: "aerodynamics", desc: "Transonic cruise drag characteristics vs sweep angle." },
  { id: 16, file: "16_WingSpan_vs_Length.png", title: "Length vs Wing Span", category: "geometry", desc: "Fineness ratio and span balance for supersonic aerodynamics." },
  { id: 17, file: "17_WingArea_vs_WingSpan.png", title: "Wing Area vs Wing Span", category: "geometry", desc: "Gross lifting planform distributing induced and wave drag." },
  { id: 18, file: "18_WingLoading_vs_CruiseSpeed.png", title: "Wing Loading vs Cruise Speed", category: "aerodynamics", desc: "Ride quality and gust response analysis for high-speed penetration." }
];

export const SKILLS = [
  {
    category: "Propulsion & Thermofluids",
    skills: [
      "Jet Engine Nozzle Bleed Air Active Cooling",
      "Conjugate Heat Transfer (CHT) CFD",
      "Compressible Gas Dynamics & De Laval Nozzle Sizing",
      "Thermodynamic Cycle Analysis & TSFC Optimization",
      "Thermal Fatigue & Creep Protection Sizing"
    ]
  },
  {
    category: "Structural Dynamics & Rotorcraft",
    skills: [
      "Helicopter Skid Landing Gear Sizing",
      "Non-Linear Drop Impact FEA Simulation",
      "Cross-Sectional Geometry Trade Studies (Elliptical / Box / Circular)",
      "Specific Energy Absorption (SEA) Optimization",
      "Ground Resonance & Vibration Mode Tuning"
    ]
  },
  {
    category: "Aerospace CAD & 3D Modeling",
    skills: [
      "Autodesk Inventor (Parametric 3D CAD & Assemblies)",
      "SolidWorks / Fusion 360",
      "Propulsion Duct & Nozzle Liner Modeling",
      "Landing Gear Mechanical Assemblies & Kinematics",
      "GD&T & Engineering Production Drawings"
    ]
  },
  {
    category: "Simulation Solvers & Avionics",
    skills: [
      "ANSYS Fluent (Compressible CFD & Heat Transfer)",
      "ANSYS Static Structural & Explicit Dynamics",
      "Embedded C / C++ & ESP32 / Arduino Microcontrollers",
      "MPU6050 6-Axis IMU Telemetry & Safety State Machines",
      "Python (NumPy, Matplotlib for Engineering Plots)"
    ]
  }
];
