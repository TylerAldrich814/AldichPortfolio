import React, {useState, useEffect} from "react";
import LineIcon from 'react-lineicons';
import { useSocial } from "../providers/DataProvider";
import { useFirebaseData } from "../providers/FirebaseDataProvider";

function Socialicons(props){
  // const social = useSocial();
  const { social } = useFirebaseData();

  useEffect(() => {
  }, [])

  return (
    <ul className={props.bordered ? 'mi-socialicons mi-socialicons-bordered' : 'mi-socialicons'}>
      {!social.facebook ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={social.facebook}>
          <LineIcon name="facebook"/>
        </a>
      </li>}
      {!social.linkedin ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={social.linkedin}>
          <LineIcon name="linkedin"/>
        </a>
      </li>}
      {!social.github ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={social.Github}>
          <LineIcon name="github"/>
        </a>
      </li>}
    </ul>
  );
}

export default Socialicons;
