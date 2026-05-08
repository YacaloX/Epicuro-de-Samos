/* ========== RESET Y VARIABLES ========== */
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
    --fondo: #FDFBF7; --texto: #2E2E2E; --texto-secundario: #4a4a4a;
    --verde-oliva: #6B7B3A; --terracota: #C26A4A; --dorado-viejo: #B89B72;
    --beige-claro: #F5F0E8; --sombra-suave: 0 8px 20px rgba(0,0,0,0.05);
    --sombra-media: 0 15px 30px rgba(0,0,0,0.08); --sombra-ligera: 0 2px 8px rgba(0,0,0,0.05);
    --sombra-imagen: 0 4px 12px rgba(0,0,0,0.08); --borde-redondo: 16px;
    --fuente-titulos: 'Lora', 'Merriweather', Georgia, serif;
    --fuente-texto: 'Open Sans', 'Lato', system-ui, sans-serif;
    --transicion: all 0.25s ease; --color-card-bg: #ffffff;
    --color-card-border: rgba(184,155,114,0.12); --color-nav-bg: rgba(253,251,247,0.92);
    --color-nav-border: rgba(184,155,114,0.25); --color-footer-texto: #7f7f7f;
    --color-footer-borde: rgba(184,155,114,0.2); --color-faq-bg: #ffffff;
    --color-dropzone-bg: rgba(245,240,232,0.7); --color-dropzone-dragover: rgba(107,123,58,0.1);
    --color-timeline-bg: #ffffff; --color-img-bg: #e9e4db;
    --color-img-border: rgba(184,155,114,0.25); --color-hero-gradient: linear-gradient(180deg, rgba(107,123,58,0.06) 0%, transparent 70%);
    --color-contexto-bg: rgba(245,240,232,0.4); --color-curiosidades-bg: rgba(184,155,114,0.06);
    --color-test-bg: linear-gradient(0deg, rgba(107,123,58,0.05) 0%, transparent 70%);
    --color-scrollbar-track: #f0ece4; --color-scrollbar-thumb: #c4b99a;
    --color-flip-back-texto: #3d3d3d; --color-input-bg: #ffffff; --color-input-texto: #2E2E2E;
}

[data-theme="dark"] {
    --fondo: #1a1a1a; --texto: #e4e4e4; --texto-secundario: #c5c5c5;
    --verde-oliva: #8fa84a; --terracota: #d4856a; --dorado-viejo: #c9a87c;
    --beige-claro: #2a2722; --sombra-suave: 0 8px 20px rgba(0,0,0,0.25);
    --sombra-media: 0 15px 30px rgba(0,0,0,0.3); --sombra-ligera: 0 2px 8px rgba(0,0,0,0.2);
    --sombra-imagen: 0 4px 12px rgba(0,0,0,0.3); --color-card-bg: #252525;
    --color-card-border: rgba(184,155,114,0.18); --color-nav-bg: rgba(26,26,26,0.94);
    --color-nav-border: rgba(184,155,114,0.3); --color-footer-texto: #a0a0a0;
    --color-footer-borde: rgba(184,155,114,0.25); --color-faq-bg: #252525;
    --color-dropzone-bg: rgba(42,39,34,0.7); --color-dropzone-dragover: rgba(143,168,74,0.15);
    --color-timeline-bg: #252525; --color-img-bg: #2e2b26;
    --color-img-border: rgba(184,155,114,0.3); --color-hero-gradient: linear-gradient(180deg, rgba(143,168,74,0.08) 0%, transparent 70%);
    --color-contexto-bg: rgba(42,39,34,0.5); --color-curiosidades-bg: rgba(184,155,114,0.08);
    --color-test-bg: linear-gradient(0deg, rgba(143,168,74,0.07) 0%, transparent 70%);
    --color-scrollbar-track: #2a2a2a; --color-scrollbar-thumb: #5a5040;
    --color-flip-back-texto: #d0d0d0; --color-input-bg: #2a2a2a; --color-input-texto: #e4e4e4;
}

html { font-size: 16px; scroll-behavior: smooth; }

