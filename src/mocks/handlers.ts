import { http, HttpResponse } from 'msw';

export const mockFollowers: {
  user_id: string;
  nickname: string;
  image_url: string;
}[] = Array.from({ length: 42 }).map((_, i) => {
  const id = i + 1;
  return {
    user_id: id.toString(),
    nickname: `팔로워${id}`,
    image_url: '',
  };
});

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
];
