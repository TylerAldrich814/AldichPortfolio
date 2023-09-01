import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getContactInfo, getInformation, getSkillsInfo, getExperienceInfo, getSocialLinks } from '../data/db/firestore';
import { getImageUrl } from '../data/db/fireStorage';

const FireBaseDataContext = React.createContext(null);

export const useFirebaseData = () => React.useContext(FireBaseDataContext);

export const FireBaseDataProvider = ({ children }) => {
  const [isLoading, setIsLoading]     = useState(true);
  const [contact, setContact]         = useState({})
  const [information, setInformation] = useState({})
  const [skills, setSkills]           = useState([]);
  const [experience, setExperience]   = useState([]);
  const [images, setImages] = useState({});
  const [social, setSocial] = useState({});

  const ImageUrls = {
    brandImage:   'images/brand-image.jpg',
    aboutImage:   'images/about-image.jpg',
    aboutImageLg: 'images/about-image-lg.jpg',
    aboutImagePlaceHolder: 'images/about-image-placeholder.png',
    portfolioPlaceHolder: 'images/portfolio-image-placeholder.png',
  }

  const fetchData = async () => {
    try {
      const fetchedContact = await getContactInfo();
      const fetchedInformation = await getInformation();
      const fetchedSkills = await getSkillsInfo();
      const fetchedExperience = await getExperienceInfo();
      const fetchedSocial = await getSocialLinks();

      // const imagePromises = Object.key(ImageUrls).map(async (key) => {
      const imagePromises = Object.keys(ImageUrls).map(async (key) => {
        const url = await getImageUrl(ImageUrls[key]);
        return [key, url];
      });
      const imageEntries = await Promise.all(imagePromises);
      const newImages = Object.fromEntries(imageEntries);

      setContact(fetchedContact);
      setInformation(fetchedInformation);
      setSkills(fetchedSkills);
      setExperience(fetchedExperience);
      setSocial(fetchedSocial);
      setImages(newImages);

    } catch (e) {
      console.error(`Error fetching Data: ${e}`)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FireBaseDataContext.Provider value={{
      isLoading,
      contact,
      information,
      skills,
      experience,
      images,
      social,
    }}>
      { children }
    </FireBaseDataContext.Provider>
  )
};
