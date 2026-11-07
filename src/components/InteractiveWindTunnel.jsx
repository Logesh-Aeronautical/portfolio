import React, { useState, useEffect, useRef } from 'react';
import { Wind, Gauge, AlertTriangle, CheckCircle2, Flame } from 'lucide-react';

export default function InteractiveWindTunnel() {
  const [aoa, setAoa] = useState(4); // Angle of Attack in degrees
  const canvasRef = useRef(null);

  // Aerodynamic Calculations based on Thin Airfoil Theory & Stall Transition
  const aoaRad = (aoa * Math.PI) / 180;
  
  let cl = 0;
  let cd = 0;
  let flowState = "Attached Laminar Boundary Layer";
  let stateColor = "text-green-400 border-green-500/30 bg-green-950/40";

  if (aoa <= 12) {
    cl = 0.1 + (2 * Math.PI * 0.95 * aoaRad);
    cd = 0.008 + 0.045 * Math.pow(cl, 2);
    flowState = "Attached Laminar Boundary Layer";
    stateColor = "text-green-400 border-green-500/30 bg-green-950/40";
  } else if (aoa <= 15.5) {
    cl = 0.1 + (2 * Math.PI * 0.95 * aoaRad) * (1 - (aoa - 12) * 0.05);
    cd = 0.008 + 0.08 * Math.pow(cl, 2);
    flowState = "Adverse Pressure Gradient / Separation Onset";
    stateColor = "text-yellow-400 border-yellow-500/30 bg-yellow-950/40";
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

    const foilX = width * 0.45;
    const foilY = height * 0.52;
    const chord = 180;

    const render = () => {
      ctx.fillStyle = 'rgba(6, 10, 7, 0.28)';
      ctx.fillRect(0, 0, width, height);

      // Draw Grid Lines (HUD Yellow/Green)
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Airfoil
      ctx.save();
      ctx.translate(foilX, foilY);
      ctx.rotate(-aoaRad);

      ctx.beginPath();
      ctx.moveTo(-chord / 2, 0);
      ctx.bezierCurveTo(-chord / 4, -chord * 0.18, chord / 4, -chord * 0.14, chord / 2, 0);
      ctx.bezierCurveTo(chord / 4, chord * 0.08, -chord / 4, chord * 0.06, -chord / 2, 0);
      ctx.closePath();

      ctx.fillStyle = '#0f1f13';
      ctx.fill();
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

      // Update & Draw Particles (Yellow & Green HUD particles)
      particles.forEach((p, idx) => {
        p.x += p.speed;

        const dx = p.x - foilX;
        const dy = p.y - foilY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          const influence = (1 - dist / 140);
          if (dy < 0) {
            p.y -= 1.8 * influence * (1 + aoa * 0.08);
          } else {
            p.y += 1.2 * influence;
          }

          if (aoa > 14 && dx > 0) {
            p.y += (Math.random() - 0.5) * 5 * (aoa - 12) * 0.3;
          }
        }

        if (p.x > width) {
          p.x = 0;
          p.y = p.baseY;
        }

        // Particle Glow
        const isGreen = idx % 2 === 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = isGreen ? 'rgba(34, 197, 94, 0.85)' : 'rgba(250, 204, 21, 0.85)';
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [aoa]);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase text-green-400 tracking-widest px-3 py-1 rounded-full bg-green-950/70 border border-green-800/40">
            Interactive Aerodynamic Tunnel
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 flex items-center gap-2">
            <Wind className="w-5 h-5 text-yellow-400" />
            <span>Boundary Layer & Airflow Separation Simulation</span>
          </h3>
        </div>

        <div className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 ${stateColor}`}>
          <Gauge className="w-4 h-4" />
          <span>{flowState}</span>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="w-full h-[360px] bg-[#060a07] rounded-2xl overflow-hidden border border-yellow-500/20 relative">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
          Streamline Velocity Vectors // Yellow & Green Particle Tracer
        </div>
      </div>

      {/* Control Slider & Live Readouts */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Angle of Attack (&alpha;)</span>
            <span className="text-yellow-400 font-bold">{aoa}&deg;</span>
          </div>
          <input
            type="range"
            min="-4"
            max="22"
            step="1"
            value={aoa}
            onChange={(e) => setAoa(Number(e.target.value))}
            className="w-full accent-yellow-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>-4&deg; (Negative)</span>
            <span>0&deg;</span>
            <span>15.5&deg; (Stall Limit)</span>
            <span>22&deg; (Separated)</span>
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Lift Coeff (CL)</div>
            <div className="text-lg font-bold text-yellow-400 font-mono mt-0.5">{cl.toFixed(3)}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Drag Coeff (CD)</div>
            <div className="text-lg font-bold text-green-400 font-mono mt-0.5">{cd.toFixed(4)}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase">L/D Efficiency</div>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{ldRatio.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
