import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getImageUrl } from '../data/db/fireStorage';
import { getSkillsInfo } from '../data/db/firestore';


const ContactContext = React.createContext(null);
const ExperienceContext = React.createContext(null);
const InformationContext = React.createContext(null);
const SkillsContext = React.createContext(null);
const ImagesContext = React.createContext(null);
const SocialContext = React.createContext(null);

export const useContact     = () => React.useContext(ContactContext);
export const useExperience  = () => React.useContext(ExperienceContext);
export const useInformation = () => React.useContext(InformationContext);
export const useSkills = () => React.useContext(SkillsContext);
export const useImages = () => React.useContext(ImagesContext);
export const useSocial = () => React.useContext(SocialContext);

export const DataProvider = ({ children }) => {
  const [contact, setContact]         = useState({})
  const [information, setInformation] = useState({})
  const [skills, setSkills]           = useState([]);
  const [experience, setExperience]   = useState([]);
  const [images, setImages] = useState({});
  const [social, setSocial] = useState({});

  const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
  };

  useEffect(() => {
    axios.get("/api/images").then((response) => {
      const fetchImages = async () => {
        const urls = await Object.entries(response.data.Images).reduce(
          async (promise, [key, path]) => {
            const acc = await promise;
            const url = await getImageUrl(path);
            acc[key] = url;
            preloadImage(url);
            return acc;
          },
          Promise.resolve({})
        );
        setImages(urls);
      };

      fetchImages();
    }).catch(e => console.error(`Error Fetching Images: ${e}`));

    axios.get("/api/information").then((response) => {
      setInformation(response.data);
    }).catch(e => console.error(`Error Fetching Information: ${e}`));

    axios.get("/api/contactinfo").then((response) => {
      setContact(response.data);
    }).catch(e => console.error(`Error Fetching Contact Info: ${e}`));

    console.log(`BEFORE : ${skills}`)
    getSkillsInfo().then(fetchedSkills => {
      console.log(`FETCHED: ${fetchedSkills}`);
      setSkills(fetchedSkills)
    })
    console.log(` AFTER : ${skills}`)
    //
    // axios.get("/api/skills").then((response) => {
    //   console.log(`BEFORE SKILLS : ${skills}`)
    //   setSkills(response.data).then(f);
    //   console.log(` AFTER SKILLS : ${skills}`)
    // }).catch(e => console.error(`Error Fetching Skills: ${e}`));
    //
    axios.get("/api/experience").then((response) => {
      setExperience(response.data);
    }).catch(e => console.error(`Error Fetching Experience: ${e}`));

    axios.get("/api/socialLinks").then((response) => {
      setSocial(response.data);
    }).catch(e => console.error(`Error Fetching Social Links: ${e}`));
  }, []);

  return (
    <ImagesContext.Provider value={images}>
      <InformationContext.Provider value={information}>
        <ExperienceContext.Provider value={experience}>
          <ContactContext.Provider value={contact}>
            <SkillsContext.Provider value={{
              skills,
              setSkills,
            }}>
              <SocialContext.Provider value={social}>
              {children}
              </SocialContext.Provider>
            </SkillsContext.Provider>
          </ContactContext.Provider>
        </ExperienceContext.Provider>
      </InformationContext.Provider>
    </ImagesContext.Provider>
  );
};
