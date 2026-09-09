// Portfolio data for Logesh (Aeronautical Engineer & Embedded Systems Specialist)

const AIRCRAFT_SPECS = {
  name: "Project Interceptor",
  role: "High-Altitude Supersonic Interception Aircraft",
  mtow: "16,674 kg",
  emptyWeight: "9,022 kg",
  weightRatio: "0.541",
  length: "19.5 m",
  wingSpan: "14.0 m",
  wingArea: "65.0 m²",
  aspectRatio: "3.0",
  wingSweep: "45°",
  maxSpeed: "2,600 km/h (Mach 2.1+)",
  cruiseSpeed: "918 km/h",
  serviceCeiling: "18,000 m (59,000 ft)",
  range: "1,600 km",
  thrust: "294 kN",
  twRatio: "1.79",
  wingLoading: "256.5 kg/m²",
  ldRatio: "12.0"
};

const MISSION_NODES = [
  {
    node: "0",
    name: "Take-Off & Climb",
    altitude: "Ground to Cruise (10,000m+)",
    description: "Rapid high-angle climb-out with reheat/afterburner, optimizing fuel flow while transitioning to supersonic high-altitude cruise corridors."
  },
  {
    node: "1",
    name: "Cruise Out",
    altitude: "10,000m - 12,000m",
    description: "High-altitude efficient transit phase toward designated interception vector with low specific fuel consumption."
  },
  {
    node: "2",
    name: "Rapid Descent",
    altitude: "10,000m to 1,000m",
    description: "High-rate tactical ingress descent under radar coverage to engage low-altitude aerial targets."
  },
  {
    node: "3-4",
    name: "Combat & Interception Loop",
    altitude: "1,000m (Max Power Envelope)",
    description: "High-G sustained combat maneuvering, high thrust-to-weight engagement loop (T/W 1.79) to eliminate threat."
  },
  {
    node: "5",
    name: "Rapid Re-Climb",
    altitude: "1,000m to 10,000m",
    description: "High energy zoom climb back into high-altitude corridors to evade ground countermeasures."
  },
  {
    node: "6",
    name: "Cruise In & Loiter Hold",
    altitude: "10,000m",
    description: "Return cruise leg with figure-8 holding loiter pattern prior to approach vector sequencing."
  },
  {
    node: "End",
    name: "Descent & Safe Recovery",
    altitude: "10,000m to Runway 0m",
    description: "Low drag approach, aerodynamic deceleration, and safe recovery touchdown."
  }
];

