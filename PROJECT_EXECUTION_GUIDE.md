# 📘 AEROSPACE & DRONE ENGINEERING PORTFOLIO: MASTER EXECUTION GUIDE
### Complete Step-by-Step Blueprint for Logesh (B.E. Aeronautical Engineering)
**Targeting Core Aeronautical, Drone Airframe, & CFD R&D Roles (₹25,000+ / Month Stipend)**

---

## 🎯 EXECUTIVE STRATEGY: HOW TO WIN A ₹25,000+/MONTH STIPEND

In core aerospace, defense, and drone R&D (companies like IdeaForge, Garuda Aerospace, Asteria, TechEagle, NAL, DRDO labs, and private aerospace startups), recruiters receive hundreds of resumes with generic bullet points like *"Knowledge of CAD and aerodynamics"*.

**Recruiters and engineering leads do not hire based on resumes — they hire based on visual evidence of engineering competence:**
1. **Parametric 3D CAD Models**: Showing clean surface lofting, mechanical assemblies, and exploded drawings.
2. **Physics-Backed Numerical Simulation**: Structural FEA stress heatmaps and CFD mesh inflation layers with viscous sublayer resolution ($y^+ \approx 1$).
3. **Structured Case Studies**: Proving you understand **WHY** a design decision was made, not just how to push buttons in software.

Every project in your portfolio must follow the **4-Sentence Engineering Framework**:
$$\text{The Problem} \longrightarrow \text{Design / CAD Approach} \longrightarrow \text{Simulation & Analysis} \longrightarrow \text{Engineering Outcome}$$

---

# ✈️ PROJECT 1: 4.5-GEN SUPERSONIC INTERCEPTOR JET (ADP DECK)

### 📌 1. Project Overview & Philosophy
A comprehensive conceptual aircraft design and 3D CAD modeling project for a **Mach 2.1+ high-altitude supersonic interception aircraft**. This project demonstrates complete aircraft synthesis from mission profile sizing down to supersonic wedge inlet geometry.

* **Key Specifications**:
  * **MTOW**: 16,674 kg
  * **Empty Weight ($W_e$)**: 9,022 kg ($W_e/W_0 = 0.541$)
  * **Max Dash Speed**: 2,600 km/h (Mach 2.1+)
  * **Installed Thrust**: 294 kN (Afterburner Turbofan)
  * **Thrust-to-Weight ($T/W$)**: 1.79
  * **Wing Loading ($W/S$)**: 256.5 kg/m²
  * **Wing Geometry**: Span 14.0 m | Area 65.0 m² | Leading Edge Sweep 45° | Aspect Ratio 3.0 | $L/D = 12.0$
  * **Service Ceiling**: 18,000 m (59,000 ft)
  * **Combat Radius**: 1,600 km

---

### 🛠️ 2. Required Tools & Software
* **Autodesk Inventor** (or SolidWorks / CATIA V5) — 3D Part & Assembly Modeling
* **Python / MS Excel** — Mission segment weight fraction and sizing equations
* **OpenVSP** (Optional) — Rapid parametric aerodynamic geometry visualization

---

### 📋 3. Step-by-Step Execution Guide

#### Step 1: Mission Profile & Constraint Weight Sizing
1. Define the mission segments: Warm-up & Takeoff (Node 0) $\to$ Climb-out (Node 1) $\to$ High-Altitude Cruise Out (Node 2) $\to$ Rapid Tactical Descent (Node 3) $\to$ High-G Combat Loop at Max Power (Node 4) $\to$ Zoom Climb (Node 5) $\to$ Cruise In & Loiter (Node 6) $\to$ Descent & Landing.
2. Calculate fuel fraction for each segment using Raymer's historical exponent relations:
   $$\frac{W_{i+1}}{W_i}$$
3. Estimate empty weight fraction using statistical regression:
   $$\frac{W_e}{W_0} = A \cdot W_0^C \cdot K_{vs}$$
   *Result: Empty weight fraction of 0.541 (9,022 kg dry weight for 16,674 kg MTOW).*

