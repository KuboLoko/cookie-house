"use client";

import { useEffect, useRef } from "react";
import type MatterNS from "matter-js";

type Matter = typeof MatterNS;

const COLORS = ["#c98a3d", "#8a5a34", "#2a1710", "#f4e9d6", "#a8683a"];

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Monte de migalhas estático (mesma semente no servidor e no cliente: sem diferenças de hidratação).
// É o que se vê com prefers-reduced-motion, sem JS, ou enquanto o matter-js não carrega.
const STATIC_CRUMBS = (() => {
  const rnd = mulberry32(7);
  return Array.from({ length: 74 }, () => {
    const cx = rnd() * 1200;
    const cy = 112 - Math.pow(rnd(), 1.7) * 56;
    const r = 4 + rnd() * 8;
    const n = 5 + Math.floor(rnd() * 3);
    const rot = rnd() * Math.PI;
    const points = Array.from({ length: n }, (_, i) => {
      const a = rot + (i / n) * Math.PI * 2;
      const rr = r * (0.75 + rnd() * 0.35);
      return `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`;
    }).join(" ");
    return { points, fill: COLORS[Math.floor(rnd() * COLORS.length)] };
  });
})();

/**
 * Física das migalhas. Corre só quando o rodapé está perto do ecrã, com o matter-js carregado sob demanda.
 * - O loop pára sozinho quando todas as migalhas adormecem (zero trabalho em repouso).
 * - Arrastar com o rato só em ponteiros finos; em toque não há listeners no canvas (o scroll nunca é bloqueado).
 */