const COMPARATIVE_GRAPHS = [
  {
    id: 1,
    file: "01_WeightFraction_vs_MTOW.png",
    title: "Empty Weight Fraction (We/W0) vs MTOW",
    category: "weight",
    description: "Evaluates structural efficiency by comparing empty weight fraction against Maximum Take-Off Weight across modern supersonic aircraft."
  },
  {
    id: 2,
    file: "02_EmptyWeight_vs_Length.png",
    title: "Empty Weight vs Aircraft Length",
    category: "geometry",
    description: "Correlation between airframe longitudinal dimension and structural empty weight for supersonic configurations."
  },
  {
    id: 3,
    file: "03_MTOW_vs_WingArea.png",
    title: "MTOW vs Wing Area",
    category: "geometry",
    description: "Wing sizing study examining gross lifting surface requirements relative to 16,674 kg design take-off weight."
  },
  {
    id: 4,
    file: "04_MaxSpeed_vs_MTOW.png",
    title: "Max Speed vs MTOW",
    category: "performance",
    description: "Speed envelope comparison at Mach 2.1+ (2600 km/h) positioning Project Interceptor in the high-performance interceptor class."
  },
  {
    id: 5,
    file: "05_Ceiling_vs_CruiseSpeed.png",
    title: "Service Ceiling vs Cruise Speed",
    category: "performance",
    description: "Examines cruise efficiency at high altitude (18,000m ceiling) across historical combat aircraft datasets."
  },
  {
    id: 6,
    file: "06_Ceiling_vs_MaxSpeed.png",
    title: "Service Ceiling vs Max Speed",
    category: "performance",
    description: "High altitude combat ceiling capability plotted against dash speed limits."
  },
  {
    id: 7,
    file: "07_Range_vs_MTOW.png",
    title: "Combat Range vs MTOW",
    category: "performance",
    description: "Evaluation of operational mission radius (1,600 km) relative to internal fuel fraction and gross weight."
  },
  {
    id: 8,
    file: "08_TWRatio_vs_CruiseSpeed.png",
    title: "Thrust-to-Weight Ratio vs Cruise Speed",
    category: "propulsion",
    description: "Propulsion sizing balancing high excess thrust capability (T/W 1.79) with subsonic cruise fuel economics."
  },
  {
    id: 9,
    file: "09_TWRatio_vs_MaxSpeed.png",
    title: "Thrust-to-Weight Ratio vs Max Speed",
    category: "propulsion",
    description: "Shows afterburner thrust sizing necessary to overcome supersonic wave drag at 2600 km/h."
  },
  {
    id: 10,
    file: "10_Thrust_vs_MTOW.png",
    title: "Total Engine Thrust vs MTOW",
    category: "propulsion",
    description: "Installed thrust analysis confirming 294 kN power plant envelope relative to combat takeoff weight."
  },
  {
    id: 11,
    file: "11_WingLoading_vs_TWRatio.png",
    title: "Wing Loading vs Thrust-to-Weight Ratio",
    category: "propulsion",
    description: "Key combat maneuverability chart: Wing loading of 256.5 kg/m² paired with T/W 1.79 ensures superior sustained turn rates."
  },
  {
    id: 12,
    file: "12_LDRatio_vs_AspectRatio.png",
    title: "Lift-to-Drag Ratio (L/D) vs Aspect Ratio",
    category: "aerodynamics",
    description: "Aerodynamic efficiency trade study: Aspect Ratio of 3.0 yielding optimized L/D of 12.0 for supersonic sweep."
  },
  {
    id: 13,
    file: "13_LDRatio_vs_CruiseSpeed.png",
    title: "L/D Ratio vs Cruise Speed",
    category: "aerodynamics",
    description: "Cruise aerodynamic performance mapping to minimize drag rise at high subsonic cruise Mach numbers."
  },
  {
    id: 14,
    file: "14_MaxSpeed_vs_WingSweep.png",
    title: "Max Speed vs Wing Sweep Angle",
    category: "aerodynamics",
    description: "45-degree leading edge sweep angle optimization to delay critical Mach number shock wave formation."
  },
  {
    id: 15,
    file: "15_WingSweep_vs_CruiseSpeed.png",
    title: "Wing Sweep vs Cruise Speed",
    category: "aerodynamics",
    description: "Correlation between wing sweepback and cruise drag characteristics."
  },
  {
    id: 16,
    file: "16_WingSpan_vs_Length.png",
    title: "Aircraft Length vs Wing Span",
    category: "geometry",
    description: "Overall airframe geometric proportions: 19.5m length with 14.0m span maintaining supersonic fineness ratio."
  },
  {
    id: 17,
    file: "17_WingArea_vs_WingSpan.png",
    title: "Wing Area vs Wing Span",
    category: "geometry",
    description: "Planform geometry verification ensuring 65.0 m² gross lifting area distributes induced and wave drag effectively."
  },
  {
    id: 18,
    file: "18_WingLoading_vs_CruiseSpeed.png",
    title: "Wing Loading vs Cruise Speed",
    category: "aerodynamics",
    description: "Ride quality and gust response analysis for high-speed low-altitude penetration."
  }
];

