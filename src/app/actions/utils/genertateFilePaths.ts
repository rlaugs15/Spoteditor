import { getUser } from '../user';

/* 
  단일 파일은 folders 없이 "버킷 / 유저id / 파일명"으로 저장됨
  ex ) await generateFilePaths(); // ['userId/0.webp']
  ex ) await generateFilePaths({ folders: ['mainFolder', 'subFolder'] }); // ['userId/mainFolder/subFolder/0.webp']
  ex ) await generateFilePaths({ folders: ['mainFolder', 'subFolder'], fileCount: 3 }); // ["userId/mainFolder/subFolder/0.webp", ...]
*/

export type GenerateFilePathsOptions = {
  folders?: string[]; // 폴더 경로 순서대로 전달
  fileCount?: number;
  fileName?: string;
};

export async function generateFilePaths(options: GenerateFilePathsOptions = {}): Promise<string[]> {
  const { folders = [], fileCount = 1, fileName } = options;
  const me = await getUser();
  if (!me) throw new Error('유저 없음');

  return Array.from({ length: fileCount }).map((_, i) => {
    let resolvedFileName: string;

    if (fileName) {
      if (fileCount === 1) {
        resolvedFileName = fileName;
      } else {
        resolvedFileName = `${i}_${fileName}`;
      }
    } else {
      resolvedFileName = `${i}.webp`;
    }

    return [me.user_id, ...folders, resolvedFileName].join('/');
  });
}
