/* 
이미지 압축 + webp 변환
*/
import imageCompression, { Options } from 'browser-image-compression';

export async function compressImageToWebp(
  file: File,
  options?: Partial<Options>
): Promise<File | undefined> {
  const defaultOptions: Partial<Options> = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    fileType: 'image/webp',
    initialQuality: 0.85,
    ...options,
  };

  try {
    const compressedFile = await imageCompression(file, defaultOptions);

    // console.log('원본', returnFileSize(file.size), file.type);
    if (!compressedFile) {
      console.error('압축된 File이 없습니다');
      return undefined;
    }
    // console.log('압축 변환 완', returnFileSize(compressedFile.size), compressedFile.type);
    return compressedFile;
  } catch (error) {
    console.error('이미지 압축 실패:', error);
  }
}
