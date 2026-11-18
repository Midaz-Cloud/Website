// Pantalla de carga y entrada del hero, según el Figma:
// - "Loader · Vista en video" (línea de tiempo de 0 a 100 %, Hermez caminando sobre la barra),
// - "Transición · Expansión a landing" (fases 1 a 4 con Smart Animate y disolución a la landing),
// - "Hero / Titular escritura" y "Hero / Contador IVA · IGTF · cumplimiento".
// Los px salen del lienzo de 1280×800 del Figma, que aquí se escala a la altura de la ventana.

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

// ── Línea de tiempo de la carga (ms) ───────────────────────────────────────────
// Puntos del video del Figma: 0 % hasta 1000 ms, 24 % a 2100, 52 % a 3300, 75 % a 4150 (pausa hasta 4350),
// 97 % a 4900 con ease-in y 100 % a 5020. Luego 400 ms quieto y empieza la transición.
const LOAD = [0, 1000, 2100, 3300, 4150, 4350, 4900, 5020];
const LOAD_END = 5020;
const CROSS = "cubic-bezier(0.5,0,0.5,1)";
// Transición: [espera, duración, curva] de cada fase (prototipo del Figma).
const PHASES: [number, number, string][] = [
    [400, 500, "cubic-bezier(0.42,0,1,1)"], // 100 % → Fase 1 · Despeje (ease-in)
    [50, 700, "cubic-bezier(0.42,0,0.58,1)"], // Fase 1 → Fase 2 · Zoom (ease-in-out)
    [100, 650, "cubic-bezier(0,0,0.58,1)"], // Fase 2 → Fase 3 · Acercamiento (ease-out)
    [150, 750, "cubic-bezier(0.42,0,0.58,1)"], // Fase 3 → Fase 4 · Landing (ease-in-out)
    [150, 400, "cubic-bezier(0,0,0.58,1)"], // Fase 4 → landing (disolver, ease-out)
];
const PHASE_AT: [number, number, string][] = [];
{
    let t = LOAD_END;
    for (const [wait, dur, ease] of PHASES) {
        PHASE_AT.push([t + wait, dur, ease]);
        t += wait + dur;
    }
}
const TOTAL = PHASE_AT[4][0] + PHASE_AT[4][1];
// Keiv (2026-11-18): toda la carga dura 5 s. Los tiempos de arriba son los del Figma (8,87 s) y se comprimen
// en proporción: cada animación dura TOTAL × SPEED, con los mismos puntos relativos.
const DURATION = 5000;
const SPEED = DURATION / TOTAL;

/** Keyframes con tiempos absolutos (ms) sobre la duración total. */
function track(points: [number, Keyframe, string?][]): Keyframe[] {
    return points.map(([t, k, easing]) => ({ ...k, offset: t / TOTAL, ...(easing ? { easing } : {}) }));
}

/** Valores de la carga en sus 8 puntos → keyframes (la pausa de 4150 a 4350 y el tramo ease-in hasta 4900). */
function loadTrack(values: Keyframe[], after: [number, Keyframe, string?][] = []): Keyframe[] {
    const pts: [number, Keyframe, string?][] = LOAD.map((t, i) => [t, values[i], i === 5 ? "cubic-bezier(0.42,0,1,1)" : "linear"]);
    return track([...pts, ...after, [TOTAL, values.length > 8 ? values[8] : (after.length ? after[after.length - 1][1] : values[7])]]);
}

// ── Titular y contadores ───────────────────────────────────────────────────────
const IVA = ["0 · 0 · 0", "1 · 2 · 3", "1 · 3 · 6", "2 · 4 · 8", "3 · 6 · 11", "3 · 7 · 13", "4 · 8 · 15", "4 · 9 · 17", "5 · 10 · 19", "5 · 11 · 20", "6 · 11 · 22", "6 · 12 · 23", "6 · 13 · 24", "7 · 13 · 25", "7 · 14 · 26", "7 · 14 · 27", "7 · 14 · 28", "7 · 15 · 28", "7 · 15 · 29", "8 · 15 · 29", "8 · 15 · 30", "8 · 16 · 30", "8 · 16 · 30", "8 · 16 · 31"];
const IGTF = ["0", "0", "1", "1", "1", "1", "1", "2", "2", "2", "2", "2", "2", "2", "3"];
const COUNTERS: Record<string, string[]> = { iva: IVA, igtf: IGTF };