#### Step 2: Aerodynamic Wing & Tail Sizing
1. **Sweep Angle**: Choose $45^\circ$ leading-edge sweep to delay critical Mach number drag divergence.
2. **Aspect Ratio**: Set $AR = 3.0$ with thin supersonic airfoil section (e.g., NACA 64A-006 or biconvex profile with $t/c = 5\%$) to minimize supersonic wave drag.
3. **Twin Canted Stabilizers**: Angle vertical tails outwards at $15^\circ - 20^\circ$ to escape wing wake turbulence at high angles of attack and reduce lateral radar cross-section.

#### Step 3: Supersonic Inlet Sizing
1. Design external/internal compression two-ramp wedge inlets.
2. Size capture area to deliver air to the engine face decelerated to subsonic speeds (Mach 0.4 - 0.5) through oblique shockwaves and a normal terminal shock.

#### Step 4: Autodesk Inventor 3D CAD Modeling
1. **Fuselage Lofting**: Create 5-7 transverse cross-section sketches (radome, cockpit, inlet integration, weapons bay, twin engine nacelles). Apply smooth G2 continuity loft.
2. **Wings & Tailfins**: Model symmetric aerofoil sketches, extrude with $45^\circ$ sweep, and apply tip wash-out (twist of $-1.5^\circ$) to prevent tip stall.
3. **Landing Gear Assembly**: Model retractable oleo-pneumatic shock struts, wheel hubs, torque links, and retraction actuators.
4. **Export Formats**: Save as native `.iam`/`.ipt`, neutral `.step`, and high-polygon `.stl` / `.glb` for 3D web viewing.

---

### 📸 4. Deliverables & Screenshots Checklist
* [x] **Top-Down Planform Render**: Showing 45° wing sweep, aspect ratio, and fuselage area-ruling (`interceptor_cad_top.jpg`).
* [x] **Isometric 3D Assembly Render**: Highlighting surface finish, cockpit canopy, and engine nozzles (`interceptor_cad_iso.jpg`).
* [x] **Front View Cross-Section**: Showing supersonic wedge inlets and canted twin vertical stabilizers (`interceptor_cad_front.jpg`).
* [x] **High-Low-High Operational Mission Profile**: Generated graph showing altitude vs mission distance with nodes 0 to 6 (`mission_profile.png`).
* [x] **Complete Specification Table**: Listing all 16 airframe geometry, performance, and propulsion metrics.

---

### 🎙️ 5. Interview Defense: How to Speak Like an Expert
* **Q: Why choose an empty weight fraction ($W_e/W_0$) of 0.541?**
  * *Winning Answer*: *"For 4.5-gen supersonic interceptors, titanium alloys and carbon-fiber composites allow empty weight fractions between 0.52 and 0.56. At 0.541, our 9,022 kg dry weight accommodates the dual afterburning turbofans and internal weapons carriage while reserving 45% gross takeoff weight for internal fuel and stores, yielding a 1,600 km combat radius without drop tanks."*
* **Q: Why a 45° sweep angle and an aspect ratio of 3.0?**
  * *Winning Answer*: *"At Mach 2.1+, wave drag dominates. A 45° leading-edge sweep keeps the wing inside the Mach cone ($\mu = \arcsin(1/M) \approx 28.4^\circ$ at Mach 2.1). An aspect ratio of 3.0 provides the optimal trade-off between low supersonic wave drag and sufficient subsonic lift-to-drag ($L/D = 12.0$) for efficient loiter and recovery."*

---

# 🛸 PROJECT 2: HEAVY-LIFT QUADCOPTER / UAS DRONE AIRFRAME

### 📌 1. Project Overview & Philosophy
Design, parametric 3D CAD modeling, and **ANSYS Static Structural Finite Element Analysis (FEA)** of an industrial multirotor chassis. This project demonstrates knowledge of structural rigidity, composite materials, dynamic rotor load factors, and vibration damping for drone platforms.