body {
    background-color: var(--fondo); color: var(--texto);
    font-family: var(--fuente-texto); line-height: 1.6; font-weight: 400;
    background-image: radial-gradient(circle at 20% 30%, rgba(184,155,114,0.08) 0%, transparent 35%);
    background-attachment: fixed; transition: background-color 0.4s ease, color 0.4s ease;
    -webkit-tap-highlight-color: transparent; -webkit-font-smoothing: antialiased;
}

body::before {
    content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="1" stitchTiles="stitch"/></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.03"/></svg>');
    pointer-events: none; z-index: -1;
}

h1, h2, h3 { font-family: var(--fuente-titulos); font-weight: 600; letter-spacing: -0.3px; color: var(--texto); transition: color 0.4s ease; }
h2 { font-size: 2.1rem; margin-bottom: 1.2rem; display: flex; align-items: center; gap: 0.6rem; border-bottom: 2px solid var(--dorado-viejo); padding-bottom: 0.5rem; transition: border-color 0.4s ease; }
h2 i { color: var(--terracota); font-size: 1.8rem; transition: color 0.4s ease; flex-shrink: 0; }

.container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

.navbar { background-color: var(--color-nav-bg); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 2px 15px rgba(0,0,0,0.04); position: sticky; top: 0; z-index: 100; border-bottom: 1px solid var(--color-nav-border); transition: background-color 0.4s ease, border-color 0.4s ease; }
.nav-container { display: flex; justify-content: space-between; align-items: center; max-width: 1100px; margin: 0 auto; padding: 0.8rem 2rem; flex-wrap: nowrap; position: relative; }
.logo { font-family: var(--fuente-titulos); font-size: 1.8rem; font-weight: 600; color: var(--verde-oliva); letter-spacing: -0.5px; transition: color 0.4s ease; flex-shrink: 0; z-index: 101; }
.nav-right-group { display: flex; align-items: center; gap: 1rem; z-index: 101; }
.menu-toggle { display: none; background: none; border: none; font-size: 1.6rem; cursor: pointer; color: var(--texto); padding: 0.3rem 0.5rem; border-radius: 8px; transition: var(--transicion), color 0.4s ease; line-height: 1; z-index: 101; }
.menu-toggle:hover { color: var(--terracota); }
.nav-links { display: flex; gap: 1.5rem; list-style: none; flex-wrap: nowrap; align-items: center; margin: 0; padding: 0; }
.nav-links a { text-decoration: none; color: var(--texto); font-weight: 500; font-size: 0.95rem; transition: var(--transicion), color 0.4s ease; border-bottom: 2px solid transparent; padding-bottom: 3px; white-space: nowrap; }
.nav-links a:hover { color: var(--terracota); border-bottom-color: var(--terracota); }
.theme-toggle { background: none; border: 2px solid var(--dorado-viejo); border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; transition: var(--transicion), border-color 0.4s ease, background-color 0.4s ease, color 0.4s ease; color: var(--texto); background-color: var(--color-card-bg); flex-shrink: 0; box-shadow: var(--sombra-ligera); z-index: 101; }
.theme-toggle:hover { border-color: var(--terracota); color: var(--terracota); transform: rotate(20deg); }
.theme-toggle:active { transform: rotate(40deg) scale(0.9); }

