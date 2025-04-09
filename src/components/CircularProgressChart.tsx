
import { useEffect, useRef } from 'react';

interface CircularProgressChartProps {
  completed: number;
  skipped: number;
  pending: number;
}

const CircularProgressChart = ({ completed, skipped, pending }: CircularProgressChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions with pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const size = 140 * dpr;
    canvas.width = size;
    canvas.height = size;
    canvas.style.width = '140px';
    canvas.style.height = '140px';
    
    // Scale all drawing operations
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, 140, 140);
    
    const centerX = 70;
    const centerY = 70;
    const radius = 60;
    
    // Function to draw arc segment
    const drawSegment = (startAngle: number, endAngle: number, color: string) => {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };
    
    // Calculate angles based on percentages
    const completedRadians = (completed / 100) * 2 * Math.PI;
    const skippedRadians = (skipped / 100) * 2 * Math.PI;
    const pendingRadians = (pending / 100) * 2 * Math.PI;
    
    // Draw segments
    drawSegment(0, completedRadians, '#10b981'); // Completed - emerald-500
    drawSegment(completedRadians, completedRadians + skippedRadians, '#f59e0b'); // Skipped - amber-500
    drawSegment(completedRadians + skippedRadians, 2 * Math.PI, '#3b82f6'); // Pending - blue-500
    
    // Draw inner circle (white hole)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // Draw percentage text
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.fillStyle = '#1f2937'; // gray-800
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${Math.round(completed)}%`, centerX, centerY);
    
  }, [completed, skipped, pending]);

  return (
    <canvas ref={canvasRef} className="w-[140px] h-[140px]"></canvas>
  );
};

export default CircularProgressChart;