* **Key Specifications**:
  * **Configuration**: Heavy-Lift Quadcopter / Hexacopter Chassis
  * **Primary Airframe**: 3K Twill Matte Carbon-Fiber Tubular Arms (Ø25mm, 1.5mm wall thickness)
  * **Plates & Mounts**: CNC 6061-T6 Aluminum & Carbon-Infused PETG
  * **Max Design Rotor Thrust**: 120 N per arm ($2.5G$ dynamic pull-up envelope)
  * **Maximum Von Mises Stress**: 142.6 MPa (Well within allowable yield of 276 MPa for 6061-T6 and 600+ MPa for Carbon Fiber)
  * **Structural Factor of Safety**: $\mathbf{FoS = 2.45}$
  * **Tip Deflection**: Under 1.18 mm under maximum dynamic load
  * **Weight Savings**: 28% mass reduction over extruded aluminum

---

### 🛠️ 2. Required Tools & Software
* **Autodesk Inventor** — 3D Part Modeling, Mates, Exploded Presentation Views
* **ANSYS Static Structural** (or SolidWorks Simulation / Fusion 360 FEA)
* **Carbon Fiber Composite Sizing Calculator**

---

### 📋 3. Step-by-Step Execution Guide

#### Step 1: Sizing & Geometric Layout
1. Calculate required total hover thrust: For a 6 kg drone, hover thrust = $6 \times 9.81 \approx 58.8\text{ N}$.
2. Apply a $2:1$ or $2.5:1$ thrust-to-weight ratio for athletic maneuverability and wind resistance: Max thrust = $150\text{ N}$ total ($37.5\text{ N} - 40\text{ N}$ per motor in hover, $120\text{ N}$ peak dynamic thrust under 2.5G pull-up).
3. Determine diagonal motor-to-motor wheelbase (e.g., 650 mm - 800 mm) ensuring at least $15\%$ prop-tip clearance.

#### Step 2: Autodesk Inventor 3D Modeling
1. **Central Chassis Plates**: Model top and bottom mounting plates with lightweighting pockets, battery strap cutouts, and standard 30.5x30.5mm / 20x20mm flight controller mounting holes.
2. **Arm Clamps**: Design two-piece clamping blocks with socket head cap screws ($M3$) that clamp the cylindrical carbon arms securely without crushing the carbon composite weave.
3. **Motor Mounts**: Model motor mounting plates with heat dissipation slots and vibration-dampening silicone grommet seats.
4. **Exploded Assembly View**: Create an Inventor Presentation (`.ipn`) showing fastener stacking, standoffs, plates, arm tubes, and motor hardware.

#### Step 3: ANSYS Static Structural Simulation
1. **Material Definition**:
   * Carbon Fiber Composite: Orthotropic elasticity ($E_x = 135\text{ GPa}, E_y = 10\text{ GPa}, \nu_{xy} = 0.3$).
   * Central Clamps (6061-T6): Isotropic ($E = 68.9\text{ GPa}, \text{Yield} = 276\text{ MPa}$).
2. **Boundary Conditions**:
   * **Fixed Support**: Fix the central plate mounting standoffs (where payload/battery inertia is concentrated).
   * **Force Load**: Apply $120\text{ N}$ upward thrust vector on each motor mounting face, plus a motor torque moment of $1.8\text{ N}\cdot\text{m}$.
3. **Meshing**: Use adaptive tetrahedral mesh with local refinement (body sizing of 2 mm on brackets, inflation layers at bolt contact zones).
4. **Solve**: Evaluate Equivalent (Von Mises) Stress, Total Deformation, and Safety Tool (Factor of Safety).

---

### 📸 4. Deliverables & Screenshots Checklist
* [x] **Isometric Assembly CAD**: Clean 3D view of the complete chassis (`drone_cad_iso.png`).
* [x] **Exploded CAD Assembly**: Showing fastener stacking, central plates, dampeners, and arm locking mechanisms (`drone_cad_exploded.png`).
* [x] **Bracket Structural Detail**: High-resolution view of motor mounts and clamp geometry (`drone_cad_bracket.png`).
* [x] **ANSYS FEA Stress Contour Plot**: Heatmap proving maximum stress is 142.6 MPa with $\text{FoS} \ge 2.45$.
* [x] **ANSYS FEA Displacement Plot**: Proving tip deflection under peak thrust is $< 1.18\text{ mm}$.

