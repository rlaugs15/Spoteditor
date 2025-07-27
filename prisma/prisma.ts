import { PrismaClient } from '@prisma/client';

declare global {
  // `var` 키워드를 사용하여 전역 스코프에 변수를 선언합니다.
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

// 프로덕션 환경에서는 새로운 PrismaClient 인스턴스를 생성
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // 개발 환경에서는 전역 변수를 사용하여 기존 인스턴스가 있으면 재사용
  // 핫 리로딩 시 PrismaClient 인스턴스가 계속 생성되는 것을 방지
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