function runHeroText() {
    const root = document.documentElement;
    if (!root.classList.contains("hero-anim")) return;
    root.classList.remove("hero-anim");

    // Contadores: paso 0 durante 250 ms y luego un paso cada 40 ms.
    $$("[data-count]").forEach((el) => {
        const steps = COUNTERS[el.dataset.count ?? ""];
        if (!steps) return;
        const final = el.textContent;
        el.textContent = steps[0];
        steps.slice(1).forEach((v, i) => setTimeout(() => (el.textContent = v), 250 + i * 40));
        setTimeout(() => (el.textContent = final), 250 + steps.length * 40);
    });

    // Titular: una letra por paso. 150 ms antes de la primera, 55 ms entre letras y 280 ms de pausa
    // antes de cada punto o coma (como en el Figma, que pausaba antes de cada punto). Cada letra entra en 90 ms ease-out.
    const chars = $$("[data-tw]");
    chars.forEach((c) => {
        c.style.opacity = "0";
        c.style.transition = "opacity 90ms cubic-bezier(0,0,0.58,1)";
    });
    let t = 150;
    chars.forEach((c, i) => {
        setTimeout(() => (c.style.opacity = "1"), t);
        const next = chars[i + 1];
        t += next && next.parentElement === c.parentElement && (next.textContent === "." || next.textContent === ",") ? 280 : 55;
    });
}

// ── Video de Hermez con transparencia ──────────────────────────────────────────
// Safari no respeta la transparencia de VP9: ahí se usa el MP4 con el color arriba y el alfa abajo,
// compuesto en un canvas con WebGL (igual que en la sección de Hermez).
function playHermez(video: HTMLVideoElement) {
    const ua = navigator.userAgent;
    const webkitOnly = /iP(hone|ad|od)/.test(ua) || (/Safari\//.test(ua) && !/Chrome|Chromium|Android|Edg\//.test(ua));
    if (!webkitOnly) {
        video.play().catch(() => {});
        return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = 404;
    canvas.height = 564;
    canvas.className = video.className;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, alpha: true });
    if (!gl) return;
    const src = document.createElement("video");
    Object.assign(src, { muted: true, loop: true, playsInline: true, src: "/landing/hermez-safari.mp4" });
    src.setAttribute("playsinline", "");
    const shader = (type: number, code: string) => {
        const sh = gl.createShader(type)!;
        gl.shaderSource(sh, code);
        gl.compileShader(sh);
        return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, "attribute vec2 p;varying vec2 uv;void main(){uv=vec2((p.x+1.)/2.,(1.-p.y)/2.);gl_Position=vec4(p,0.,1.);}"));
    gl.attachShader(
        prog,
        shader(gl.FRAGMENT_SHADER, "precision mediump float;uniform sampler2D t;varying vec2 uv;void main(){vec3 c=texture2D(t,vec2(uv.x,uv.y*.5)).rgb;float a=texture2D(t,vec2(uv.x,.5+uv.y*.5)).r;gl_FragColor=vec4(c,a);}"),
    );
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    let alive = true;
    const draw = () => {
        if (!alive || !canvas.isConnected) return;
        if (src.readyState >= 2) {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, src);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        requestAnimationFrame(draw);
    };
    video.querySelector("source")?.remove();
    video.load();
    src.addEventListener(
        "playing",
        () => {
            video.replaceWith(canvas);
            draw();
        },
        { once: true },
    );
    src.play().catch(() => (alive = false));
}

