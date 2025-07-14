// Google Analytics 이벤트 추적 유틸리티

declare global {
  interface Window {
    gtag: (
      command: 'event',
      eventName: string,
      parameters?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
      }
    ) => void;
  }
}

const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

/**
 * GA 이벤트를 전송하는 함수
 * @param eventName 이벤트 이름 (예: 'login_click', 'bookmark_click')
 * @param parameters 추가 파라미터
 */
export const trackEvent = (
  eventName: string,
  parameters?: {
    event_category?: string;
    event_label?: string;
    value?: number; // 수치적 가치 (높을수록 중요)
    [key: string]: any;
  }
) => {
  // 배포 환경에서만 이벤트 추적 실행
  if (!isProduction()) {
    return;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'user_interaction',
      ...parameters,
    });
  }
};

/**
 * 로그인 관련 이벤트 추적
 */
export const trackLoginEvent = (method: 'header' | 'google' | 'kakao') => {
  trackEvent('login_click', {
    event_category: 'authentication',
    event_label: `${method}_login_button`,
    value: 1,
  });
};

/**
 * 북마크 관련 이벤트 추적
 */
export const trackBookmarkEvent = (type: 'log' | 'place', action: 'add' | 'remove') => {
  trackEvent('bookmark_click', {
    event_category: 'engagement',
    event_label: `${type}_bookmark_${action}`,
    value: 1,
  });
};

/**
 * 로그 등록
 */
export const trackLogCreateEvent = (action: 'start' | 'complete' | 'cancel') => {
  trackEvent('log_create', {
    event_category: 'content_creation',
    event_label: `log_create_${action}`,
    value: action === 'complete' ? 5 : 1, // 완료는 높은 가치
  });
};

/**
 * 로그 수정
 */
export const trackLogEditEvent = (action: 'start' | 'complete' | 'cancel') => {
  trackEvent('log_edit', {
    event_category: 'content_creation',
    event_label: `log_edit_${action}`,
    value: action === 'complete' ? 3 : 1, // 완료는 높은 가치
  });
};

/**
 * 검색
 */
export const trackPlaceSearchEvent = (method: 'keyword' | 'city' | 'sigungu', keyword?: string) => {
  trackEvent('place_search', {
    event_category: 'search',
    event_label: `${method}_search`,
    value: 1,
    search_term: keyword || '',
  });
};

/**
 * 페이지뷰 이벤트 추적
 */
export const trackPageView = (pagePath: string) => {
  trackEvent('page_view', {
    event_category: 'navigation',
    event_label: pagePath,
    value: 1,
  });
};
