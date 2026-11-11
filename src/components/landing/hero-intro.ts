// Intro del hero, según el prototipo de Figma "Intro · Hero Midaz" (8 cuadros con Smart Animate).
// Cada elemento tiene un estado por cuadro; entre cuadros se interpola con la duración y la curva
// exactas del prototipo. Los valores en px salen del lienzo de 1280 px del Figma.

type State = Record<string, string | number>;

// Transiciones del prototipo: [inicio, fin] en ms y curva. El cuadro k+1 queda listo al final del tramo k.
const SEGMENTS: [number, number, string][] = [
    [200, 750, "linear"], // Carga 0 → Carga 50
    [1550, 2050, "cubic-bezier(0.2,0,0.2,1)"], // Carga 50 → Carga 100
    [2200, 2480, "cubic-bezier(0.55,0,0.9,0.4)"], // Carga 100 → Estallido
    [3280, 3930, "cubic-bezier(0.1,0.6,0.25,1)"], // Estallido → Teléfono
    [4730, 5110, "cubic-bezier(0.33,0.1,0.6,1)"], // Teléfono → Titular
    [5910, 6410, "cubic-bezier(0.15,0.7,0.3,1)"], // Titular → Hero
    [6510, 6960, "cubic-bezier(0.2,0,0.2,1)"], // Hero → Hero final
];
const TOTAL = SEGMENTS[SEGMENTS.length - 1][1];

/** Ocho estados (uno por cuadro) → keyframes de Web Animations con los tiempos del prototipo. */
function keyframes(states: State[]): Keyframe[] {
    const frames: Keyframe[] = [{ ...states[0], offset: 0 }];
    SEGMENTS.forEach(([start, end, easing], i) => {
        if (JSON.stringify(states[i]) === JSON.stringify(states[i + 1])) return;
        frames.push({ ...states[i], offset: start / TOTAL, easing });
        frames.push({ ...states[i + 1], offset: end / TOTAL });
    });
    frames.push({ ...states[7], offset: 1 });
    return frames;
}

/** Repite valores: rep([a, 3], [b, 5]) → [a, a, a, b, b, b, b, b]. */
const rep = <T,>(...parts: [T, number][]): T[] => parts.flatMap(([v, n]) => Array(n).fill(v));

// Curva cúbica de Bézier para el contador (el texto no se puede animar con CSS).
function bezier(x1: number, y1: number, x2: number, y2: number) {
    const a = (p1: number, p2: number, t: number) => 3 * p1 * t * (1 - t) ** 2 + 3 * p2 * t * t * (1 - t) + t ** 3;
    return (x: number) => {
        let lo = 0;
        let hi = 1;
        for (let i = 0; i < 20; i++) {
            const mid = (lo + hi) / 2;
            if (a(x1, x2, mid) < x) lo = mid;
            else hi = mid;
        }
        return a(y1, y2, (lo + hi) / 2);
    };
}
const easeLoad = bezier(0.2, 0, 0.2, 1);

const GLYPHS = "0123456789%#&$@*+=?";
// Texto de las métricas en el cuadro "Titular" del Figma (IVA, IGTF, cumplimiento, BCV).
const FIGMA_SCRAMBLE = ["4 · 07 · 9&", "7", "4%7", "B#7"];

