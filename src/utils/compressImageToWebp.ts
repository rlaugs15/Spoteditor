/* 
이미지 압축 + webp 변환
*/
import imageCompression, { Options } from 'browser-image-compression';

export async function compressImageToWebp(
  file: File,
  options?: Partial<Options>
): Promise<Blob | undefined> {
  const defaultOptions: Partial<Options> = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    fileType: 'image/webp',
    ...options,
  };

  try {
    const compressedBlob = await imageCompression(file, defaultOptions);

    if (!compressedBlob) {
      console.error('압축된 Blob이 없습니다');
      return undefined;
    }

    // 원본 파일명에서 확장자 제거 + webp로 교체
    const newFileName = file.name.replace(/\.\w+$/, '.webp');

    // Blob을 File로 변환, MIME 타입을 명확히 image/webp로 지정
    const webpFile = new File([compressedBlob], newFileName, { type: 'image/webp' });
    // console.log('압축 변환 완', webpFile.type, webpFile.name);

    return webpFile;
  } catch (error) {
    console.error('이미지 압축 실패:', error);
  }
}
