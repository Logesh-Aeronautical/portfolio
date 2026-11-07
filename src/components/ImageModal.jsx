import React, { useEffect } from 'react';
import { X, Download, ZoomIn } from 'lucide-react';

export default function ImageModal({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!item) return null;

  const imgSrc = item.url || (item.file ? `./assets/images/graphs/${item.file}` : null);
  const title = item.title;
  const desc = item.caption || item.desc;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#060a07]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full bg-slate-950 border border-yellow-500/30 rounded-3xl overflow-hidden shadow-2xl p-6 flex flex-col space-y-4 max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-yellow-400 tracking-wider">
              Engineering CAD & Simulation Inspection
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              {title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-yellow-400 border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Frame */}
        <div className="flex-1 bg-black/60 rounded-2xl p-2 border border-slate-800 flex items-center justify-center overflow-hidden min-h-[300px]">
          {imgSrc && (
            <img
              src={imgSrc}
              alt={title}
              className="max-h-[62vh] max-w-full object-contain rounded-xl"
            />
          )}
        </div>

        {/* Footer & Takeaway */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs font-mono">
          <p className="text-slate-300 max-w-2xl font-light">
            {desc}
          </p>
          {imgSrc && (
            <a
              href={imgSrc}
              download={title || 'cad_render'}
              className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold flex items-center gap-2 self-start sm:self-auto shrink-0 transition-colors shadow-md shadow-yellow-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Save Full Resolution</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
