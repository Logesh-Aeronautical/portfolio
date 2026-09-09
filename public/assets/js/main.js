// Main JavaScript for Logesh's Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initMobileMenu();
  renderAircraftSpecs();
  renderMissionNodes();
  renderComparativeGraphs('all');
  renderIotProjects('all');
  initModals();
  initEmailCopy();
  initContactForm();
  initScrollSpy();
});

/* ----------------------------------------------------
 * 1. Animated Typing Effect
 * ---------------------------------------------------- */
function initTypingEffect() {
  const words = [
    "Aeronautical Engineer",
    "Embedded Systems Developer",
    "Supersonic Aircraft Designer",
    "IoT & Avionics Firmware Specialist"
  ];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const target = document.getElementById('typing-text');
  if (!target) return;

  function type() {
    const currentWord = words[wordIdx];
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentWord.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      typeSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ----------------------------------------------------
 * 2. Mobile Menu Toggle
 * ---------------------------------------------------- */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Close when clicking nav links
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* ----------------------------------------------------
 * 3. Render Aircraft Specs
 * ---------------------------------------------------- */
function renderAircraftSpecs() {
  const container = document.getElementById('specs-container');
  if (!container) return;

  const specList = [
    { label: "Max Take-Off Weight (MTOW)", value: AIRCRAFT_SPECS.mtow, note: "Gross combat weight" },
    { label: "Empty Weight (We)", value: AIRCRAFT_SPECS.emptyWeight, note: "Fraction We/W0 = 0.541" },
    { label: "Max Dash Speed", value: AIRCRAFT_SPECS.maxSpeed, note: "Mach 2.1+ Supercruise" },
    { label: "Cruise Speed", value: AIRCRAFT_SPECS.cruiseSpeed, note: "High-altitude economy" },
    { label: "Installed Engine Thrust", value: AIRCRAFT_SPECS.thrust, note: "Turbofan reheat afterburner" },
    { label: "Thrust-to-Weight Ratio", value: AIRCRAFT_SPECS.twRatio, note: "Combat excess thrust > 1.5" },
    { label: "Wing Loading", value: AIRCRAFT_SPECS.wingLoading, note: "High-G sustained turns" },
    { label: "Gross Wing Area", value: AIRCRAFT_SPECS.wingArea, note: "Span: 14.0m, Length: 19.5m" },
    { label: "Wing Sweep Angle", value: AIRCRAFT_SPECS.wingSweep, note: "Supersonic wave drag delay" },
    { label: "Aspect Ratio", value: AIRCRAFT_SPECS.aspectRatio, note: "Optimized transonic planform" },
    { label: "Service Ceiling", value: AIRCRAFT_SPECS.serviceCeiling, note: "Stratospheric envelope" },
    { label: "Combat Radius / Range", value: AIRCRAFT_SPECS.range, note: "Internal fuel profile" }
  ];

  container.innerHTML = specList.map(s => `
    <div class="spec-box p-4 rounded-lg bg-slate-800/40 border border-slate-700/40">
      <div class="text-xs text-sky-400 font-mono tracking-wide uppercase">${s.label}</div>
      <div class="text-xl font-bold text-white mt-1">${s.value}</div>
      <div class="text-xs text-slate-400 mt-0.5">${s.note}</div>
    </div>
  `).join('');
}

/* ----------------------------------------------------
 * 4. Mission Profile Interactive Nodes
 * ---------------------------------------------------- */
function renderMissionNodes() {
  const btnContainer = document.getElementById('mission-nodes-nav');
  const detailsBox = document.getElementById('mission-node-details');
  if (!btnContainer || !detailsBox) return;

  btnContainer.innerHTML = MISSION_NODES.map((node, index) => `
    <button class="node-btn px-3 py-2 rounded-lg text-xs font-mono font-medium border border-slate-700 bg-slate-800/60 text-slate-300 hover:border-sky-400 hover:text-white ${index === 3 ? 'active' : ''}" data-index="${index}">
      Phase ${node.node}
    </button>
  `).join('');

  function showNode(idx) {
    const item = MISSION_NODES[idx];
    detailsBox.innerHTML = `
      <div class="flex items-center gap-3 mb-2">
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 font-mono font-bold text-sm border border-sky-500/40">
          ${item.node}
        </span>
        <div>
          <h4 class="text-lg font-bold text-white">${item.name}</h4>
          <span class="text-xs font-mono text-cyan-400">Altitude Envelope: ${item.altitude}</span>
        </div>
      </div>
      <p class="text-slate-300 text-sm leading-relaxed mt-2">${item.description}</p>
    `;

    // update active button state
    btnContainer.querySelectorAll('.node-btn').forEach((b, i) => {
      if (i === idx) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }

  // default to Node 3-4 (Combat Interception Loop)
  showNode(3);

  btnContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.node-btn');
    if (!btn) return;
    const idx = parseInt(btn.getAttribute('data-index'), 10);
    showNode(idx);
  });
}

/* ----------------------------------------------------
 * 5. Comparative Graphs Gallery (18 Charts)
 * ---------------------------------------------------- */
let currentGraphFilter = 'all';

function renderComparativeGraphs(category) {
  currentGraphFilter = category;
  const container = document.getElementById('graphs-gallery');
  if (!container) return;

  const filtered = category === 'all' 
    ? COMPARATIVE_GRAPHS 
    : COMPARATIVE_GRAPHS.filter(g => g.category === category);

  container.innerHTML = filtered.map(graph => `
    <div class="glass-card rounded-xl overflow-hidden group cursor-pointer flex flex-col" onclick="openGraphModal(${graph.id})">
      <div class="relative bg-slate-900 aspect-video overflow-hidden border-b border-slate-800">
        <img 
          src="assets/images/graphs/${graph.file}" 
          alt="${graph.title}" 
          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
          <span class="text-xs font-mono text-cyan-300 bg-slate-900/90 px-2 py-1 rounded border border-cyan-500/30">
            Click to Inspect Analysis 🔍
          </span>
        </div>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-950/70 text-sky-400 border border-sky-800/40">
              ${graph.category}
            </span>
            <span class="text-[11px] font-mono text-slate-400">Fig. ${graph.id} / 18</span>
          </div>
          <h4 class="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors line-clamp-2">
            ${graph.title}
          </h4>
          <p class="text-xs text-slate-400 mt-1 line-clamp-2">
            ${graph.description}
          </p>
        </div>
        <button class="mt-3 text-xs font-mono text-sky-400 flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
          <span>View Detailed Plot</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
      </div>
    </div>
  `).join('');

  // Update filter buttons
  document.querySelectorAll('.graph-filter-btn').forEach(btn => {
    const filter = btn.getAttribute('data-filter');
    if (filter === category) {
      btn.classList.add('bg-sky-600', 'text-white');
      btn.classList.remove('bg-slate-800', 'text-slate-400');
    } else {
      btn.classList.remove('bg-sky-600', 'text-white');
      btn.classList.add('bg-slate-800', 'text-slate-400');
    }
  });
}

// Global filter handler for graphs
window.filterGraphs = function(cat) {
  renderComparativeGraphs(cat);
};

/* ----------------------------------------------------
 * 6. IoT & Embedded Systems Projects (8 Projects)
 * ---------------------------------------------------- */
function renderIotProjects(category) {
  const container = document.getElementById('iot-gallery');
  if (!container) return;

  const filtered = category === 'all'
    ? IOT_PROJECTS
    : IOT_PROJECTS.filter(p => p.category === category);

  container.innerHTML = filtered.map(proj => `
    <div class="glass-card rounded-xl overflow-hidden flex flex-col justify-between group">
      <div>
        ${proj.image ? `
          <div class="relative bg-slate-950 aspect-video overflow-hidden border-b border-slate-800 cursor-pointer" onclick="openIotModal(${proj.id})">
            <img 
              src="${proj.image}" 
              alt="${proj.title}" 
              class="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div class="absolute top-2 right-2 bg-slate-900/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
              Wokwi Simulation
            </div>
          </div>
        ` : `
          <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 aspect-video flex flex-col items-center justify-center p-4 border-b border-slate-800">
            <svg class="w-12 h-12 text-cyan-400/80 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <span class="text-xs font-mono text-cyan-300 font-semibold">Computer Vision Pipeline</span>
            <span class="text-[11px] text-slate-400">OpenCV & MediaPipe Landmark Detection</span>
          </div>
        `}
        <div class="p-5">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              ${proj.mcu}
            </span>
            <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40">
              ${proj.category}
            </span>
          </div>
          <h4 class="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
            ${proj.title}
          </h4>
          <p class="text-xs text-slate-300 mt-2 leading-relaxed">
            ${proj.description}
          </p>

          <div class="mt-4">
            <div class="text-[11px] font-mono uppercase text-slate-400 font-semibold mb-1">Key Sensors & Modules:</div>
            <div class="flex flex-wrap gap-1.5">
              ${proj.sensors.map(s => `
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  ${s}
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="p-5 pt-0 flex items-center justify-between gap-3 border-t border-slate-800/60 mt-3 pt-3">
        ${proj.image ? `
          <button onclick="openIotModal(${proj.id})" class="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            <span>View Circuit</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>
        ` : `<span class="text-xs font-mono text-slate-500">Python Simulation</span>`}

        <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-sky-600 hover:text-white border border-slate-700 hover:border-sky-500 transition-all flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          <span>Source Code</span>
        </a>
      </div>
    </div>
  `).join('');

  // Update filter buttons
  document.querySelectorAll('.iot-filter-btn').forEach(btn => {
    const filter = btn.getAttribute('data-filter');
    if (filter === category) {
      btn.classList.add('bg-cyan-600', 'text-white');
      btn.classList.remove('bg-slate-800', 'text-slate-400');
    } else {
      btn.classList.remove('bg-cyan-600', 'text-white');
      btn.classList.add('bg-slate-800', 'text-slate-400');
    }
  });
}

// Global filter handler for IoT
window.filterIot = function(cat) {
  renderIotProjects(cat);
};

/* ----------------------------------------------------
 * 7. Modals System
 * ---------------------------------------------------- */
function initModals() {
  const modal = document.getElementById('details-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  if (!modal || !closeBtn) return;

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

window.openGraphModal = function(id) {
  const graph = COMPARATIVE_GRAPHS.find(g => g.id === id);
  if (!graph) return;

  const modal = document.getElementById('details-modal');
  const modalBody = document.getElementById('modal-body');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b border-slate-700/80 pb-3">
        <div>
          <span class="text-xs font-mono uppercase text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/40">
            Aeronautical Study Graph ${graph.id} / 18
          </span>
          <h3 class="text-xl font-bold text-white mt-1">${graph.title}</h3>
        </div>
      </div>

      <div class="bg-slate-950 rounded-xl p-2 border border-slate-800 flex justify-center max-h-[60vh] overflow-hidden">
        <img 
          src="assets/images/graphs/${graph.file}" 
          alt="${graph.title}" 
          class="max-h-[56vh] object-contain rounded-lg"
        />
      </div>

      <div class="bg-slate-800/40 p-4 rounded-lg border border-slate-700/60">
        <h4 class="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold mb-1">Engineering Analysis & Insight:</h4>
        <p class="text-sm text-slate-300 leading-relaxed">${graph.description}</p>
        <div class="mt-3 flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-700/40">
          <span>Project Interceptor Design Validation</span>
          <a href="assets/images/graphs/${graph.file}" download="${graph.file}" class="text-sky-400 hover:text-cyan-300 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            <span>Download Plot (300 DPI)</span>
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.openIotModal = function(id) {
  const proj = IOT_PROJECTS.find(p => p.id === id);
  if (!proj) return;

  const modal = document.getElementById('details-modal');
  const modalBody = document.getElementById('modal-body');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b border-slate-700/80 pb-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono uppercase text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
              ${proj.mcu}
            </span>
            <span class="text-xs font-mono text-slate-400">Internship Project ${proj.id}</span>
          </div>
          <h3 class="text-xl font-bold text-white mt-1">${proj.title}</h3>
        </div>
      </div>

      ${proj.image ? `
        <div class="bg-slate-950 rounded-xl p-2 border border-slate-800 flex justify-center max-h-[55vh] overflow-hidden">
          <img 
            src="${proj.image}" 
            alt="${proj.title}" 
            class="max-h-[50vh] object-contain rounded-lg"
          />
        </div>
      ` : ''}

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-slate-800/40 p-4 rounded-lg border border-slate-700/60">
          <h4 class="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold mb-1">Architecture & Description:</h4>
          <p class="text-xs text-slate-300 leading-relaxed">${proj.description}</p>
        </div>

        <div class="bg-slate-800/40 p-4 rounded-lg border border-slate-700/60">
          <h4 class="text-xs font-mono text-sky-400 uppercase tracking-wider font-bold mb-1">Technical Implementation:</h4>
          <ul class="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
            ${proj.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-slate-700/40">
        <span class="text-xs font-mono text-slate-400">Platform: ${proj.platform}</span>
        <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono flex items-center gap-1.5 transition-colors">
          <span>Explore Source Code on GitHub</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

/* ----------------------------------------------------
 * 8. Copy Email to Clipboard
 * ---------------------------------------------------- */
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const email = "logeshaero1566@gmail.com";

  if (!copyBtn || !toast) return;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(email).then(() => {
      toast.textContent = "Copied " + email + " to clipboard!";
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }).catch(() => {
      toast.textContent = email;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    });
  });
}

/* ----------------------------------------------------
 * 9. Contact Form Simulation
 * ---------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const subject = document.getElementById('contact-subject').value || "Portfolio Inquiry";
    const message = document.getElementById('contact-message').value;

    const mailtoUrl = `mailto:logeshaero1566@gmail.com?subject=${encodeURIComponent(subject + " - from " + name)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;

    if (toast) {
      toast.textContent = "Opening your email client to send message to Logesh...";
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }
  });
}

/* ----------------------------------------------------
 * 10. ScrollSpy for Active Navigation Link
 * ---------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-cyan-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-cyan-400');
      }
    });
  });
}
