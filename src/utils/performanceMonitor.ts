// 성능 모니터링 유틸리티
export const performanceMonitor = {
  startTime: 0,
  start(label: string) {
    this.startTime = performance.now();
    console.time(`🚀 ${label}`);
  },
  end(label: string) {
    const duration = performance.now() - this.startTime;
    console.timeEnd(`🚀 ${label}`);
    console.log(`📊 ${label} 소요시간: ${duration.toFixed(2)}ms`);
    return duration;
  },
};
