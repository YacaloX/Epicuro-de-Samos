(function() {
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
