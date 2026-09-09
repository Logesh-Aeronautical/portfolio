import React, { useState, useEffect, useRef } from 'react';
import { Wind, Gauge, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function InteractiveWindTunnel() {
  const [aoa, setAoa] = useState(4); // Angle of Attack in degrees
  const canvasRef = useRef(null);

  // Aerodynamic Calculations based on Thin Airfoil Theory & Stall Transition
  const aoaRad = (aoa * Math.PI) / 180;
  
  // Cl curve calculation (linear lift slope + stall drop at 15.5 deg)
  let cl = 0;
  let cd = 0;
  let flowState = "Attached Laminar Flow";
  let stateColor = "text-emerald-400 border-emerald-500/30 bg-emerald-950/40";

  if (aoa <= 12) {
    cl = 0.1 + (2 * Math.PI * 0.95 * aoaRad);
    cd = 0.008 + 0.045 * Math.pow(cl, 2);
    flowState = "Attached Laminar Flow";
    stateColor = "text-emerald-400 border-emerald-500/30 bg-emerald-950/40";
  } else if (aoa <= 15.5) {
    cl = 0.1 + (2 * Math.PI * 0.95 * aoaRad) * (1 - (aoa - 12) * 0.05);
    cd = 0.008 + 0.08 * Math.pow(cl, 2);
    flowState = "Adverse Gradient / Separation Onset";
    stateColor = "text-amber-400 border-amber-500/30 bg-amber-950/40";
  } else {
    // Deep stall
    cl = 1.58 - (aoa - 15.5) * 0.12;
    cd = 0.15 + (aoa - 15.5) * 0.035;
    flowState = "Critical Aerodynamic Stall (Flow Separated)";
    stateColor = "text-rose-400 border-rose-500/30 bg-rose-950/40";
  }

  const ldRatio = cl / (cd || 0.001);

  // 2D Canvas Streamline Particle Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const width = canvas.width = canvas.parentElement.clientWidth;
    const height = canvas.height = 360;

    // Streamline particles
    const numParticles = 160;
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseY: Math.random() * height,
        speed: 3 + Math.random() * 2,
        history: []
      });
    }

    const centerX = width * 0.45;
    const centerY = height * 0.52;
    const chord = 180;

    const render = () => {
      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, width, height);

      // Subtle Background Grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Airfoil coordinates and rotation
      const rad = -(aoa * Math.PI) / 180;

      // Draw Airfoil Profile
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rad);

      ctx.beginPath();
      // Cambered NACA profile path
      ctx.moveTo(chord * 0.5, 0); // Trailing edge
      ctx.bezierCurveTo(chord * 0.2, -30, -chord * 0.3, -28, -chord * 0.5, 0); // Upper camber
      ctx.bezierCurveTo(-chord * 0.3, 15, chord * 0.2, 10, chord * 0.5, 0); // Lower surface
      ctx.closePath();

      // Airfoil gradient fill
      const grad = ctx.createLinearGradient(-chord * 0.5, -30, chord * 0.5, 20);
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(0.5, '#0f172a');
      grad.addColorStop(1, '#00f0ff');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Chord line
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(-chord * 0.55, 0);
      ctx.lineTo(chord * 0.55, 0);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      // Update & Draw Wind Streamlines
      ctx.lineWidth = 1.5;
      particles.forEach((p) => {
        p.x += p.speed;

        // Flow deflection around airfoil
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetY = p.baseY;

        if (dist < chord * 0.8) {
          // Flow pushes around airfoil
          const influence = (1 - dist / (chord * 0.8));
          if (p.baseY < centerY) {
            // Suction side: flow accelerates and curves down
            targetY = p.baseY - influence * 25 - (aoa * influence * 1.8);
            if (aoa > 15) {
              // Stall vortices: introduce chaotic turbulence
              targetY += Math.sin(p.x * 0.15) * influence * 20;
            }
          } else {
            // Pressure side: flow pushed downwards
            targetY = p.baseY + influence * 20;
          }
        }

        p.y += (targetY - p.y) * 0.15;

        // Reset if offscreen
        if (p.x > width) {
          p.x = 0;
          p.baseY = Math.random() * height;
          p.y = p.baseY;
          p.history = [];
        }

        // Draw particle tail
        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > 8) p.history.shift();

        if (p.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let i = 1; i < p.history.length; i++) {
            ctx.lineTo(p.history[i].x, p.history[i].y);
          }
          // Color based on velocity / pressure
          const speedColor = (p.baseY < centerY && dist < chord * 0.8)
            ? (aoa > 15 ? 'rgba(244, 63, 94, 0.7)' : 'rgba(0, 240, 255, 0.8)')
            : 'rgba(56, 189, 248, 0.4)';
          ctx.strokeStyle = speedColor;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [aoa]);

  return (
    <div className="glass-panel p-6 rounded-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 tracking-widest px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40">
            <Wind className="w-3.5 h-3.5" />
            Interactive Flow & Stall Simulation
          </div>
          <h3 className="text-xl font-bold text-white mt-2">
            NACA Airfoil Wind Tunnel Visualizer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Drag angle of attack to observe boundary layer separation and stall hysteresis.
          </p>
        </div>

        <div className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-medium flex items-center gap-2 ${stateColor}`}>
          {aoa > 15 ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          <span>{flowState}</span>
        </div>
      </div>

      {/* 2D Wind Tunnel Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#070b14]">
        <canvas ref={canvasRef} className="w-full h-[360px] block" />

        {/* Live HUD Readouts Overlay */}
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 rounded-xl text-xs font-mono space-y-1.5 shadow-lg pointer-events-none">
          <div className="text-[10px] text-slate-400 uppercase tracking-wide">CFD Telemetry</div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Lift Coeff (CL):</span>
            <span className="font-bold text-cyan-400">{cl.toFixed(3)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Drag Coeff (CD):</span>
            <span className="font-bold text-amber-400">{cd.toFixed(4)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">L/D Ratio:</span>
            <span className="font-bold text-emerald-400">{ldRatio.toFixed(1)}</span>
          </div>
          <div className="flex justify-between gap-4 pt-1 border-t border-slate-800 text-[10px]">
            <span className="text-slate-500">Stall Boundary:</span>
            <span className="text-rose-400">alpha = 15.5°</span>
          </div>
        </div>
      </div>

      {/* Interactive Angle of Attack Slider */}
      <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="aoa-slider" className="text-xs font-mono font-bold text-white flex items-center gap-2">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span>Angle of Attack (&alpha;): <span className="text-cyan-400 text-base">{aoa}°</span></span>
          </label>
          <span className="text-[11px] font-mono text-slate-400">Linear regime: 0° - 12° | Stall: 15.5°</span>
        </div>

        <input
          id="aoa-slider"
          type="range"
          min="-2"
          max="20"
          step="0.5"
          value={aoa}
          onChange={(e) => setAoa(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>-2° (Negative Lift)</span>
          <span>4° (Cruise Optimum)</span>
          <span>12° (Separation Warning)</span>
          <span>15.5° (Stall Peak)</span>
          <span>20° (Deep Post-Stall)</span>
        </div>
      </div>
    </div>
  );
}
