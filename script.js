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
    if (themeToggleDesktop) themeToggleDesktop.addEventListener('click', toggleTheme);
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
        if (!navLinks || !overlay || !menuIcon) return;
        navLinks.classList.add('active');
        overlay.classList.add('active');
        menuIcon.className = 'fas fa-times';
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (!navLinks || !overlay || !menuIcon) return;
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        menuIcon.className = 'fas fa-bars';
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (!navLinks) return;
            navLinks.classList.contains('active') ? closeMenu() : openMenu();
        });
    }
    if (overlay) overlay.addEventListener('click', closeMenu);
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) closeMenu();
        }));
    }
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) closeMenu();
    });

    // Ajustar visibilidad de botones de tema
    function adjustThemeToggleVisibility() {
        if (!themeToggleDesktop || !themeToggleMobile) return;
        const mobile = window.innerWidth <= 900;
        themeToggleDesktop.style.display = mobile ? 'none' : 'flex';
        themeToggleMobile.style.display = mobile ? 'flex' : 'none';
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

    // ---------- REPRODUCTOR DE MÚSICA DE FONDO DESDE YOUTUBE ----------
    const videoId = 'mj_0KoleZiU'; // ⬅️ Cambia este ID por el de tu video/lista de reproducción
    let ytPlayer = null;
    let ytPlaying = false;
    const musicToggleBtn = document.getElementById('musicToggle');

    // Silenciar el <audio> original (por si acaso)
    const bgAudio = document.getElementById('bgMusic');
    if (bgAudio) {
        bgAudio.volume = 0;
        bgAudio.pause();
    }

    // Crear el contenedor invisible para YouTube si no existe
    let ytContainer = document.getElementById('yt-player');
    if (!ytContainer) {
        ytContainer = document.createElement('div');
        ytContainer.id = 'yt-player';
        ytContainer.style.cssText = 'position:fixed; width:1px; height:1px; overflow:hidden; opacity:0.01; pointer-events:none;';
        document.body.appendChild(ytContainer);
    }

    function onYouTubeIframeAPIReady() {
        ytPlayer = new YT.Player('yt-player', {
            videoId: videoId,
            playerVars: {
                autoplay: 0,
                controls: 0,
                modestbranding: 1,
                loop: 1,
                playlist: videoId,
                enablejsapi: 1,
                mute: 1          // Comienza muteado (política de autoplay)
            },
            events: {
                onReady: function() {
                    // El botón ya está listo para usarse
                }
            }
        });
    }

    // Cargar la API de YouTube si no está ya cargada
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else if (window.YT && window.YT.Player) {
        onYouTubeIframeAPIReady();
    }

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    function updateMusicButtonState(playing) {
        if (!musicToggleBtn) return;
        const span = musicToggleBtn.querySelector('span');
        const icon = musicToggleBtn.querySelector('i');
        if (span && icon) {
            if (playing) {
                span.textContent = 'Pausar Música';
                icon.className = 'fas fa-volume-up';
            } else {
                span.textContent = 'Música Zen';
                icon.className = 'fas fa-music';
            }
        }
    }

    if (musicToggleBtn) {
        musicToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!ytPlayer || !ytPlayer.unMute) return;  // El reproductor aún no está listo

            if (ytPlaying) {
                ytPlayer.pauseVideo();
                ytPlaying = false;
                updateMusicButtonState(false);
            } else {
                ytPlayer.unMute();       // Quitar el mute (necesario tras el clic)
                ytPlayer.playVideo();
                ytPlaying = true;
                updateMusicButtonState(true);
            }
        });
    }

    // ---------- EFECTOS DE SONIDO (clics, flips) ----------
    let audioCtx = null;

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

    if (itemsContainer) {
        itemsContainer.addEventListener('dragover', e => e.preventDefault());
        itemsContainer.addEventListener('drop', e => {
            e.preventDefault();
            if (draggedItem) {
                itemsContainer.appendChild(draggedItem);
                draggedItem.style.opacity = '1';
                draggedItem = null;
            }
        });
    }

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
            if (touch) {
                const elemBelow = document.elementFromPoint(touch.clientX, touch.clientY);
                if (elemBelow) {
                    const zone = elemBelow.closest('.drop-zone');
                    if (zone) {
                        zone.appendChild(touchDragItem);
                    } else if (itemsContainer && elemBelow.closest('#items-container')) {
                        itemsContainer.appendChild(touchDragItem);
                    }
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
    const verificarBtn = document.getElementById('verificar-deseos');
    if (verificarBtn) {
        verificarBtn.addEventListener('click', () => {
            let correctos = 0;
            const total = draggables.length;
            dropZones.forEach(zone => {
                const accept = zone.dataset.accept;
                zone.querySelectorAll('.draggable').forEach(child => {
                    if (child.dataset.correct === accept) correctos++;
                });
            });
            const feedback = document.getElementById('feedback-deseos');
            if (feedback) {
                if (correctos === total) {
                    feedback.innerHTML = '✅ ¡Perfecto! Has comprendido la clasificación epicúrea.';
                    feedback.style.color = 'var(--verde-oliva)';
                } else {
                    feedback.innerHTML = `⚠️ Tienes ${correctos} de ${total} correctos. Revisa las categorías.`;
                    feedback.style.color = 'var(--terracota)';
                }
            }
        });
    }

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
        if (!preguntaContainer || !siguienteBtn) return;
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
        if (!preguntaContainer || !siguienteBtn || !resultadoFinal) return;
        let aciertos = 0;
        preguntas.forEach((q, idx) => { if (respuestasUsuario[idx] === q.correcta) aciertos++; });
        let perfil = aciertos === 5 ? '🏛️ Sabio del Jardín' : (aciertos >= 3 ? '🍃 En busca de la ataraxia' : '🤔 Hedonista confundido');
        preguntaContainer.innerHTML = '';
        siguienteBtn.style.display = 'none';
        resultadoFinal.style.display = 'block';
        resultadoFinal.innerHTML = `<strong>${perfil}</strong><br>Has acertado ${aciertos} de ${preguntas.length}.`;
    }

    if (siguienteBtn) {
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
    }

    // Iniciar test mostrando la primera pregunta (elementos ya existen)
    if (preguntaContainer && siguienteBtn && resultadoFinal) {
        mostrarPregunta(0);
    }

})();
