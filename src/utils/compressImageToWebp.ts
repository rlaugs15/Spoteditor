/* 
이미지 압축 + webp 변환
*/
import imageCompression, { Options } from 'browser-image-compression';
import { returnFileSize } from './returnFileSize';

export async function compressImageToWebp(file: File, options?: Partial<Options>) {
  const defaultOptions: Partial<Options> = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    fileType: 'image/webp',
    ...options,
  };

  try {
    console.log('전', returnFileSize(file.size));
    const compressedFile = await imageCompression(file, defaultOptions);
    console.log('후', returnFileSize(compressedFile.size));
    return compressedFile;
  } catch (error) {
    console.error('이미지 압축 실패:', error);
  }
}
