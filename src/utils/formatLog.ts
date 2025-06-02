/* 중첩객체 -> formData */
export function createFormData(
  object: Record<string, any>,
  form?: FormData,
  namespace?: string
): FormData {
  const formData = form || new FormData();
  for (const property in object) {
    if (!object.hasOwnProperty(property) || !object[property]) continue;

    const value = object[property];
    const formKey = namespace ? `${namespace}[${property}]` : property;

    if (value instanceof Blob) formData.append(formKey, value); // 파일(이미지를 미리 압축해서 Blob)
    else if (typeof value === 'object') createFormData(value, formData, formKey); // 객체 (재귀)
    else formData.append(formKey, object[property]); // 기본 타입
  }

  return formData;
}

/* formData -> 중첩객체 */
export function parseFormData<T = Record<string, any>>(formData: FormData): T {
  const result: Record<string, any> = {};

  for (const [fullKey, value] of formData.entries()) {
    const keys = fullKey
      .replace(/\]/g, '') // ] 제거
      .split('['); // [ 로 나누기

    let current = result;

    keys.forEach((key, idx) => {
      const isLast = idx === keys.length - 1;
      const nextKey = keys[idx + 1];
      const isNextArray = /^\d+$/.test(nextKey);

      // 마지막 키면 값 넣기
      if (isLast) {
        current[key] = value;
        return;
      }

      // 중간 구조 생성 (배열 or 객체)
      if (!(key in current)) {
        current[key] = isNextArray ? [] : {};
      }

      current = current[key];
    });
  }

  return result as T;
}
