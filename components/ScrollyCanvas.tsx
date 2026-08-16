"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

// ─── Frame configuration ────────────────────────────────────────────────────
const TOTAL_FRAMES = 47;
const FRAME_HEIGHT_VH = 500;

function getFramePath(index: number): string {
  const padded = String(index).padStart(2, "0");
  return `/sequence/frame_${padded}_delay-0.062s.png`;
}

// ─── Cover logic (mirrors CSS object-fit: cover) ─────────────────────────────
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;

  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

  if (imgRatio > canvasRatio) {
    sw = img.naturalHeight * canvasRatio;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / canvasRatio;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const loadedCountRef = useRef(0);
  const isReadyRef = useRef(false);

  // Track scroll within the scrolly container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map 0→1 scroll to 0→(TOTAL_FRAMES-1) frame index
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  // ── Render a specific frame on canvas ──────────────────────────────────────
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || !isReadyRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawImageCover(ctx, img, canvas.width, canvas.height);
  }, []);

  // ── Smooth render via rAF ─────────────────────────────────────────────────
  const scheduleRender = useCallback((index: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      renderFrame(index);
    });
  }, [renderFrame]);

  // ── React to scroll changes ───────────────────────────────────────────────
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.round(Math.max(0, Math.min(TOTAL_FRAMES - 1, latest)));
    if (idx !== currentFrameRef.current) {
      currentFrameRef.current = idx;
      scheduleRender(idx);
    }
  });

  // ── Preload all images ────────────────────────────────────────────────────
  useEffect(() => {
    imagesRef.current = [];
    loadedCountRef.current = 0;
    isReadyRef.current = false;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCountRef.current++;
        // Once first frame loads, render it immediately so canvas isn't blank
        if (loadedCountRef.current === 1) {
          isReadyRef.current = true;
          renderFrame(0);
        }
        if (loadedCountRef.current === TOTAL_FRAMES) {
          // Re-render at current frame with full quality
          renderFrame(currentFrameRef.current);
        }
      };
      imagesRef.current[i] = img;
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [renderFrame]);

  // ── Resize handler – keep canvas pixel-perfect ───────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [renderFrame]);

  return (
    <div
      ref={containerRef}
      id="scrolly-container"
      style={{ height: `${FRAME_HEIGHT_VH}vh` }}
      className="relative w-full"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          id="scrolly-canvas"
          className="absolute inset-0 w-full h-full"
          style={{ display: "block" }}
        />

        {/* Subtle vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.6) 100%)",
          }}
        />

        {/* Bottom fade into sections below */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #0a0a0a)",
          }}
        />
      </div>
    </div>
  );
}