---

### 🎙️ 5. Interview Defense: How to Speak Like an Expert
* **Q: Why did you choose tubular carbon fiber over square carbon fiber arms?**
  * *Winning Answer*: *"Cylindrical tubular arms provide superior torsional rigidity per unit mass, which is critical for counteracting motor torque yaw moments. Additionally, circular tubes create less aerodynamic drag in the rotor downwash, improving overall propulsion efficiency by 3-5% compared to square tubes."*
* **Q: How did you validate structural safety in ANSYS?**
  * *Winning Answer*: *"I applied a 2.5G dynamic load case (120 N per arm) representing an abrupt high-speed pull-up maneuver. In ANSYS Static Structural, the peak Von Mises stress concentrated around the clamp bolt interfaces at 142.6 MPa, yielding a minimum Factor of Safety of 2.45 against the 276 MPa yield strength of 6061-T6 aluminum, with tip deflection restricted to 1.18 mm."*

---

# 💨 PROJECT 3: NACA AIRFOIL FLOW SEPARATION & STALL ANALYSIS (ANSYS FLUENT CFD)

### 📌 1. Project Overview & Philosophy
High-fidelity **Computational Fluid Dynamics (CFD)** simulation of a NACA airfoil (NACA 0012 / 4412) to capture viscous boundary layer behavior, pressure distributions ($C_p$), boundary layer separation, and stall.

* **Key Specifications**:
  * **Airfoil Profiles**: NACA 0012 (Symmetric baseline) / NACA 4412 (Cambered)
  * **CFD Solver**: ANSYS Fluent (Pressure-Based Coupled)
  * **Turbulence Model**: Shear Stress Transport ($SST\; k\text{–}\omega$)
  * **Boundary Layer Inflation**: 20 prism layers | First layer height $y^+ \le 1.0$ (Resolving viscous sublayer)
  * **Reynolds Number**: $Re = 3.0 \times 10^6$
  * **Predicted Stall Angle**: $\alpha = 15.5^\circ$
  * **Max Lift Coefficient ($C_{L,\text{max}}$)**: 1.58 @ $15.5^\circ$
  * **Validation Accuracy**: $< 4.6\%$ deviation from NASA Langley / Abbott & Von Doenhoff experimental data

---

### 🛠️ 2. Required Tools & Software
* **ANSYS Fluent & ANSYS Meshing / DesignModeler**
* **AirfoilTools.com** (to download raw NACA coordinates)
* **Python (Matplotlib / NumPy)** or Excel for plotting $C_L$ vs $\alpha$, $C_D$ vs $\alpha$, and $C_p$ vs $x/c$

---

### 📋 3. Step-by-Step Execution Guide

#### Step 1: Fluid Domain & Geometry Setup
1. Import the NACA coordinates into ANSYS DesignModeler / SpaceClaim. Scale chord length to $c = 1.0\text{ m}$.
2. Build a classical **C-grid fluid domain**:
   * Upstream semicircle radius: $15c$ (15 meters).
   * Downstream outlet boundary: $25c$ (25 meters).
   * Far-field height: $15c$ above and below.
   *(This ensures domain boundaries do not induce artificial pressure reflections).*

#### Step 2: Boundary Layer Inflation Meshing ($y^+ \le 1$)
1. Calculate the required first layer height ($y$) using the flat plate turbulent skin friction formula:
   $$C_f = 0.0583 \cdot Re^{-0.2}$$
   $$\tau_w = \frac{1}{2} \rho U_\infty^2 C_f, \quad u_\tau = \sqrt{\frac{\tau_w}{\rho}}, \quad y = \frac{y^+ \mu}{\rho u_\tau}$$
   *For $Re = 3 \times 10^6$ and $y^+ = 1$, the first cell height is approximately $y \approx 1.2 \times 10^{-5}\text{ m}$ ($0.012\text{ mm}$).*
