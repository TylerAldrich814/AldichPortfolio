import { getStorage, ref, getDownloadURL } from "firebase/storage"

export const getImageUrl = async (path) => {
  const storage = getStorage();
  const imageRef = ref(storage, path)
  return getDownloadURL(imageRef);
}

export const getResumeURL = async() => {
  const storage = getStorage();
  const resumeRef = ref(storage, 'resume/Tyler_Aldrich_Resume2023.pdf');
  return await getDownloadURL(resumeRef);
};
