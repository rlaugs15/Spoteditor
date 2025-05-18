import { useCallback, useEffect, useRef } from 'react';

/**
 * @param fetchNextPage 다음 페이지 데이터를 불러오는 함수
 * @param isFetchingNextPage 현재 데이터를 불러오는 중인지 여부
 * @param offset (선택적) 바닥 감지 여유값 (기본값: 20px)
 * @returns 스크롤을 감지할 ref (이 요소의 스크롤이 바닥에 도달하면 fetchNextPage 실행됨)
 */
export default function useBottomScrollTrigger(
  fetchNextPage: () => void,
  isFetchingNextPage: boolean,
  offset: number = 20
) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  //scrollRef.current가 useEffect 내부에서 변할 가능성이 있으므로 useRef와 useCallback을 활용해 안전하게 등록
  const handleScroll = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;
    const { scrollTop, scrollHeight, clientHeight } = element;

    // 스크롤이 바닥에 도달 && 데이터 로딩 중이 아닐 때 fetchNextPage 호출
    if (scrollTop + clientHeight >= scrollHeight - offset && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetchingNextPage, offset]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    //기존 이벤트 리스너 제거 후 다시 등록 (메모리 누수 방지)
    element.addEventListener('scroll', handleScroll);
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return scrollRef;
}
