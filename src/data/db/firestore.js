import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import {collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";
import { firebaseConfig  } from '../../firebaseCredentials.js'

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
  const gsReference = ref(storage, `gs://aldrich-dev-portfolio.appspot.com/portfolio/${project}/structure/directories.json`)

  try {
    const url = await getDownloadURL(gsReference);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }catch( e ){
    console.error(`Error occurred while fetching JSON URL -> ${e}`)
  }

  // getDownloadURL(gsReference)
  //   .then((url) => {
      // const xhr = new XMLHttpRequest();
      // xhr.responseType = 'blob';
      // xhr.onLoad = (event) => {
      //   const blob = xhr.response;
      // };
      // xhr.open('GET', url);
      // xhr.send();
      // console.log(xhr.response)

    // })
    // .catch(e => {
    //   console.error(`Error occured while Fetching Json URL -> ${e}`)
    // })

  // const rootURL = 'https://storage.googleapis.com/aldrich-dev-portfolio.appspot.com/portfolio/'
  // const jsonUrl = rootURL + `${project}/structure/directories.json`
  //
  // fetch(jsonUrl)
  //   .then(response => response.json())
  //   .then(data => {
  //     return data;
  //   })
  //   .catch(e => {
  //     console.error(`An Error occured while Fetching json: ${e}`)
  //   })
}

// project == Firestore Document name
export const xgetProjectStructure = async (project) => {
  console.log(`PROJECT=${project}`)
  const projectRef = doc(db, "projectStructures", project);
  const projectDoc = await getDoc(projectRef);
  return projectDoc.exists() ? projectDoc.data() : null;
};
