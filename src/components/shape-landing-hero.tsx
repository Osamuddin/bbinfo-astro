import React from 'react';

interface ShapeConfig {
  width: number;
  height: number;
  top: string;
  left: string;
  rotate: number;
  delay: number;
}

const shapes: ShapeConfig[] = [
  { width: 600, height: 140, top: '12%',  left: '-8%',  rotate: -15, delay: 0.2 },
  { width: 500, height: 120, top: '68%',  left: '55%',  rotate:  15, delay: 0.4 },
  { width: 320, height:  80, top: '38%',  left: '72%',  rotate: -10, delay: 0.6 },
  { width: 200, height:  60, top: '58%',  left: '2%',   rotate:  20, delay: 0.8 },
  { width: 420, height: 100, top: '22%',  left: '38%',  rotate:  -5, delay: 1.0 },
];

export function ElegantShape() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <div className="bg-blur-gradient" />

      {shapes.map((shape, i) => (
        <div
          key={i}
          className="shape-wrapper"
          style={
            {
              width: shape.width,
              height: shape.height,
              top: shape.top,
              left: shape.left,
              '--rot-start': `${shape.rotate - 8}deg`,
              '--rot-end': `${shape.rotate}deg`,
              animationDelay: `${shape.delay}s`,
            } as React.CSSProperties
          }
        >
          <div className="shape-float">
            <div className="shape-content" />
          </div>
        </div>
      ))}
    </div>
  );
}
