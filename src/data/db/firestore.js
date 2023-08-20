import { initializeApp } from "firebase/app";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import { firebaseConfig } from "../../firebase_cred";

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

export const getPortfolio = async () => {
  const portfolioRef = doc(db, "portfolio", PORTFOLIO)
  const portfolioDoc = await getDoc(portfolioRef);
  return portfolioDoc.exists() ? portfolioDoc.data() : null;
};