function runPhysics(
  Matter: Matter,
  wrap: HTMLElement,
  canvas: HTMLCanvasElement,
  draggable: boolean,
) {
  const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint, Events, Query } =
    Matter;
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const small = window.innerWidth < 768;
  const TOTAL = small ? 26 : 56;
  const STEP = 1000 / 60;

  const engine = Engine.create({ enableSleeping: true });
  engine.gravity.y = 1;

  let w = 0;
  let h = 0;
  let walls: MatterNS.Body[] = [];
  const crumbs: MatterNS.Body[] = [];
  let spawned = 0;
  let lastSpawn = 0;
  let raf = 0;
  let running = false;
  let last = 0;
  let acc = 0;
  let dragging = false;
  let grace = 0; // frames de margem depois de acordar, para o matter processar o clique

  const color = (b: MatterNS.Body) => (b.plugin as { color: string }).color;

  const draw = () => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineJoin = "round";
    for (const b of crumbs) {
      const v = b.vertices;
      ctx.beginPath();
      ctx.moveTo(v[0].x, v[0].y);
      for (let i = 1; i < v.length; i++) ctx.lineTo(v[i].x, v[i].y);
      ctx.closePath();
      ctx.fillStyle = color(b);
      ctx.fill();
    }
  };

  const buildWalls = () => {
    Composite.remove(engine.world, walls);
    const T = 200;
    const o = { isStatic: true, friction: 0.6, restitution: 0.2 };
    walls = [
      Bodies.rectangle(w / 2, h + T / 2 - 4, w + T * 2, T, o), // chão
      Bodies.rectangle(-T / 2, h / 2, T, h * 4, o),
      Bodies.rectangle(w + T / 2, h / 2, T, h * 4, o),
    ];
    Composite.add(engine.world, walls);
  };

  const spawn = () => {
    const r = (small ? 4.5 : 5) + Math.random() * (small ? 5 : 7);
    const b = Bodies.polygon(
      12 + Math.random() * Math.max(w - 24, 1),
      -20 - Math.random() * 120,
      5 + Math.floor(Math.random() * 3),
      r,
      {
        restitution: 0.28,
        friction: 0.55,
        frictionAir: 0.012,
        density: 0.0015,
        sleepThreshold: 45,
        chamfer: { radius: r * 0.3 },
      },
    );
    Body.setAngle(b, Math.random() * Math.PI);
    Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.2);
    b.plugin = { color: COLORS[Math.floor(Math.random() * COLORS.length)] };
    crumbs.push(b);
    Composite.add(engine.world, b);
  };

  const frame = (now: number) => {
    if (spawned < TOTAL && now - lastSpawn > 40) {
      spawn();
      spawned++;
      lastSpawn = now;
    }
    acc += Math.min(now - last, 50);
    last = now;
    let steps = 0;
    while (acc >= STEP && steps < 3) {
      Engine.update(engine, STEP);
      acc -= STEP;
      steps++;
    }
    draw();
    if (grace > 0) grace--;
    const busy =
      spawned < TOTAL ||
      dragging ||
      grace > 0 ||
      crumbs.some((b) => !b.isSleeping);
    if (busy) raf = requestAnimationFrame(frame);
    else running = false;
  };

  const kick = () => {
    grace = 20; // ~330ms: o MouseConstraint só deteta o arrasto dentro do Engine.update
    if (running) return;
    running = true;
    last = performance.now();
    acc = STEP; // um passo já no primeiro frame
    raf = requestAnimationFrame(frame);
  };

  const resize = () => {
    const r = wrap.getBoundingClientRect();
    w = r.width;
    h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    buildWalls();
    for (const b of crumbs) {
      if (b.position.x > w - 8 || b.position.y > h - 6) {
        Body.setPosition(b, {
          x: Math.min(b.position.x, w - 12),
          y: Math.min(b.position.y, h - 30),
        });
        Matter.Sleeping.set(b, false);
      }
    }
    draw();
    kick();
  };

  const ro = new ResizeObserver(resize);
  ro.observe(wrap);
  resize();

  let teardownMouse = () => {};
  if (draggable) {
    const mouse = Mouse.create(canvas);
    mouse.pixelRatio = dpr;
    // O matter-js faz preventDefault em wheel/touch: isso travaria o scroll por cima do rodapé.
    const m = mouse as unknown as Record<string, EventListener>;
    canvas.removeEventListener("wheel", m.mousewheel);
    canvas.removeEventListener("mousewheel", m.mousewheel);
    canvas.removeEventListener("DOMMouseScroll", m.mousewheel);
    canvas.removeEventListener("touchmove", m.mousemove);
    canvas.removeEventListener("touchstart", m.mousedown);
    canvas.removeEventListener("touchend", m.mouseup);

    const mc = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.22, render: { visible: false } },
    });
    Composite.add(engine.world, mc);
    Events.on(mc, "startdrag", () => {
      dragging = true;
      canvas.style.cursor = "grabbing";
      kick();
    });
    Events.on(mc, "enddrag", () => {
      dragging = false;
      canvas.style.cursor = "";
      kick();
    });
    const onMove = () => {
      if (dragging) return;
      canvas.style.cursor =
        Query.point(crumbs, mouse.position).length > 0 ? "grab" : "";
    };
    canvas.addEventListener("mousemove", onMove, { passive: true });
    // O matter só deteta o arrasto dentro do Engine.update: com o loop parado (tudo adormecido)
    // é preciso acordá-lo ao carregar/largar, senão o clique nunca chega a agarrar nada.
    canvas.addEventListener("mousedown", kick, { passive: true });
    canvas.addEventListener("mouseup", kick, { passive: true });
    canvas.style.pointerEvents = "auto";
    teardownMouse = () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mousedown", kick);
      canvas.removeEventListener("mouseup", kick);
      canvas.removeEventListener("mousemove", m.mousemove);
      canvas.removeEventListener("mousedown", m.mousedown);
      canvas.removeEventListener("mouseup", m.mouseup);
      Events.off(mc, "startdrag");
      Events.off(mc, "enddrag");
      canvas.style.pointerEvents = "";
      canvas.style.cursor = "";
    };
  }

  return () => {
    cancelAnimationFrame(raf);
    running = false;
    ro.disconnect();
    teardownMouse();
    Composite.clear(engine.world, false);
    Engine.clear(engine);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}

export default function FooterCrumbs() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let stop: (() => void) | null = null;
    let loading = false;
    let visible = false;
    let disposed = false;

    const boot = async () => {
      if (stop || loading || reduce.matches) return;
      loading = true;
      const mod = await import("matter-js");
      loading = false;
      if (disposed || stop || reduce.matches) return;
      const Matter = ((mod as unknown as { default?: Matter }).default ??
        mod) as Matter;
      stop = runPhysics(Matter, wrap, canvas, fine.matches);
      wrap.dataset.physics = "on";
    };
    const teardown = () => {
      stop?.();
      stop = null;
      wrap.dataset.physics = "off";
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) void boot();
      },
      { rootMargin: "250px" },
    );
    io.observe(wrap);

    const onReduce = () => {
      if (reduce.matches) teardown();
      else if (visible) void boot();
    };
    reduce.addEventListener("change", onReduce);

    return () => {
      disposed = true;
      io.disconnect();
      reduce.removeEventListener("change", onReduce);
      teardown();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      data-physics="off"
      aria-hidden
      className="crumbs pointer-events-none absolute inset-0 z-10"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="xMidYMax slice"
        className="crumbs-static absolute inset-x-0 bottom-0 h-28 w-full"
      >
        {STATIC_CRUMBS.map((c, i) => (
          <polygon key={i} points={c.points} fill={c.fill} />
        ))}
      </svg>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
