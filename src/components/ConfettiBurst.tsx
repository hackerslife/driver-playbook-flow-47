
import React, { useEffect } from "react";

const random = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const ConfettiBurst: React.FC<{ onDone?: () => void }> = ({ onDone }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onDone && onDone();
    }, 1800);
    return () => clearTimeout(timeout);
  }, [onDone]);

  const pieces = Array.from({ length: 48 });

  return (
    <div className="fixed inset-0 pointer-events-none z-[300]">
      <div className="w-full h-full relative">
        {pieces.map((_, i) => {
          const size = random(8, 20);
          const left = random(0, 100);
          const duration = random(0.8, 1.8);
          const colorArr = [
            "#8B5CF6", "#1EAEDB", "#D3E4FD", "#F2FCE2",
            "#FEC6A1", "#33C3F0", "#FFDEE2", "#7E69AB"
          ];
          const color = colorArr[i % colorArr.length];
          const rotate = random(-100, 240);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${left}%`,
                top: "55%",
                width: `${size}px`,
                height: `${size * 0.4}px`,
                background: color,
                borderRadius: "9999px",
                opacity: 0.8,
                transform: `rotate(${rotate}deg)`,
                animation: `confetti-fall ${duration}s linear forwards`
              }}
              className="shadow-md"
            />
          );
        })}
      </div>
      <style>
      {`
      @keyframes confetti-fall {
        0% {
          top: 55%;
          opacity: 0.7;
        }
        90% {
          opacity: 0.9;
        }
        100% {
          top: 100%;
          opacity: 0.0;
        }
      }
      `}
      </style>
    </div>
  );
};

export default ConfettiBurst;