section { padding: 3rem 0; scroll-margin-top: 5rem; transition: background 0.4s ease; }
.hero { text-align: center; padding: 3rem 1rem 2rem; background: var(--color-hero-gradient); border-radius: 0 0 60px 60px; margin-bottom: 1rem; transition: background 0.4s ease; }
.hero blockquote { font-family: var(--fuente-titulos); font-size: 2.5rem; font-style: italic; color: var(--terracota); margin: 0.5rem 0 1rem; opacity: 0; transform: translateY(20px); animation: fadeInUp 0.8s ease forwards; transition: color 0.4s ease; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
.hero p { font-size: 1.2rem; max-width: 700px; margin: 0 auto 1.5rem; color: var(--texto-secundario); transition: color 0.4s ease; padding: 0 0.5rem; }
.hero-buttons { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; align-items: center; }
.btn { background: var(--verde-oliva); color: white; border: none; padding: 0.75rem 1.8rem; border-radius: 30px; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: 0.2s, background-color 0.4s ease; display: inline-flex; align-items: center; gap: 0.4rem; text-decoration: none; white-space: nowrap; -webkit-tap-highlight-color: transparent; user-select: none; }
.btn-outline { background: transparent; border: 2px solid var(--terracota); color: var(--terracota); transition: 0.2s, border-color 0.4s ease, color 0.4s ease; }
.btn:hover { background: var(--terracota); }
.btn-outline:hover { background: var(--terracota); color: white; border-color: var(--terracota); }
.btn:active { transform: scale(0.96); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }

.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
.card { background: var(--color-card-bg); border-radius: var(--borde-redondo); padding: 1.8rem 1.5rem; box-shadow: var(--sombra-suave); transition: transform 0.3s, box-shadow 0.3s, background-color 0.4s ease; border: 1px solid var(--color-card-border); word-break: break-word; }
.card:hover { transform: translateY(-5px); box-shadow: var(--sombra-media); }
.card i { font-size: 2.2rem; color: var(--verde-oliva); margin-bottom: 1rem; transition: color 0.4s ease; }
.card h3 { transition: color 0.4s ease; font-size: 1.2rem; }
.card p { color: var(--texto-secundario); transition: color 0.4s ease; font-size: 0.95rem; }

.img-placeholder { width: 100%; border-radius: 12px; margin: 1rem 0; box-shadow: var(--sombra-imagen); object-fit: cover; background-color: var(--color-img-bg); border: 1px solid var(--color-img-border); transition: background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease; height: auto; }
.img-placeholder-sm { max-width: 200px; height: auto; }
.img-placeholder-md { max-width: 400px; height: auto; }
.img-hero { max-width: 160px; margin: 0 auto 1.5rem; display: block; height: auto; }

.flip-card { background: transparent; height: 220px; perspective: 1000px; cursor: pointer; }
.flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; }
.flip-card.flipped .flip-card-inner { transform: rotateY(180deg); }
.flip-card-front, .flip-card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: var(--borde-redondo); box-shadow: var(--sombra-suave); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.2rem; text-align: center; background: var(--color-card-bg); border: 1px solid var(--color-card-border); transition: background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease; overflow-y: auto; }
.flip-card-back { background: var(--beige-claro); transform: rotateY(180deg); justify-content: flex-start; color: var(--color-flip-back-texto); transition: background-color 0.4s ease, color 0.4s ease; font-size: 0.9rem; }

.timeline { display: flex; overflow-x: auto; gap: 1.5rem; padding: 1.5rem 0.5rem; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scroll-behavior: smooth; }
.timeline::-webkit-scrollbar { height: 5px; }
.timeline::-webkit-scrollbar-track { background: var(--color-scrollbar-track); border-radius: 3px; }
.timeline::-webkit-scrollbar-thumb { background: var(--color-scrollbar-thumb); border-radius: 3px; }
.timeline-item { min-width: 140px; text-align: center; scroll-snap-align: center; background: var(--color-timeline-bg); padding: 1rem 0.8rem; border-radius: 20px; box-shadow: var(--sombra-suave); position: relative; transition: background-color 0.4s ease, box-shadow 0.4s ease; font-size: 0.9rem; flex-shrink: 0; }
.timeline-item::after { content: ""; position: absolute; width: 10px; height: 10px; background: var(--terracota); border-radius: 50%; top: -16px; left: 50%; transform: translateX(-50%); transition: background-color 0.4s ease; }

.drag-container { display: flex; gap: 1rem; flex-wrap: wrap; margin: 2rem 0; }
.drop-zone { flex: 1; min-width: 160px; background: var(--color-dropzone-bg); border: 2px dashed var(--dorado-viejo); border-radius: 20px; padding: 0.8rem; text-align: center; transition: 0.2s, background-color 0.4s ease, border-color 0.4s ease; min-height: 80px; display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }
.drop-zone.drag-over { background: var(--color-dropzone-dragover); border-color: var(--verde-oliva); border-style: solid; }
.draggable { background: var(--color-card-bg); padding: 0.6rem 0.9rem; margin: 0.3rem; border-radius: 30px; box-shadow: var(--sombra-ligera); cursor: grab; display: inline-block; user-select: none; font-size: 0.85rem; border: 1px solid var(--dorado-viejo); color: var(--texto); transition: background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease, opacity 0.2s; touch-action: none; -webkit-user-select: none; max-width: 100%; word-break: break-word; }
.draggable:active { cursor: grabbing; }
.draggable.dragging-touch { opacity: 0.5; transform: scale(0.95); box-shadow: var(--sombra-media); z-index: 200; }
#items-container { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0; min-height: 50px; padding: 0.5rem; border-radius: 12px; background: rgba(184,155,114,0.04); }

