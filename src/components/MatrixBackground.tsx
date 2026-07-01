import { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  /**
   * 'fixed'   - covers the full viewport, pinned behind the whole page (default).
   * 'section' - fills its positioned parent instead (e.g. a section with
   *             `relative overflow-hidden`), so it can sit above that
   *             section's own background but below its content.
   */
  mode?: 'fixed' | 'section';
  opacity?: number;
}

export function MatrixBackground({ mode = 'fixed', opacity }: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getSize = (): [number, number] => {
      if (mode === 'section' && canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        return [rect.width, rect.height];
      }
      return [window.innerWidth, window.innerHeight];
    };

    let [width, height] = getSize();
    canvas.width = width;
    canvas.height = height;

    const chars = '{}[]()<>/\\|_-+=*&^%$#@!~`.,;:?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charArray = chars.split('');

    const fontSize = 14;
    let columns = canvas.width / fontSize;

    let drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function draw() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF88';
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 100);

    const handleResize = () => {
      [width, height] = getSize();
      canvas.width = width;
      canvas.height = height;
      columns = canvas.width / fontSize;
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [mode]);

  const fixedStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
    opacity: opacity ?? 0.03,
  };

  const sectionStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    opacity: opacity ?? 0.08,
  };

  return (
    <canvas
      ref={canvasRef}
      className={mode === 'section' ? 'w-full h-full' : 'matrix-bg'}
      style={mode === 'section' ? sectionStyle : fixedStyle}
    />
  );
}
