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
    // console.log('원본', returnFileSize(file.size), file.type);
    if (!compressedBlob) {
      console.error('압축된 Blob이 없습니다');
      return undefined;
    }
    // console.log('압축 변환 완', returnFileSize(compressedBlob.size), compressedBlob.type);
    return compressedBlob;
  } catch (error) {
    console.error('이미지 압축 실패:', error);
  }
}
