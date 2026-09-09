# 🚀 Logesh - Aeronautical & Drone Engineering Portfolio
### 3D CAD • Structural FEA • ANSYS Fluent CFD • Embedded Avionics

Welcome to the engineering portfolio of **Logesh** (B.E. Aeronautical Engineering), targeting core **Aeronautical & UAS/Drone Engineering R&D** roles (**₹25,000+ / month stipend**).

Built with **React 18**, **Three.js (WebGL PBR)**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🌟 Key Highlights & Architecture

### 1. Interactive 3D CAD & Aerodynamics Studio (Three.js WebGL)
- **Built-in 3D Models**:
  - ✈️ **4.5-Gen Interceptor Jet**: 45° delta wings, chined fuselage, twin canted vertical fins, glowing afterburners.
  - 🛸 **Heavy-Lift Quadcopter Drone**: Carbon-fiber arms, motor pods, spinning rotor blades, and **Exploded View mode**.
  - 💨 **NACA Airfoil Section**: Wing chord profile with boundary layer inflation mesh.
- **Interactive Controls**: Full OrbitControls (Pitch, Yaw, Roll, Zoom), **Wireframe CAD Mesh Toggle**, **Wind-Tunnel Streamlines Toggle**, and Camera reset.
- **GLB / GLTF Drag-and-Drop Loader**: Directly drop or select any `.glb` or `.gltf` 3D CAD model to inspect live in real-time with PBR lighting and auto-centering.

---

### 2. The 3 Focused Core Case Studies (Visual Evidence)
Strictly structured across **Problem $\rightarrow$ Design & CAD Approach $\rightarrow$ Simulation / Analysis $\rightarrow$ Engineering Outcome**:

1. **4.5-Gen Interceptor Jet (ADP Deck)**:
   - **Problem**: Requirement for Mach 2.1+ supercruise, high combat agility ($T/W > 1.5$), and structural efficiency ($W_e/W_0 \le 0.55$).
   - **Design/CAD**: Modeled full airframe and landing gear assembly in **Autodesk Inventor**.
   - **Simulation**: Aerodynamic drag polar across flight regimes ($L/D = 12.0$), 294 kN reheat engine inlet sizing, and High-Low-High Operational Mission Profile.
   - **Outcome**: Validated 16,674 kg MTOW, 9,022 kg empty weight ($W_e/W_0 = 0.541$), and 18,000 m service ceiling against 18 historical supersonic combat aircraft.

2. **Quadcopter / Drone Airframe**:
   - **Problem**: Designing a rigid, vibration-dampened multirotor chassis to withstand peak rotor dynamic thrust without fatigue failure or excessive arm deflection.
   - **Design/CAD**: Isometric and exploded CAD modeling in **Autodesk Inventor** using 3K carbon-fiber arms and CNC central plates.
   - **Simulation**: **ANSYS Static Structural** FEA under maximum hover and 2.5G pull-up conditions (120 N rotor load).
   - **Outcome**: **Factor of Safety (FoS) $\ge 2.45$**, tip deflection $< 1.18$ mm, and **28% weight reduction** over extruded aluminum brackets.

3. **NACA Airfoil Flow Separation & Stall Analysis (ANSYS Fluent)**:
   - **Problem**: Predicting boundary layer transition, stall angle, and maximum lift ($C_{L,\text{max}}$) under adverse pressure gradients.
   - **Design/CAD**: Structured C-grid fluid domain with **20 boundary layer inflation layers** ensuring $y^+ \approx 1$.
   - **Simulation**: **ANSYS Fluent** CFD with the **SST $k\text{–}\omega$** turbulence model across angles of attack from $0^\circ$ to $18^\circ$.
   - **Outcome**: Captured stall at $\alpha = 15.5^\circ$, validating calculated $C_L$ and $C_D$ within $< 4.6\%$ error against NASA Langley wind tunnel data.
   - **Interactive Feature**: Live **Interactive Wind Tunnel Visualizer** with Angle of Attack slider ($-2^\circ$ to $20^\circ$) demonstrating real-time flow separation and stall vortices!

4. **Embedded Avionics & Flight Telemetry (Tamizan Skills)**:
   - 8 IoT & Embedded projects using **ESP32**, **Arduino Uno**, **Wokwi**, **MPU6050 6-DOF IMU**, and **Embedded C++**, verifying flight avionics firmware capabilities.

---

### 3. Parametric Studies (18 Comparative Plots)
- 18 high-resolution comparative engineering plots generated using Python (`Pandas`, `Matplotlib`, `Seaborn`).
- Categorized into Weight Fraction, Wing Geometry, Propulsion/Thrust, and Aerodynamics.
- Full-screen high-resolution inspection modal with 300 DPI plot downloads.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend**: React 18, Vite 6
- **3D Graphics**: Three.js (WebGL, OrbitControls, GLTFLoader)
- **Styling**: Tailwind CSS, Custom Aerospace HUD & Glassmorphism
- **Icons**: Lucide React
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run Vite development server
npm run dev

# Build for production
npm run build
```

---

## 🚀 One-Click GitHub Pages Deployment

This repository includes a preconfigured GitHub Actions workflow:
1. Push to your repository:
   ```bash
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings > Pages**
   - Under **Build and deployment > Source**, select **GitHub Actions**
3. The site will deploy automatically to `https://<username>.github.io/<repo>/`!

---

## 👤 Author

- **Name:** Logesh
- **Degree:** B.E. Aeronautical Engineering
- **GitHub:** [@Logesh-Aeronautical](https://github.com/Logesh-Aeronautical)
- **Email:** [logeshaero1566@gmail.com](mailto:logeshaero1566@gmail.com)
