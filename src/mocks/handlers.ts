import { http, HttpResponse } from 'msw';

const mockFollowers: {
  user_id: string;
  nickname: string;
  image_url: string;
}[] = Array.from({ length: 42 }).map((_, i) => {
  const id = i + 1;
  return {
    user_id: id.toString(),
    nickname: `팔로워${id}`,
    image_url: '/profile/user-default-avatar.webp',
  };
});

/* type LogWithUser = {
    created_at: string;
    description: string | null;
    log_id: string;
    thumbnail_url: string | null;
    title: string | null;
    user_id: string | null;
} & {
    users: User;
} */

const mockLogsBookmarks = (currentPage: number = 1, pageSize: number = 10) => {
  const totalPages = 20;
  const data = Array.from({ length: pageSize }).map((_, idx) => {
    const id = (currentPage - 1) * pageSize + idx + 1;
    return {
      log_id: id.toString(),
      user_id: `user_${id}`,
      created_at: new Date().toISOString(),
      title: `로그 제목 ${id}`,
      description: `로그 설명 ${id}`,
      thumbnail_url: `/profile/user-default-avatar.webp`,
      users: {
        nickname: '네임임',
        image_url: '/profile/user-default-avatar.webp',
      },
      address: {
        city: '시티',
        country: '컨츄리리',
        sigungu: '시군구',
      },
    };
  });

  return {
    data,
    meta: {
      pagination: {
        currentPage,
        pageSize,
        totalPages,
      },
      httpStatus: 200,
    },
  };
};

export const handlers = [
  // follower 리스트 핸들러
  http.get('/api/v1/followings', ({ request }) => {
    if (!request.url) {
      return HttpResponse.json({ success: false, msg: '잘못된 요청입니다.' }, { status: 400 });
    }

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const currentPage = parseInt(url.searchParams.get('currentPage') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');

    if (!userId) {
      return HttpResponse.json({ success: false, msg: '유저id가 필요합니다.' }, { status: 400 });
    }

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageFollowers = mockFollowers.slice(start, end);

    return HttpResponse.json({
      success: true,
      data: pageFollowers,
      meta: {
        pagination: {
          currentPage,
          pageSize,
          totalPages: Math.ceil(mockFollowers.length / pageSize),
          totalItems: mockFollowers.length,
        },
        httpStatus: 200,
      },
    });
  }),

  http.get('/api/v1/logs/bookmark', ({ request }) => {
    if (!request.url) {
      return HttpResponse.json({ success: false, msg: '잘못된 요청입니다.' }, { status: 400 });
    }

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const currentPage = parseInt(url.searchParams.get('currentPage') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');

    if (!userId) {
      return HttpResponse.json({ success: false, msg: '유저id가 필요합니다.' }, { status: 400 });
    }
    return HttpResponse.json(mockLogsBookmarks(currentPage, pageSize));
  }),
];