export async function runIntro() {
    const root = document.documentElement;
    if (!root.classList.contains("intro")) return;
    root.setAttribute("data-intro-running", "");
    // Se espera a las fuentes (máx. 1,2 s): el menú se mide con ellas y el titular no debe cambiar de letra a mitad.
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]);
    if (window.scrollY > 0) {
        root.classList.remove("intro");
        root.removeAttribute("data-intro-running");
        return;
    }
    try {
        sessionStorage.setItem("midaz-intro", "1");
    } catch {}

    const q = <T extends Element = HTMLElement>(sel: string) => Array.from(document.querySelectorAll<T & HTMLElement>(sel));
    const anims: Animation[] = [];
    const play = (el: Element | undefined, states: State[]) => {
        if (!el) return;
        anims.push(el.animate(keyframes(states), { duration: TOTAL, fill: "both" }));
    };

    // Menú: píldora que nace en el centro (solo logo), se abre con 3 enlaces y luego completa.
    const nav = q("[data-intro-nav]")[0];
    const links = q("[data-intro-links]")[0];
    const right = q("[data-intro-right]")[0];
    const logo = nav?.querySelector("a");
    if (nav && links && right && logo) {
        const n = nav.getBoundingClientRect();
        const l = logo.getBoundingClientRect();
        const u = links.getBoundingClientRect();
        const r = right.getBoundingClientRect();
        const full = n.width;
        const ulGap = u.left - l.right;
        const rightGap = r.left - u.right;
        nav.style.justifyContent = "flex-start";
        nav.style.overflow = "hidden";
        links.style.flexShrink = right.style.flexShrink = "0";
        play(nav, [...rep<State>([{ width: "52px", opacity: 0 }, 3]), { width: "190px", opacity: 1 }, { width: "640px", opacity: 1 }, ...rep<State>([{ width: `${full}px`, opacity: 1 }, 3])]);
        // En "Teléfono" los enlaces empiezan 171 px después del borde de la píldora (logo termina en 153).
        play(links, [...rep<State>([{ marginLeft: "18px" }, 5]), ...rep<State>([{ marginLeft: `${ulGap}px` }, 3])]);
        play(right, [...rep<State>([{ marginLeft: `${rightGap}px`, opacity: 0 }, 5]), ...rep<State>([{ marginLeft: `${rightGap}px`, opacity: 1 }, 3])]);
        q("[data-intro-link]").forEach((li, i) => play(li, i < 3 ? rep<State>([{ opacity: 0 }, 4], [{ opacity: 1 }, 4]) : rep<State>([{ opacity: 0 }, 5], [{ opacity: 1 }, 3])));
    }

    play(q("[data-intro-wm]")[0], [...rep<State>([{ opacity: 0 }, 3]), { opacity: 0.35 }, ...rep<State>([{ opacity: 1 }, 4])]);
    play(q("[data-intro-halo]")[0], [...rep<State>([{ opacity: 0 }, 3]), { opacity: 0.4 }, ...rep<State>([{ opacity: 1 }, 4])]);

    // Teléfono central: diminuto mientras carga, mediano en el estallido y a tamaño real después.
    play(q("[data-intro-phone]")[0], [
        ...rep<State>([{ transform: "translate(25.5px,-216.9px) scale(0.16)" }, 3]),
        { transform: "translate(10.2px,-117px) scale(0.5999)" },
        ...rep<State>([{ transform: "translate(0px,0px) scale(1)" }, 4]),
    ]);
    play(q("[data-intro-shadow]")[0], rep<State>([{ opacity: 0 }, 4], [{ opacity: 1 }, 4]));

    // Teléfonos satélite (centro, escala y giro sacados de la matriz de cada capa en Figma; Figma gira al revés que CSS).
    // Por cuadro: [dx, dy, escala] en carga, estallido y salida, relativos a la caja de 361×594 del teléfono.
    const sats: { rot: number; at: [number, number, number][] }[] = [
        { rot: 5, at: [[16.4, -231.4, 0.143], [-318.1, -234.1, 0.5242], [-652.7, -236.4, 0.9529]] },
        { rot: -4, at: [[16.5, -231.5, 0.143], [-140.9, -178.8, 0.5242], [-298.3, -126, 0.9529]] },
        { rot: 4, at: [[16.5, -231.5, 0.143], [152.8, -58.2, 0.5242], [289.2, 115.2, 0.9529]] },
        { rot: -6, at: [[16.6, -231.4, 0.143], [330.4, -3.3, 0.5242], [644.1, 225, 0.9529]] },
    ];
    q("[data-intro-sat]").forEach((el, i) => {
        const { rot, at } = sats[i];
        const tf = ([x, y, k]: [number, number, number]) => `translate(${x}px,${y}px) rotate(${rot}deg) scale(${k})`;
        play(el, [...rep<State>([{ transform: tf(at[0]), opacity: 0 }, 3]), { transform: tf(at[1]), opacity: 0.9 }, ...rep<State>([{ transform: tf(at[2]), opacity: 0 }, 4])]);
    });

    // Titular: cada palabra crece desde su base; en "Titular" van escalonadas.
    const partial = [1, 0.75, 0.49, 0.3, 0.125];
    // En ese cuadro llevan además una extrusión de 5 sombras (#98abcc, 2 a 10 px); se compensa la escala para que mida igual.
    const flat = "0 0 0 rgba(152,171,204,0)";
    const noShadow = Array(5).fill(flat).join(",");
    const extrude = (k: number) => [2, 4, 6, 8, 10].map((y) => `0 ${(y / k).toFixed(2)}px 0 #98abcc`).join(",");
    q("[data-intro-word]").forEach((el, i) =>
        play(el, [
            ...rep<State>([{ transform: "scaleY(0.047)", opacity: 0, textShadow: noShadow }, 4]),
            { transform: "scaleY(0.047)", opacity: 1, textShadow: noShadow },
            { transform: `scaleY(${partial[i] ?? 1})`, opacity: 1, textShadow: extrude(partial[i] ?? 1) },
            ...rep<State>([{ transform: "scaleY(1)", opacity: 1, textShadow: noShadow }, 2]),
        ]),
    );

    // Métricas: aparecen en "Titular" con los dígitos revueltos; las tres de la derecha salen de la primera posición.
    q("[data-intro-stat]").forEach((el) => {
        const shift = Math.max(0, Number(el.dataset.introStat) - 1) * -155;
        play(el, [...rep<State>([{ opacity: 0, transform: `translateX(${shift}px)` }, 5]), ...rep<State>([{ opacity: 1, transform: "translateX(0px)" }, 3])]);
    });
    q("[data-intro-label]").forEach((el) => play(el, rep<State>([{ opacity: 0 }, 6], [{ opacity: 1 }, 2])));

    q("[data-intro-badge]").forEach((el) => play(el, rep<State>([{ opacity: 0, transform: "translateY(24px)" }, 6], [{ opacity: 1, transform: "translateY(0px)" }, 2])));
    q("[data-intro-pill]").forEach((el) => play(el, [...rep<State>([{ opacity: 0 }, 6]), { opacity: 0.35 }, { opacity: 1 }]));

    const pct = q("[data-intro-pct]")[0];
    play(pct, [...rep<State>([{ opacity: 1, transform: "translateY(0px)" }, 3]), ...rep<State>([{ opacity: 0, transform: "translateY(-52px)" }, 5])]);

    // Lo que no es CSS: el contador de carga y los dígitos revueltos.
    const scramble = q("[data-intro-scramble]").map((el) => ({ el, text: el.textContent ?? "" }));
    const t0 = performance.now();
    let frame = 0;
    let lastShuffle = 0;
    const tick = (now: number) => {
        const t = now - t0;
        if (pct) {
            const v = t < 200 ? 0 : t < 750 ? ((t - 200) / 550) * 50 : t < 1550 ? 50 : t < 2050 ? 50 + easeLoad((t - 1550) / 500) * 50 : 100;
            pct.textContent = `${Math.round(v)}%`;
        }
        if (t >= 5110 && t < 5910) {
            // Cuadro "Titular" en reposo: los mismos dígitos revueltos del Figma.
            scramble.forEach(({ el }, i) => (el.textContent = FIGMA_SCRAMBLE[i] ?? el.textContent));
        } else if (t >= 4730 && t < 6410 && now - lastShuffle > 55) {
            lastShuffle = now;
            // Se van fijando de izquierda a derecha durante la transición al hero.
            const settled = t < 5910 ? 0 : (t - 5910) / 500;
            scramble.forEach(({ el, text }) => {
                el.textContent = Array.from(text)
                    .map((c, i, all) => (c === " " || c === "·" || i < settled * all.length ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
                    .join("");
            });
        }
        if (t < TOTAL) frame = requestAnimationFrame(tick);
        else finish();
    };
    frame = requestAnimationFrame(tick);

    let done = false;
    const finish = () => {
        if (done) return;
        done = true;
        cancelAnimationFrame(frame);
        scramble.forEach(({ el, text }) => (el.textContent = text));
        anims.forEach((a) => a.cancel());
        if (nav && links && right) {
            nav.style.justifyContent = nav.style.overflow = "";
            links.style.flexShrink = right.style.flexShrink = "";
        }
        root.classList.remove("intro");
        root.removeAttribute("data-intro-running");
        skipEvents.forEach((e) => removeEventListener(e, skip));
    };
    // Cualquier intención de usar la página salta la intro.
    const skip = () => finish();
    const skipEvents = ["wheel", "touchstart", "keydown", "pointerdown"];
    skipEvents.forEach((e) => addEventListener(e, skip, { passive: true }));
}