const IOT_PROJECTS = [
  {
    id: 1,
    title: "Smart Water Level Indicator",
    category: "automation",
    image: "assets/images/iot/Project1_P1.png",
    mcu: "Arduino Uno",
    platform: "Wokwi Simulator & Embedded C++",
    sensors: ["HC-SR04 Ultrasonic Sensor", "Multi-Stage LED Array"],
    description: "Measures fluid levels in real-time using ultrasonic echo distance timing and displays discrete Low, Medium, and Full state warnings with overflow safeguard logic.",
    highlights: [
      "Ultrasonic pulse timing calculation",
      "Threshold-based multi-tier decision logic",
      "Anti-slosh debounce filtering"
    ],
    github: "https://github.com/Logesh-Aeronautical/Tamizan_Skills/tree/main/Project1"
  },
  {
    id: 2,
    title: "IoT Smart Agriculture Monitoring",
    category: "environmental",
    image: "assets/images/iot/Project2_P2.png",
    mcu: "ESP32",
    platform: "Arduino Framework & Wokwi",
    sensors: ["Capacitive Soil Moisture", "DHT11 / DHT22", "Serial Stream"],
    description: "Monitors microclimatic agricultural parameters including soil moisture volumetric content, ambient temperature, and humidity with telemetry serial transmission.",
    highlights: [
      "ESP32 ADC calibration for analog soil sensor",
      "Ambient heat index & moisture threshold triggers",
      "Telemetry telemetry packetization"
    ],
    github: "https://github.com/Logesh-Aeronautical/Tamizan_Skills/tree/main/Project2"
  },
  {
    id: 3,
    title: "Smart Home Automation Relay Controller",
    category: "automation",
    image: "assets/images/iot/Project3_P3.png",
    mcu: "ESP32 / Arduino Uno",
    platform: "Wokwi Simulator",
    sensors: ["Optocoupler Relay Modules", "Tactile Status Inputs"],
    description: "Automated appliance switching controller managing multi-channel GPIO relays for power optimization and simulated remote wireless switching concepts.",
    highlights: [
      "GPIO active-low relay isolation safety",
      "State preservation & automated scheduling",
      "Power consumption surge prevention"
    ],
    github: "https://github.com/Logesh-Aeronautical/Tamizan_Skills/tree/main/Project3"
  },
  {
    id: 4,
    title: "IoT Fire & Toxic Gas Detection Safety System",
    category: "safety",
    image: "assets/images/iot/Project4_P4.png",
    mcu: "Arduino Uno & ESP32",
    platform: "Wokwi & C++",
    sensors: ["MQ-Series Gas Sensor", "Temperature Sensor", "Piezo Buzzer", "Warning Strobe"],
    description: "Industrial safety system that monitors combustible gas ppm and thermal gradients to trigger dual audio-visual alarms during emergency threshold breaches.",
    highlights: [
      "Analog gas sensor curve linearization",
      "Multi-hazard cross-verification logic",
      "Zero-latency interrupt buzzer trigger"
    ],
    github: "https://github.com/Logesh-Aeronautical/Tamizan_Skills/tree/main/Project4"
  },
  {
    id: 5,
    title: "Smart Parking Guidance System",
    category: "automation",
    image: "assets/images/iot/Project5_P5.png",
    mcu: "Arduino Uno",
    platform: "Wokwi Simulator",
    sensors: ["IR Proximity Sensors", "Status Matrix Indicators"],
    description: "Automated parking lot bay occupancy tracker that detects vehicle arrival/departure using infrared beam reflection and maintains dynamic free-slot count.",
    highlights: [
      "Digital IR beam interruption detection",
      "Real-time bay occupancy state machine",
      "Anti-flicker entry/exit validation"
    ],
    github: "https://github.com/Logesh-Aeronautical/Tamizan_Skills/tree/main/Project5"
  },
  {
    id: 6,
    title: "Automatic Door Opener with Computer Vision",
    category: "vision",
    image: "", // Software based project
    mcu: "Python & Embedded Logic",
    platform: "OpenCV / MediaPipe / Python",
    sensors: ["Camera Stream", "Facial Landmark Model", "GPIO Trigger"],
    description: "Software-simulated biometric access control utilizing deep facial landmark detection to identify authorized personnel and signal solenoid door release.",
    highlights: [
      "Real-time Haar Cascade / MediaPipe landmark extraction",
      "Confidence thresholding for spoofing defense",
      "Serialized handshake to actuator controller"
    ],
    github: "https://github.com/Logesh-Aeronautical/Tamizan_Skills/tree/main/Project6"
  },
  {
    id: 7,
    title: "Biomedical Health & Fall Detection Monitor",
    category: "safety",
    image: "assets/images/iot/Project7_P7.png",
    mcu: "ESP32",
    platform: "Wokwi & C++",
    sensors: ["Body Temperature Sensor", "Simulated PPG Heart Rate", "MPU6050 IMU"],
    description: "Wearable health telemetry module tracking heart rate BPM, body temperature, and high-G sudden acceleration drops for automatic patient fall alerts.",
    highlights: [
      "IMU accelerometer vector magnitude computation",
      "Heart rate arrhythmia threshold triggers",
      "Emergency alert payload generation"
    ],
    github: "https://github.com/Logesh-Aeronautical/Tamizan_Skills/tree/main/Project7"
  },
  {
    id: 8,
    title: "Smart Municipal Garbage Fill Monitor",
    category: "automation",
    image: "assets/images/iot/Project8_P8.png",
    mcu: "Arduino Uno",
    platform: "Wokwi Simulator",
    sensors: ["HC-SR04 Ultrasonic Depth Sensor", "Alert Indicators"],
    description: "Smart city waste management solution calculating bin fill percentage and generating early municipal collection requests before overflow conditions occur.",
    highlights: [
      "Container acoustic volume profiling",
      "Periodic low-power sensing sleep intervals",
      "Overflow pre-warning warning thresholds"
    ],
    github: "https://github.com/Logesh-Aeronautical/Tamizan_Skills/tree/main/Project8"
  }
];
