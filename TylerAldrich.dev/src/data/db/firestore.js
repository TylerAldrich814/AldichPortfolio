import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import { firebaseConfig  } from './firebaseCredentials.js'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getInformation = async () => {
  const informationRef = doc(db, "static", "information");
  const informationDoc = await getDoc(informationRef);
  return informationDoc.exists() ? informationDoc.data() : null;
};

export const getSkillsInfo = async () => {
  const informationRef = doc(db, "static", "skills");
  const informationDoc = await getDoc(informationRef);
  return informationDoc.exists() ? informationDoc.data().skills : [];
};

export const getContactInfo = async() => {
  const informationRef = doc(db, "static", "contactInfo");
  const informationDoc = await getDoc(informationRef);
  return informationDoc.exists() ? informationDoc.data() : null;
};

export const getExperienceInfo = async() => {
  const informationRef = doc(db, "static", "experience");
  const informationDoc = await getDoc(informationRef);
  return informationDoc.exists() ? informationDoc.data() : null;
};

export const getSocialLinks = async() => {
  const informationRef = doc(db, "static", "socialLinks");
  const informationDoc = await getDoc(informationRef);
  return informationDoc.exists() ? informationDoc.data() : null;
};

export const getPortfolioData = async () => {
  const projectsRef = doc(db, "static", "portfolios");
  const projectsDoc = await getDoc(projectsRef);
  if( !projectsDoc.exists() ){
    console.error("FAILED TO GET PORJECTS DATA");
    return null
  }
  return projectsDoc.data();
};

export const getProjectStructure = async (project) => {
  const storage = getStorage(app);
  const gsReference = ref(storage, `gs://tyleraldrichdev.appspot.com/portfolio/${project}/structure/directories.json`)

  try {
    const url = await getDownloadURL(gsReference);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }catch( e ){
    console.error(`Error occurred while fetching JSON URL -> ${e}`)
  }
}

// filePath will be the relative filepath within your project. Which if you
// used my Build scripts, should of been deep copied from your projects directory
// onto Firebase Storage using the same File Structure.
export const getProjectFileContents = async (project, filePath) => {
  const storage = getStorage(app);
  console.log(`FilePath: ${filePath}`)

  if (filePath[0] === "/"){
    filePath = filePath.slice(1);
    console.log(`New FilePath: ${filePath}`)
  }
  const gsReference = ref(storage, `gs://tyleraldrichdev.appspot.com/portfolio/${project}/${filePath}`)

  try {
    const url = await getDownloadURL(gsReference);
    const response = await fetch(url);
    const data = await response.text();
    return data;
  } catch( e ){
    console.error(`Error occurred while fetching JSON URL -> ${e}`)
    return null
  }
}

export const getResumeURL = async () => {
  const storage = getStorage(app);
  const gsReference = ref(storage, `gs://aldrich-dev-portfolio.appspot.com/resume/Tyler_Aldrich_Resume2023.pdf`)

  try {
    const url = await getDownloadURL(gsReference);
    return url;
  }catch( e ){
    console.error(`Error occurred while fetching Resume`)
  }
};
