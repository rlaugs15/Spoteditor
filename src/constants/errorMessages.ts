export const ERROR_MESSAGES = {
  COMMON: {
    INTERNAL_SERVER_ERROR: '서버 내부 오류가 발생했습니다.',
    EMPTY_RESULT: '조회 결과가 없습니다.',
    UNAUTHORIZED: '로그인이 필요합니다.',
    FORBIDDEN: '접근 권한이 없습니다.',
    BAD_REQUEST: '잘못된 요청입니다.',
  },
  LOG: {
    NOT_FOUND: '해당 로그가 존재하지 않습니다.',
    LIST_EMPTY: '조회 가능한 로그들이 존재하지 않습니다.',
    CREATE_FAILED: '로그 생성에 실패했습니다.',
    DELETE_FAILED: '로그 삭제에 실패했습니다.',
    MISSING_ID: 'logId가 누락되었습니다.',
  },
  PLACE: {
    NOT_FOUND: '해당 장소가 존재하지 않습니다.',
    LIST_EMPTY: '조회 가능한 장소가 존재하지 않습니다.',
    CREATE_FAILED: '장소 생성에 실패했습니다.',
    DELETE_FAILED: '장소 삭제에 실패했습니다.',
  },
  FOLLOW: {
    NOT_FOUND: '해당 팔로워가 존재하지 않습니다.',
    LIST_EMPTY: '조회 가능한 팔로워가 존재하지 않습니다.',
    CREATE_FAILED: '팔로우에 실패했습니다.',
    DELETE_FAILED: '팔로우에 실패했습니다.',
  },
  USER: {
    NOT_FOUND: '사용자 정보를 찾을 수 없습니다.',
    DELETE_FAILED: '회원 탈퇴에 실패했습니다.',
    DELETE_SUCCESS: '계정 삭제가 완료되었습니다.',
    ALREADY_DELETED: '삭제할 유저가 존재하지 않거나 이미 삭제되었습니다.',
  },
  SEARCH: {
    FAILED: '검색 결과 조회에 실패했습니다.',
    EMPTY: '검색 결과가 없습니다.',
  },
};
