import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor FPS
    let fps = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        // Log performance warnings
        if (fps < 30) {
          console.warn(`Low FPS detected: ${fps}fps`);
        }
      }
      
      requestAnimationFrame(measureFPS);
    };

    // Start FPS monitoring in development
    if (process.env.NODE_ENV === 'development') {
      measureFPS();
    }

    // Monitor memory usage
    const monitorMemory = () => {
      if (performance.memory) {
        const memory = performance.memory;
        const memoryInfo = {
          used: Math.round(memory.usedJSHeapSize / 1048576),
          total: Math.round(memory.totalJSHeapSize / 1048576),
          limit: Math.round(memory.jsHeapSizeLimit / 1048576)
        };
        
        // Warn if memory usage is high
        if (memoryInfo.used > memoryInfo.limit * 0.8) {
          console.warn('High memory usage detected:', memoryInfo);
        }
      }
    };

    // Monitor memory every 10 seconds in development
    const memoryInterval = process.env.NODE_ENV === 'development' 
      ? setInterval(monitorMemory, 10000) 
      : null;

    return () => {
      if (memoryInterval) {
        clearInterval(memoryInterval);
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;