2. Generate **20 inflation layers** with a smooth growth rate of $1.15$.
3. Mesh the remaining fluid domain with structured quad/hex dominant elements, ensuring smooth cell transitions.

#### Step 3: Solver & Physics Configuration in ANSYS Fluent
1. **Solver**: Pressure-Based, Steady, Incompressible Navier-Stokes.
2. **Turbulence Model**: Select **$SST\; k\text{–}\omega$** with Low-Re corrections enabled (vital for adverse pressure gradient boundary layer separation).
3. **Boundary Conditions**:
   * **Inlet**: Velocity Inlet ($U_\infty = 43.8\text{ m/s}$ for $Re = 3 \times 10^6$), Turbulence Intensity = $0.1\%$, Viscosity Ratio = $10$.
   * **Outlet**: Pressure Outlet ($P_{\text{gauge}} = 0\text{ Pa}$).
   * **Airfoil Wall**: No-Slip Stationary Wall.
4. **Discretization Schemes**: Second-Order Upwind for Momentum, Turbulent Kinetic Energy ($k$), and Specific Dissipation Rate ($\omega$). Use Coupled algorithm for pressure-velocity coupling.

#### Step 4: Angle of Attack ($\alpha$) Sweep & Convergence
1. Run simulations for $\alpha = 0^\circ, 4^\circ, 8^\circ, 12^\circ, 14^\circ, 15^\circ, 15.5^\circ, 16^\circ, 18^\circ$.
2. Monitor residuals ($< 10^{-5}$) and steady convergence of $C_L$ and $C_D$ monitor lines.
3. Observe how the flow remains attached up to $12^\circ$, starts separating from the trailing edge at $14^\circ$, and develops large recirculating stall vortices across the entire upper suction surface past $15.5^\circ$.

---

### 📸 4. Deliverables & Screenshots Checklist
* [x] **Inflation Layer Mesh View**: Zoomed screenshot of the leading edge and trailing edge showing the 20 structured prism layers adhering to the airfoil wall.
* [x] **Velocity Streamline Contours at $\alpha = 4^\circ$**: Showing smooth attached laminar/transitional flow.
* [x] **Velocity Streamline Contours at $\alpha = 16^\circ$**: Showing recirculating stall vortices and flow separation over the suction surface.
* [x] **Static Pressure Distribution ($C_p$ vs $x/c$)**: Showing high negative suction peak near the leading edge.
* [x] **Validation Curve Graph**: Comparing calculated $C_L$ and $C_D$ curves against NASA Langley wind tunnel data with $< 4.6\%$ deviation.

---

### 🎙️ 5. Interview Defense: How to Speak Like an Expert
* **Q: Why did you choose the $SST\; k\text{–}\omega$ model instead of the standard $k\text{–}\epsilon$ model?**
  * *Winning Answer*: *"The standard $k\text{–}\epsilon$ model performs well in the free stream but fails miserably near walls under adverse pressure gradients because it overpredicts turbulent shear stress and delays flow separation. Menter's $SST\; k\text{–}\omega$ blends Wilcox's $k\text{–}\omega$ near the wall (which accurately resolves the sublayer without damping functions) with $k\text{–}\epsilon$ in the far-field, making it the industry standard for aerodynamic stall and separation prediction."*
* **Q: What is $y^+$ and why did you target $y^+ \le 1$?**
  * *Winning Answer*: *"$y^+$ is the non-dimensional wall distance ($y u_\tau / \nu$). In boundary layer theory, the viscous sublayer extends from $y^+ = 0$ to $5$. If $y^+ > 30$, the solver must use empirical wall functions, which assume attached equilibrium boundary layers and cannot capture stall. By setting the first cell height at $0.012\text{ mm}$ for $y^+ \le 1$, we numerically integrate the Navier-Stokes equations all the way down to the wall, accurately resolving the wall shear stress and separation point."*

---

# ⚡ PROJECT 4: EMBEDDED FLIGHT AVIONICS & IOT SENSOR TELEMETRY (TAMIZAN SKILLS)