// ── Carga ──────────────────────────────────────────────────────────────────────
export async function runIntro() {
    const root = document.documentElement;
    const overlay = $("[data-carga]");
    const hasCarga = root.classList.contains("carga") && overlay;
    if (!root.classList.contains("hero-anim") && !hasCarga) return;
    root.setAttribute("data-intro-running", "");

    if (window.scrollY > 0) {
        root.classList.remove("carga", "hero-anim");
        return;
    }
    if (!hasCarga) {
        await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]);
        runHeroText();
        return;
    }
    try {
        sessionStorage.setItem("midaz-intro", "1");
    } catch {}

    const video = $<HTMLVideoElement>("[data-carga-video]", overlay)!;
    playHermez(video);
    // Las fuentes (Poppins del porcentaje) y el primer cuadro del video, máx. 0,5 s.
    await Promise.race([
        Promise.all([document.fonts.ready, new Promise((r) => (video.readyState >= 2 ? r(0) : video.addEventListener("loadeddata", r, { once: true })))]),
        new Promise((r) => setTimeout(r, 500)),
    ]);
    root.classList.add("carga-lista");

    // Lienzo de 1280×800 escalado a la altura de la ventana y centrado.
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const s = vh / 800;
    const stage = $("[data-carga-stage]", overlay)!;
    stage.style.transform = `translateX(-50%) scale(${s})`;
    const toView = (x: number, y: number) => [vw / 2 + (x - 640) * s, y * s];

    // Destinos reales en la página: la laptop del hero y el logo del menú.
    const heroLaptop = $("[data-hero-laptop]")!;
    const box = heroLaptop.parentElement!.getBoundingClientRect();
    const macEnd = [box.left + heroLaptop.offsetLeft, box.top + heroLaptop.offsetTop];
    const navLogo = $("header nav a img")!.getBoundingClientRect();

    const anims: Animation[] = [];
    const run = (el: Element | null, frames: Keyframe[]) => {
        if (!el) return;
        anims.push(el.animate(frames, { duration: DURATION, fill: "both" }));
    };
    const [p1, p2, p3, p4, p5] = PHASE_AT;
    const seg = ([at, dur, ease]: [number, number, string], from: Keyframe, to: Keyframe): [number, Keyframe, string?][] => [
        [at, from, ease],
        [at + dur, to],
    ];

    // Hermez camina sobre la barra y en la fase 1 sale por la derecha (x 779 → 1340); en la 2 desaparece.
    const hx = [-465, -465, -353.4, -223.2, -116.25, -116.25, -13.95, 0].map((x) => ({ transform: `translateX(${x}px)` }));
    run($("[data-carga-hermez]", overlay), loadTrack(hx, seg(p1, hx[7], { transform: "translateX(561px)" })));
    run($("[data-carga-hermez]", overlay), track([[0, { opacity: 1 }], ...seg(p2, { opacity: 1 }, { opacity: 0 }), [TOTAL, { opacity: 0 }]]));

    // Barra: crece desde la izquierda; en la fase 1 se encoge a 40 px en el centro y se apaga.
    const shrink: Keyframe = { transform: "translateX(260px) scaleX(0.0714286)", opacity: 0 };
    const bar = [0.001, 0.001, 0.24, 0.52, 0.75, 0.75, 0.97, 1].map((k) => ({ transform: `translateX(0px) scaleX(${k})`, opacity: 1 }));
    run($("[data-carga-bar]", overlay), loadTrack(bar, seg(p1, bar[7], shrink)));
    run($("[data-carga-track]", overlay), track([[0, { transform: "translateX(0px) scaleX(1)", opacity: 1 }], ...seg(p1, { transform: "translateX(0px) scaleX(1)", opacity: 1 }, shrink), [TOTAL, shrink]]));

    // Isotipo iluminado: se revela de abajo hacia arriba al ritmo de la barra.
    const reveal = [100, 100, 76, 48, 25, 25, 3, 0].map((p) => ({ clipPath: `inset(${p}% 0 0 0)` }));
    run($("[data-carga-reveal]", overlay), loadTrack(reveal));

    // Porcentajes y leyenda: cada valor aparece y se va con la curva del Figma.
    const fade = (el: Element | null, pts: [number, number, boolean?][]) =>
        run(el, track([...pts.map(([t, o, eased]) => [t, { opacity: o }, eased ? CROSS : undefined] as [number, Keyframe, string?]), [TOTAL, { opacity: pts[pts.length - 1][1] }]]));
    fade($('[data-carga-pct="0"]', overlay), [[0, 1], [1000, 1, true], [1600, 0]]);
    fade($('[data-carga-pct="24"]', overlay), [[0, 0], [1550, 0, true], [2100, 1], [2110, 1, true], [2705, 0]]);
    fade($('[data-carga-pct="52"]', overlay), [[0, 0], [2700, 0, true], [3300, 1], [3310, 1, true], [3730, 0]]);
    fade($('[data-carga-pct="75"]', overlay), [[0, 0], [3725, 0, true], [4150, 1], [4350, 1, true], [4625, 0]]);
    fade($('[data-carga-pct="97"]', overlay), [[0, 0], [4625, 0, true], [4900, 1], [4910, 1, true], [4965, 0]]);
    fade($('[data-carga-pct="100"]', overlay), [[0, 0], [4900, 0, true], [5020, 1]]);
    fade($('[data-carga-ley="0"]', overlay), [[0, 1], [4900, 1, true], [5100, 0]]);
    fade($('[data-carga-ley="1"]', overlay), [[0, 0], [4950, 0, true], [5150, 1]]);
    // Fase 1: los textos suben 24 px y se apagan.
    run($("[data-carga-texts]", overlay), track([[0, { transform: "translateY(0px)", opacity: 1 }], ...seg(p1, { transform: "translateY(0px)", opacity: 1 }, { transform: "translateY(-24px)", opacity: 0 }), [TOTAL, { transform: "translateY(-24px)", opacity: 0 }]]));

    // Isotipo: zoom ×2,4 (fase 2) y ×5,28 (fase 3) mientras se desvanece.
    const iso0: Keyframe = { transform: "translateY(0px) scale(1)" };
    const iso2: Keyframe = { transform: "translateY(-56px) scale(2.4)" };
    const iso3: Keyframe = { transform: "translateY(-171.2px) scale(5.28)" };
    run($("[data-carga-iso]", overlay), track([[0, iso0], ...seg(p2, iso0, iso2), ...seg(p3, iso2, iso3), [TOTAL, iso3]]));
    run($("[data-carga-base]", overlay), track([[0, { opacity: 0.3 }], ...seg(p2, { opacity: 0.3 }, { opacity: 0.18 }), ...seg(p3, { opacity: 0.18 }, { opacity: 0 }), [TOTAL, { opacity: 0 }]]));
    run(
        $("[data-carga-reveal]", overlay),
        track([[0, { opacity: 0.35 }], ...seg(p1, { opacity: 0.35 }, { opacity: 0.6 }), ...seg(p2, { opacity: 0.6 }, { opacity: 0.35 }), ...seg(p3, { opacity: 0.35 }, { opacity: 0 }), [TOTAL, { opacity: 0 }]]),
    );

    // Laptop: aparece en el centro (fase 2), se acerca girando 8° (fase 3) y aterriza en el hero (fase 4).
    const mac = (x: number, y: number, w: number, rot: number, o = 1): Keyframe => {
        const [vx, vy] = toView(x, y);
        return { transform: `translate(${vx}px,${vy}px) rotate(${rot}deg) scale(${(w * s) / 673.6})`, opacity: o };
    };
    const m0 = mac(539, 408.6, 202.1, 0, 0);
    const m2 = mac(512, 392.2, 256, 0);
    const m3 = mac(379.3, 367.8, 485, -8);
    const m4: Keyframe = { transform: `translate(${macEnd[0]}px,${macEnd[1]}px) rotate(-16.25deg) scale(1)`, opacity: 1 };
    run($("[data-carga-mac]", overlay), track([[0, m0], ...seg(p2, m0, m2), ...seg(p3, m2, m3), ...seg(p4, m3, m4), [TOTAL, m4]]));

    // Logo: aparece arriba al centro (fase 3) y se va a su lugar en el menú (fase 4).
    const logo = (x: number, y: number, w: number, o = 1): Keyframe => {
        const [vx, vy] = toView(x, y);
        return { transform: `translate(${vx}px,${vy}px) scale(${(w * s) / 128})`, opacity: o };
    };
    const l0 = logo(563.2, 130, 153.6, 0);
    const l3 = logo(544, 90, 192);
    const l4: Keyframe = { transform: `translate(${navLogo.left}px,${navLogo.top}px) scale(${navLogo.width / 128})`, opacity: 1 };
    run($("[data-carga-logo]", overlay), track([[0, l0], ...seg(p3, l0, l3), ...seg(p4, l3, l4), [TOTAL, l4]]));

    // Fondo: del degradado del loader al gris claro de la landing (fase 4); al final se disuelve todo.
    run($("[data-carga-flat]", overlay), track([[0, { opacity: 0 }], ...seg(p4, { opacity: 0 }, { opacity: 1 }), [TOTAL, { opacity: 1 }]]));
    run(overlay, track([[0, { opacity: 1 }], ...seg(p5, { opacity: 1 }, { opacity: 0 }), [TOTAL, { opacity: 0 }]]));

    // El titular empieza a escribirse cuando la landing aparece.
    const textTimer = setTimeout(runHeroText, p5[0] * SPEED);

    const finish = () => {
        root.classList.remove("carga", "carga-lista");
        root.removeAttribute("data-intro-running");
        overlay.remove();
    };
    // Cualquier gesto del usuario salta la carga.
    const skip = () => {
        clearTimeout(textTimer);
        anims.forEach((a) => a.finish());
        runHeroText();
    };
    const opts = { once: true, passive: true } as const;
    ["wheel", "touchstart", "keydown", "pointerdown"].forEach((ev) => window.addEventListener(ev, skip, opts));
    await Promise.all(anims.map((a) => a.finished.catch(() => {})));
    ["wheel", "touchstart", "keydown", "pointerdown"].forEach((ev) => window.removeEventListener(ev, skip));
    finish();
}
