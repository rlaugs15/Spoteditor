import { useState } from 'react';

/* 
  이미지 업로드 후, 미리보기 이미지 제공
*/
// 임시 파일 크기 계산
function returnFileSize(number) {
  if (number < 1024) {
    return number + 'bytes';
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + 'KB';
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + 'MB';
  }
}

function useImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  /* 입력 */
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    for (const imageFile of e.target.files) {
      console.log(imageFile);
      console.log(returnFileSize(imageFile.size));

      setPreviews((prev) => [...prev, URL.createObjectURL(imageFile)]);
    }
  };
  /* 삭제 (임시) */
  const handleRemoveFile = () => setPreviews([]);

  return { files, previews, handleChangeFile, handleRemoveFile };
}

export default useImageUpload;