### 📌 1. Project Overview & Philosophy
Hardware firmware development bridging aeronautical mechanics with **flight controller avionics**. Completed as part of an embedded systems internship at **Tamizan Skills**, this work covers microcontroller programming, 6-DOF IMU attitude estimation, ultrasonic distance echo timing, and serial telemetry transmission.

* **Key Specifications**:
  * **Microcontrollers**: ESP32 (Dual Core Xtensa 240 MHz) & Arduino Uno (ATmega328P)
  * **Firmware Language**: Embedded C / C++ with Arduino Framework
  * **Simulation Platform**: Wokwi Hardware Simulator
  * **Sensors Integrated**:
    * **MPU6050**: 6-Axis Accelerometer & Gyroscope (I2C) for attitude, tilt, and fall detection
    * **HC-SR04**: Ultrasonic Echo Pulse Timing for ground proximity altitude hold
    * **MQ Series**: Toxic/Combustible Gas & Temperature gradient threshold detection
    * **Relay Modules**: Optocoupler-isolated GPIO power management
  * **Communication Protocols**: I2C ($400\text{ kHz}$ Fast Mode), SPI, UART Serial Telemetry
  * **Code Quality**: Non-blocking `millis()` state machine architecture (zero `delay()` calls)

---

### 🛠️ 2. Required Tools & Software
* **Arduino IDE** or **VS Code + PlatformIO**
* **Wokwi Simulator** (Browser-based hardware/firmware simulation)
* **GitHub Repository**: [Tamizan_Skills](https://github.com/Logesh-Aeronautical/Tamizan_Skills)

---

### 📋 3. Step-by-Step Execution Guide

#### Step 1: Non-Blocking Architecture & State Machines
1. Eliminate all blocking `delay()` statements: A flight controller or avionics module that calls `delay(1000)` stops reading sensors for an entire second, causing immediate crashes.
2. Implement a `millis()` timer task scheduler:
   * 100 Hz Loop (10 ms): Read MPU6050 IMU accelerometer/gyro.
   * 20 Hz Loop (50 ms): Read HC-SR04 ultrasonic distance sensor.
   * 10 Hz Loop (100 ms): Stream telemetry packet over UART.

#### Step 2: MPU6050 6-Axis IMU Interfacing
1. Configure I2C bus at 400 kHz (`Wire.setClock(400000)`).
2. Read raw accelerometer registers ($X, Y, Z$) and gyroscope registers ($p, q, r$).
3. Convert raw LSBs to engineering units ($g$ and $^\circ/\text{s}$).
4. Calculate tilt angles (Roll $\phi$ and Pitch $\theta$) using accelerometer trigonometry:
   $$\phi = \arctan\left(\frac{A_y}{\sqrt{A_x^2 + A_z^2}}\right), \quad \theta = \arctan\left(\frac{-A_x}{A_z}\right)$$
5. Implement emergency high-G fall / impact detection: If total acceleration magnitude $\sqrt{A_x^2 + A_y^2 + A_z^2} < 0.2\text{ g}$ (free-fall) or $> 3.5\text{ g}$ (crash impact), trigger emergency interrupt.

#### Step 3: Ground Proximity & Altitude Hold Simulation
1. Trigger HC-SR04 with a $10\;\mu\text{s}$ digital pulse.
2. Read the echo return pulse width using hardware input capture / `pulseIn()`.
3. Compute distance: $D = \frac{\text{time} \times 0.0343}{2}\text{ cm}$.
4. Drive a 3-tier LED status indicator and emergency proximity buzzer when distance drops below safety thresholds.

#### Step 4: Telemetry Serial Stream Packetization
1. Package attitude angles, proximity distance, and safety flags into compact serialized ASCII or binary telemetry frames:
   `$TEL,ROLL,PITCH,ALT,STATUS*CHK`
2. Stream out over ESP32 UART2 to ground control station / simulated dashboard.

---

### 📸 4. Deliverables & Screenshots Checklist
* [x] **MPU6050 Fall & Attitude Telemetry Schematic**: (`Project7_P7.png`)
* [x] **Ultrasonic Distance / Ground Warning Schematic**: (`Project1_P1.png`)
* [x] **Hazard / Environmental Sensor Circuit**: (`Project4_P4.png`)
* [x] **ESP32 Telemetry Station Schematic**: (`Project2_P2.png`)
* [x] **GitHub Codebase**: 8 well-commented C++ project folders in [Tamizan_Skills](https://github.com/Logesh-Aeronautical/Tamizan_Skills).

---

### 🎙️ 5. Interview Defense: How to Speak Like an Expert
* **Q: Why is non-blocking firmware critical in drone and aerospace avionics?**
  * *Winning Answer*: *"In UAV flight controllers, sensor polling, attitude estimation filters, and motor PWM output updates must run in a deterministic, non-blocking real-time loop at 100 Hz to 400 Hz. If a programmer uses `delay()`, the CPU halts execution, missing gyroscope updates and leading to attitude divergence and crashes. In my projects, I used a non-blocking `millis()` scheduler with timer interrupts to ensure zero-latency sensor sampling."*
* **Q: How does this embedded experience apply to autonomous drones?**
  * *Winning Answer*: *"Aeronautical engineering gives me the aerodynamic equations and structural knowledge, but embedded systems allow me to bridge the physical airframe with the digital flight controller. I understand how the MPU6050 IMU sends raw sensor packets over I2C, how to filter noise, and how to format telemetry over UART to talk to autopilots like ArduPilot or PX4."*

---

# 📈 PROJECT 5: PARAMETRIC HISTORICAL AIRCRAFT DATA MODELING (PYTHON)

### 📌 1. Project Overview & Philosophy
Data-driven statistical validation of the **4.5-Gen Interceptor Jet** against historical supersonic combat aircraft. Using Python (`Pandas`, `Matplotlib`, `Seaborn`), Logesh extracted 18 publication-quality parametric correlation plots, proving that every dimension, wing loading, and thrust ratio of his aircraft aligns with verified aeronautical scaling laws.

* **Key Specifications**:
  * **Dataset**: `Data.xlsx` & `aircraft_data.csv` covering historical supersonic fighters (F-15, F-16, MiG-25, Su-27, Rafale, Typhoon, etc.)
  * **Total Parametric Plots**: **18 High-Resolution Charts (300 DPI)**
  * **Categories Evaluated**:
    1. **Weight & Fractions**: Empty Weight Fraction vs MTOW ($W_e/W_0$ vs $W_0$), Empty Weight vs Length
    2. **Airframe Geometry**: MTOW vs Wing Area ($W_0$ vs $S$), Length vs Wing Span, Wing Area vs Wing Span
    3. **Propulsion & Power**: Installed Thrust vs MTOW, Thrust-to-Weight vs Max Speed, Thrust-to-Weight vs Cruise
    4. **Flight Envelope & Aerodynamics**: Speed vs MTOW, Ceiling vs Cruise, Combat Range vs MTOW, Lift-to-Drag ($L/D$) vs Aspect Ratio, Wing Sweep vs Mach, Wing Loading vs Cruise Speed

---

### 🛠️ 2. Required Tools & Software
* **Python 3.10+**
* **Pandas** (Data cleaning, regex extraction, numerical scrubbing)
* **Matplotlib & Seaborn** (Publication-grade engineering visualizations)
* **Script**: `graphs.py`

---

### 📋 3. Step-by-Step Execution Guide

#### Step 1: Data Scrubbing & Cleaning
1. Parse `Data.xlsx` sheets using Pandas.
2. Clean noisy historical data: Write custom regex sanitizers to handle commas, missing parameters, and mixed metric units (convert lbs to kg, feet to meters, knots to km/h).
3. Structure clean DataFrame:
   `Aircraft Name | MTOW (kg) | Empty Wt (kg) | We/W0 | Wing Area (m2) | Thrust (kN) | Max Speed (km/h) | Ceiling (m) | L/D`

#### Step 2: Automated Plotting Engine in Python
1. Set Seaborn clean theme: `sns.set_theme(style="whitegrid")`.
2. Write a modular generator function:
```python
def generate_comparative_graph(x_col, y_col, x_label, y_label, filename):
    plt.figure(figsize=(10, 6), dpi=300)
    plot_df = df.dropna(subset=[x_col, y_col])
    # Scatter historical fleet
    plt.scatter(plot_df[x_col], plot_df[y_col], color='royalblue', alpha=0.8, s=90)
    # Highlight Logesh's Interceptor
    plt.scatter(logesh_jet[x_col], logesh_jet[y_col], color='blue', marker='o', s=120, edgecolor='black', zorder=5)
    # Save at 300 DPI
    plt.savefig(f"Project_Graphs/{filename}.png", bbox_inches='tight')
```
3. Generate all 18 plots with crisp labels, units, and axes limits.

#### Step 3: Aeronautical Sensitivity Analysis
1. Analyze the **$L/D$ vs Aspect Ratio** plot: Demonstrates why $AR = 3.0$ achieves $L/D = 12.0$ while keeping supersonic wave drag low.
2. Analyze the **Thrust-to-Weight vs Max Speed** plot: Demonstrates that achieving Mach 2.1+ requires $T/W \ge 1.5$ to overcome the transonic drag rise.

---

### 📸 4. Deliverables & Screenshots Checklist
* [x] **Complete Python Script**: `graphs.py`
* [x] **Clean Dataset**: `aircraft_data.csv` and `Data.xlsx`
* [x] **All 18 High-Resolution PNG Plots**: Stored in `Project_Graphs/` and interactive inside the portfolio gallery.

---

### 🎙️ 5. Interview Defense: How to Speak Like an Expert
* **Q: Why did you write Python scripts to compare your jet against historical aircraft?**
  * *Winning Answer*: *"In conceptual aircraft design, you cannot design an airframe in a vacuum. By compiling historical aircraft data and writing automated Python regression scripts with Pandas and Seaborn, I validated that my interceptor's parameters (such as $W_e/W_0 = 0.541$ and wing loading of $256.5\text{ kg/m}^2$) fall precisely within the verified design envelope of modern supersonic aircraft. It proves that the design is grounded in historical engineering physics, not guesswork."*

---

# 🚀 HOW TO UPLOAD LOGESH'S PORTFOLIO TO GITHUB

Your local Git repository in `C:\Projects\Logesh\portfolio` is already committed with Logesh's identity:
* **Author Name**: `Logesh`
* **Author Email**: `logeshaero1566@gmail.com`
* **Remote Target**: `https://Logesh-Aeronautical@github.com/Logesh-Aeronautical/portfolio.git`

To make it live on GitHub, pick either **Option A** or **Option B**:

### ⚡ Option A: Via GitHub CLI (Fastest — 30 seconds)
Open PowerShell in the portfolio directory:
```powershell
cd C:\Projects\Logesh\portfolio

# 1. Login to Logesh's GitHub account in GitHub CLI
gh auth login --hostname github.com
# Select: GitHub.com -> HTTPS -> Login with a web browser (or paste Personal Access Token)

# 2. Create the repository under Logesh-Aeronautical and push!
gh repo create portfolio --public --source=. --remote=origin --push
```

### 🌐 Option B: Via GitHub Web Browser (1 minute)
1. Open your browser and log into Logesh's GitHub account: **https://github.com/new**
2. In **Repository name**, enter: `portfolio`
3. Set visibility to **Public**
4. Do **NOT** check "Add a README file" (the repo already has full code committed!)
5. Click **Create repository**
6. Open PowerShell and run:
   ```powershell
   cd C:\Projects\Logesh\portfolio
   git push -u origin main
   ```
7. In the GitHub repository settings:
   * Go to **Settings > Pages**
   * Under **Build and deployment > Source**, select **GitHub Actions**
   * GitHub will automatically compile the React + Three.js code and publish it live at:
     `https://logesh-aeronautical.github.io/portfolio/`

---
*Generated for Logesh (B.E. Aeronautical Engineering) — Target: ₹25,000+/Month Core Aerospace R&D.*
