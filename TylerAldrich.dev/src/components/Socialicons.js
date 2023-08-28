import React, {useState, useEffect} from "react";
import LineIcon from 'react-lineicons';
import { useSocial } from "../providers/DataProvider";

function Socialicons(props){
  const social = useSocial();

  useEffect(() => {
  }, [])

  return (
    <ul className={props.bordered ? 'mi-socialicons mi-socialicons-bordered' : 'mi-socialicons'}>
      {!social.facebook ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={social.facebook}>
          <LineIcon name="facebook"/>
        </a>
      </li>}
      {!social.twitter ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={social.twitter}>
          <LineIcon name="twitter"/>
        </a>
      </li>}
      {!social.pinterest ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={social.pinterest}>
          <LineIcon name="pinterest"/>
        </a>
      </li>}
      {!social.behance ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={social.behance}>
          <LineIcon name="behance"/>
        </a>
      </li>}
      {!social.linkedin ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={social.linkedin}>
          <LineIcon name="linkedin"/>
        </a>
      </li>}
      {!social.dribbble ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={social.dribbble}>
          <LineIcon name="dribbble"/>
        </a>
      </li>}
      {!social.github ? null : <li>
        <a rel="noopener noreferrer" target="_blank" href={social.github}>
          <LineIcon name="github"/>
        </a>
      </li>}
    </ul>
  );
}

export default Socialicons;
