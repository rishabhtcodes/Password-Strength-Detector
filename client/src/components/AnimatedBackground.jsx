import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Characters for the hacker text (Katakana + Latin + Digits)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+~`|}{[]:;?><,./-=";
    const charArray = chars.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Start drops randomly off-screen above
    }

    const draw = () => {
      // Semi-transparent black to create trailing effect
      // Always use dark color so it looks like a terminal even in light mode
      ctx.fillStyle = "rgba(3, 6, 10, 0.1)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff88"; // The green neon text
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // x and y coordinates
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    let animationFrameId;
    // Cap framerate for the specific matrix look (~33ms per frame = ~30fps)
    let lastTime = 0;
    const renderLoop = (time) => {
        if (time - lastTime > 33) {
            draw();
            lastTime = time;
        }
        animationFrameId = requestAnimationFrame(renderLoop);
    }
    
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-40 pointer-events-none"
      aria-hidden="true"
    />
  );
}