.quiz-box { background: var(--color-card-bg); border-radius: 24px; padding: 2rem; box-shadow: var(--sombra-suave); transition: background-color 0.4s ease, box-shadow 0.4s ease; }
.quiz-question { font-weight: 600; margin: 1.2rem 0 0.6rem; color: var(--texto); transition: color 0.4s ease; font-size: 1rem; }
.quiz-option { display: flex; align-items: flex-start; gap: 0.5rem; margin: 0.6rem 0; cursor: pointer; color: var(--texto-secundario); transition: color 0.4s ease; padding: 0.4rem 0; font-size: 0.95rem; -webkit-tap-highlight-color: transparent; }
.quiz-option input[type="radio"] { accent-color: var(--terracota); margin-top: 0.2rem; flex-shrink: 0; width: 1.1rem; height: 1.1rem; }
.resultado { font-size: 1.1rem; background: var(--beige-claro); padding: 1rem; border-radius: 12px; margin-top: 1.5rem; transition: background-color 0.4s ease; }

.faq details { background: var(--color-faq-bg); margin: 0.8rem 0; padding: 1rem 1.5rem; border-radius: 12px; box-shadow: var(--sombra-suave); transition: background-color 0.4s ease, box-shadow 0.4s ease; }
.faq summary { font-weight: 600; cursor: pointer; color: var(--texto); transition: color 0.4s ease; padding: 0.3rem 0; font-size: 1rem; -webkit-tap-highlight-color: transparent; }
.faq details p { color: var(--texto-secundario); transition: color 0.4s ease; padding-top: 0.5rem; font-size: 0.95rem; }

footer { text-align: center; padding: 2rem; color: var(--color-footer-texto); border-top: 1px solid var(--color-footer-borde); margin-top: 2rem; transition: color 0.4s ease, border-color 0.4s ease; font-size: 0.9rem; }

p { color: var(--texto-secundario); transition: color 0.4s ease; }
strong { color: var(--texto); transition: color 0.4s ease; }
.drop-zone h4 { color: var(--texto); transition: color 0.4s ease; font-size: 0.9rem; }
#feedback-deseos { transition: color 0.4s ease; font-size: 0.95rem; }

a:not(.btn):not(.btn-outline):link { color: var(--verde-oliva); text-decoration: none; transition: color 0.2s ease; }
a:not(.btn):not(.btn-outline):visited { color: var(--terracota); }
a:not(.btn):not(.btn-outline):hover, a:not(.btn):not(.btn-outline):focus { color: var(--terracota); text-decoration: underline; }

.bio-flex { display: flex; gap: 2rem; align-items: center; flex-wrap: wrap; }
.bio-flex>div { flex: 1; min-width: 250px; }

.overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.35); z-index: 99; transition: opacity 0.3s ease; }
.overlay.active { display: block; }

.theme-toggle:focus-visible, .menu-toggle:focus-visible { outline: 3px solid var(--terracota); outline-offset: 3px; border-radius: 8px; }
.theme-toggle:focus-visible { border-radius: 50%; }

@media (max-width: 900px) {
    .menu-toggle { display: block; }
    .nav-links { position: fixed; top: 0; right: -100%; width: 75%; max-width: 320px; height: 100vh; flex-direction: column; background: var(--color-nav-bg); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); padding: 5rem 2rem 2rem; gap: 1.2rem; box-shadow: -5px 0 25px rgba(0,0,0,0.12); transition: right 0.35s ease, background-color 0.4s ease; z-index: 100; border-left: 1px solid var(--color-nav-border); }
    .nav-links.active { right: 0; }
    .nav-links a { font-size: 1.05rem; padding: 0.5rem 0; display: block; width: 100%; }
    .nav-links .theme-toggle-li { margin-top: 0.5rem; }
    .nav-right-group { gap: 0.5rem; }
    .nav-container { padding: 0.7rem 1.2rem; }
}

