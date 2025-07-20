/*data 속성으로 요소를 스크롤  */
export const scrollToElement = (
  dataAttribute: string,
  value: string | number,
  options: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'center',
  }
) => {
  setTimeout(() => {
    const element = document.querySelector(`[${dataAttribute}="${value}"]`);
    element?.scrollIntoView(options);
  }, 100);
};

/* 장소 순서 변경 후 해당 장소로 스크롤하는 유틸 함수 */
export const scrollToPlaceAfterReorder = (globalIdx: number, direction: 'up' | 'down') => {
  const targetIdx = direction === 'up' ? globalIdx - 1 : globalIdx + 1;
  scrollToElement('data-place-index', targetIdx);
};