@media (max-width: 768px) {
    html { font-size: 15px; }
    .container { padding: 0 1.2rem; }
    h2 { font-size: 1.7rem; gap: 0.4rem; }
    h2 i { font-size: 1.5rem; }
    section { padding: 2.2rem 0; scroll-margin-top: 4rem; }
    .hero { padding: 2rem 0.8rem 1.5rem; border-radius: 0 0 40px 40px; }
    .hero blockquote { font-size: 2rem; }
    .hero p { font-size: 1rem; }
    .hero-buttons { flex-direction: column; gap: 0.7rem; }
    .hero-buttons .btn { width: 100%; justify-content: center; padding: 0.7rem 1.5rem; font-size: 0.9rem; }
    .hero-buttons .btn-outline { margin-left: 0; }
    .card-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
    .card { padding: 1.3rem 1.2rem; }
    .card i { font-size: 1.8rem; }
    .card h3 { font-size: 1.1rem; }
    .card p { font-size: 0.9rem; }
    .img-hero { max-width: 130px; }
    .img-placeholder-sm { max-width: 150px; }
    .bio-flex { gap: 1.2rem; }
    .bio-flex>div { min-width: 200px; }
    .flip-card { height: 180px; }
    .flip-card-front, .flip-card-back { padding: 1rem; font-size: 0.85rem; }
    .drag-container { flex-direction: column; gap: 0.8rem; }
    .drop-zone { min-width: auto; min-height: 60px; flex-direction: row; flex-wrap: wrap; justify-content: center; padding: 0.6rem; gap: 0.3rem; }
    .draggable { font-size: 0.8rem; padding: 0.5rem 0.7rem; margin: 0.2rem; }
    #items-container { gap: 0.4rem; padding: 0.4rem; }
    .quiz-box { padding: 1.3rem; }
    .quiz-question { font-size: 0.95rem; }
    .quiz-option { font-size: 0.9rem; padding: 0.5rem 0; }
    .faq details { padding: 0.8rem 1rem; }
    .faq summary { font-size: 0.95rem; }
    .timeline-item { min-width: 120px; font-size: 0.8rem; padding: 0.8rem 0.6rem; }
    footer { padding: 1.5rem 1rem; font-size: 0.85rem; }
}

@media (max-width: 480px) {
    html { font-size: 14px; }
    .container { padding: 0 0.9rem; }
    h2 { font-size: 1.45rem; }
    h2 i { font-size: 1.3rem; }
    .hero blockquote { font-size: 1.6rem; }
    .hero p { font-size: 0.9rem; }
    .hero-buttons .btn { font-size: 0.85rem; padding: 0.65rem 1.2rem; }
    .card-grid { grid-template-columns: 1fr; gap: 0.8rem; }
    .card { padding: 1.1rem 1rem; }
    .img-hero { max-width: 110px; }
    .img-placeholder-sm { max-width: 120px; }
    .bio-flex { flex-direction: column; align-items: stretch; }
    .bio-flex>div { min-width: auto; }
    .flip-card { height: 160px; }
    .flip-card-front, .flip-card-back { padding: 0.8rem; font-size: 0.8rem; }
    .draggable { font-size: 0.75rem; padding: 0.45rem 0.6rem; }
    .drop-zone h4 { font-size: 0.8rem; }
    .timeline { gap: 1rem; }
    .timeline-item { min-width: 100px; font-size: 0.75rem; }
    .quiz-option { font-size: 0.85rem; }
    .nav-links { width: 85%; max-width: 280px; }
    .logo { font-size: 1.4rem; }
    .btn { padding: 0.6rem 1.2rem; font-size: 0.85rem; }
    section { scroll-margin-top: 3.5rem; }
}

@media (max-width: 360px) {
    html { font-size: 13px; }
    .hero blockquote { font-size: 1.4rem; }
    .card-grid { grid-template-columns: 1fr; }
    .flip-card { height: 150px; }
    .draggable { font-size: 0.7rem; padding: 0.4rem 0.5rem; }
    .nav-container { padding: 0.6rem 0.8rem; }
}(function() {
    // ---------- TEMA OSCURO ----------
    const html = document.documentElement;
    const themeToggleDesktop = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const themeIconDesktop = document.getElementById('themeIcon');
    const themeIconMobile = document.getElementById('themeIconMobile');

    function getPreferredTheme() {
        const saved = localStorage.getItem('epicuro-theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function updateThemeIcons(theme) {
        [themeIconDesktop, themeIconMobile].forEach(icon => {
            if (!icon) return;
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        updateThemeIcons(theme);
    }

    function toggleTheme() {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('epicuro-theme', newTheme);
    }

    applyTheme(getPreferredTheme());
    themeToggleDesktop.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('epicuro-theme')) applyTheme(e.matches ? 'dark' : 'light');
    });

    // ---------- MENÚ MÓVIL ----------
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('overlay');
    const menuIcon = document.getElementById('menuIcon');

    function openMenu() {
        navLinks.classList.add('active');
        overlay.classList.add('active');
        menuIcon.className = 'fas fa-times';
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        menuIcon.className = 'fas fa-bars';
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', () => {
        navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });
    overlay.addEventListener('click', closeMenu);
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) closeMenu();
    }));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) closeMenu();
    });

    // Ajustar visibilidad de botones de tema
    function adjustThemeToggleVisibility() {
        const mobile = window.innerWidth <= 900;
        themeToggleDesktop.style.display = mobile ? 'none' : 'flex';
        if (themeToggleMobile) themeToggleMobile.style.display = mobile ? 'flex' : 'none';
    }
    adjustThemeToggleVisibility();
    window.addEventListener('resize', adjustThemeToggleVisibility);

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ---------- SISTEMA DE AUDIO ZEN ----------
    let audioCtx = null;
    let musicNodes = null;
    let musicPlaying = false;

    function initAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playSoftClick(freq = 800, duration = 0.12, vol = 0.15) {
        if (!audioCtx) return;
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + duration);
    }

    function playFlipSound() {
        if (!audioCtx) return;
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(900, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
    }

    function createZenAmbient() {
        if (!audioCtx) return null;
        const now = audioCtx.currentTime;
        const masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.08, now + 2);

        const osc1 = audioCtx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.value = 110;

        const osc2 = audioCtx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = 111;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        filter.Q.value = 0.5;

        const lfo = audioCtx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.2;
        const lfoGain = audioCtx.createGain();
        lfoGain.gain.value = 0.03;
        lfo.connect(lfoGain).connect(masterGain.gain);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(audioCtx.destination);

        osc1.start(now);
        osc2.start(now);
        lfo.start(now);

        return { osc1, osc2, lfo, filter, masterGain, lfoGain };
    }

    function startMusic() {
        initAudioContext();
        if (!musicNodes) {
            musicNodes = createZenAmbient();
        }
        if (musicNodes && audioCtx.state === 'running') {
            musicNodes.masterGain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 1);
            musicPlaying = true;
            updateMusicButton();
        }
    }

    function stopMusic() {
        if (musicNodes && audioCtx) {
            musicNodes.masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
            musicPlaying = false;
            updateMusicButton();
        }
    }

    function updateMusicButton() {
        const btn = document.getElementById('musicToggle');
        const span = btn.querySelector('span');
        const icon = btn.querySelector('i');
        if (musicPlaying) {
            span.textContent = 'Pausar Música';
            icon.className = 'fas fa-volume-up';
        } else {
            span.textContent = 'Música Zen';
            icon.className = 'fas fa-music';
        }
    }

    const musicToggleBtn = document.getElementById('musicToggle');
    musicToggleBtn.addEventListener('click', () => {
        if (musicPlaying) {
            stopMusic();
        } else {
            startMusic();
        }
        initAudioContext();
        playSoftClick(1000, 0.08);
    });

    // ---------- EFECTOS DE SONIDO GLOBALES ----------
    function addSoundToFlipCards() {
        document.querySelectorAll('.flip-card').forEach(card => {
            card.addEventListener('click', function() {
                initAudioContext();
                playFlipSound();
            });
        });
    }

    function addClickSound(selector, freq = 1000) {
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener('click', () => {
                initAudioContext();
                playSoftClick(freq, 0.1);
            });
        });
    }

    // Al cargar
    window.addEventListener('load', () => {
        addSoundToFlipCards();
        addClickSound('.btn:not(#musicToggle)', 900);
        addClickSound('.menu-toggle', 700);
        addClickSound('.theme-toggle', 700);
    });

    // ---------- DRAG & DROP ----------
    const draggables = document.querySelectorAll('.draggable');
    const dropZones = document.querySelectorAll('.drop-zone');
    const itemsContainer = document.getElementById('items-container');
    let draggedItem = null;
    let touchDragItem = null;
    let touchStartX = 0, touchStartY = 0, touchOffsetX = 0, touchOffsetY = 0, touchHasMoved = false;

    draggables.forEach(d => {
        d.addEventListener('dragstart', e => {
            if (touchDragItem) return;
            draggedItem = d;
            e.dataTransfer.setData('text/plain', d.id);
            setTimeout(() => d.style.opacity = '0.4', 0);
        });
        d.addEventListener('dragend', e => {
            d.style.opacity = '1';
            draggedItem = null;
            dropZones.forEach(zone => zone.classList.remove('drag-over'));
        });

        d.addEventListener('touchstart', handleTouchStart, { passive: false });
        d.addEventListener('touchmove', handleTouchMove, { passive: false });
        d.addEventListener('touchend', handleTouchEnd);
        d.addEventListener('touchcancel', handleTouchCancel);
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
        zone.addEventListener('drop', e => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            if (draggedItem) {
                zone.appendChild(draggedItem);
                draggedItem.style.opacity = '1';
                draggedItem = null;
            }
        });
    });

    itemsContainer.addEventListener('dragover', e => e.preventDefault());
    itemsContainer.addEventListener('drop', e => {
        e.preventDefault();
        if (draggedItem) {
            itemsContainer.appendChild(draggedItem);
            draggedItem.style.opacity = '1';
            draggedItem = null;
        }
    });

    function handleTouchStart(e) {
        if (draggedItem) return;
        touchDragItem = e.target.closest('.draggable');
        if (!touchDragItem) return;
        touchHasMoved = false;
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        const rect = touchDragItem.getBoundingClientRect();
        touchOffsetX = touch.clientX - rect.left;
        touchOffsetY = touch.clientY - rect.top;
        e.preventDefault();
    }

    function handleTouchMove(e) {
        if (!touchDragItem) return;
        const touch = e.touches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;
        if (!touchHasMoved && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
            touchHasMoved = true;
            touchDragItem.classList.add('dragging-touch');
            dropZones.forEach(zone => zone.classList.remove('drag-over'));
        }
        if (!touchHasMoved) return;
        e.preventDefault();

        touchDragItem.style.position = 'fixed';
        touchDragItem.style.left = (touch.clientX - touchOffsetX) + 'px';
        touchDragItem.style.top = (touch.clientY - touchOffsetY) + 'px';
        touchDragItem.style.zIndex = '200';
        touchDragItem.style.pointerEvents = 'none';
        touchDragItem.style.margin = '0';

        dropZones.forEach(zone => zone.classList.remove('drag-over'));
        const elemBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        if (elemBelow) {
            const zone = elemBelow.closest('.drop-zone');
            if (zone) zone.classList.add('drag-over');
        }
    }

    function handleTouchEnd(e) {
        if (!touchDragItem) return;
        touchDragItem.classList.remove('dragging-touch');
        touchDragItem.style.position = '';
        touchDragItem.style.left = '';
        touchDragItem.style.top = '';
        touchDragItem.style.zIndex = '';
        touchDragItem.style.pointerEvents = '';
        touchDragItem.style.margin = '';
        dropZones.forEach(zone => zone.classList.remove('drag-over'));

        if (touchHasMoved) {
            const touch = e.changedTouches[0];
            const elemBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            if (elemBelow) {
                const zone = elemBelow.closest('.drop-zone');
                if (zone) {
                    zone.appendChild(touchDragItem);
                } else if (elemBelow.closest('#items-container')) {
                    itemsContainer.appendChild(touchDragItem);
                }
            }
        }
        touchDragItem = null;
        touchHasMoved = false;
    }

    function handleTouchCancel(e) {
        if (!touchDragItem) return;
        touchDragItem.classList.remove('dragging-touch');
        touchDragItem.style.position = '';
        touchDragItem.style.left = '';
        touchDragItem.style.top = '';
        touchDragItem.style.zIndex = '';
        touchDragItem.style.pointerEvents = '';
        touchDragItem.style.margin = '';
        dropZones.forEach(zone => zone.classList.remove('drag-over'));
        touchDragItem = null;
        touchHasMoved = false;
    }

    // Verificar clasificación
    document.getElementById('verificar-deseos').addEventListener('click', () => {
        let correctos = 0;
        const total = draggables.length;
        dropZones.forEach(zone => {
            const accept = zone.dataset.accept;
            zone.querySelectorAll('.draggable').forEach(child => {
                if (child.dataset.correct === accept) correctos++;
            });
        });
        const feedback = document.getElementById('feedback-deseos');
        if (correctos === total) {
            feedback.innerHTML = '✅ ¡Perfecto! Has comprendido la clasificación epicúrea.';
            feedback.style.color = 'var(--verde-oliva)';
        } else {
            feedback.innerHTML = `⚠️ Tienes ${correctos} de ${total} correctos. Revisa las categorías.`;
            feedback.style.color = 'var(--terracota)';
        }
    });

    // ---------- TEST ----------
    const preguntas = [
        { pregunta: "Según Epicuro, la muerte...", opciones: ["Es un paso a otra vida","Debe ser temida por su misterio","No es nada para nosotros porque no podemos experimentarla","Es el fin de toda felicidad"], correcta: 2 },
        { pregunta: "El placer epicúreo se define mejor como:", opciones: ["Indulgencia en todos los deseos","Ausencia de dolor y perturbación","Riqueza y poder","Placeres intensos pero breves"], correcta: 1 },
        { pregunta: "¿Qué son la aponía y la ataraxia?", opciones: ["Dos dioses griegos","Ausencia de dolor físico y tranquilidad del alma","Tipos de deseos naturales","Métodos de estudio"], correcta: 1 },
        { pregunta: "¿Cómo consideraba Epicuro a los dioses?", opciones: ["Inexistentes","Seres que castigan a los humanos","Existen pero no intervienen en asuntos humanos","Hay que adorarlos para ser felices"], correcta: 2 },
        { pregunta: "El mayor bien que procura la sabiduría según Epicuro es:", opciones: ["La riqueza","La salud","La amistad","El conocimiento"], correcta: 2 }
    ];

    let preguntaActual = 0;
    let respuestasUsuario = new Array(preguntas.length).fill(null);
    const preguntaContainer = document.getElementById('pregunta-container');
    const siguienteBtn = document.getElementById('siguiente-btn');
    const resultadoFinal = document.getElementById('resultado-final');

    function mostrarPregunta(indice) {
        if (indice >= preguntas.length) { mostrarResultado(); return; }
        const q = preguntas[indice];
        let html = `<p class="quiz-question">${indice+1}. ${q.pregunta}</p>`;
        q.opciones.forEach((op, i) => {
            html += `<label class="quiz-option"><input type="radio" name="quiz" value="${i}" ${respuestasUsuario[indice] == i ? 'checked' : ''}> ${op}</label>`;
        });
        preguntaContainer.innerHTML = html;
        siguienteBtn.style.display = 'inline-block';
        siguienteBtn.textContent = (indice === preguntas.length - 1) ? 'Ver resultado' : 'Siguiente pregunta';
        siguienteBtn.disabled = respuestasUsuario[indice] === null;
        document.querySelectorAll('input[name="quiz"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                respuestasUsuario[indice] = parseInt(e.target.value);
                siguienteBtn.disabled = false;
            });
        });
    }

    function mostrarResultado() {
        let aciertos = 0;
        preguntas.forEach((q, idx) => { if (respuestasUsuario[idx] === q.correcta) aciertos++; });
        let perfil = aciertos === 5 ? '🏛️ Sabio del Jardín' : (aciertos >= 3 ? '🍃 En busca de la ataraxia' : '🤔 Hedonista confundido');
        preguntaContainer.innerHTML = '';
        siguienteBtn.style.display = 'none';
        resultadoFinal.style.display = 'block';
        resultadoFinal.innerHTML = `<strong>${perfil}</strong><br>Has acertado ${aciertos} de ${preguntas.length}.`;
    }

    siguienteBtn.addEventListener('click', () => {
        const seleccionado = document.querySelector('input[name="quiz"]:checked');
        if (!seleccionado) {
            alert('Por favor selecciona una opción.');
            return;
        }
        respuestasUsuario[preguntaActual] = parseInt(seleccionado.value);
        preguntaActual++;
        mostrarPregunta(preguntaActual);
    });

    mostrarPregunta(0);
})();
