import React, { useEffect } from "react";
import dynamic from 'next/dynamic';
import { FacebookProvider, CustomChat } from 'react-facebook';


const id = "116661344652051";
const appid = "1131387264234227";

const FacebookChat = () => {

  useEffect(() => {
    return () => { };
  }, []);

  return (
    <div>
      <FacebookProvider appId={appid} chatSupport>
        <CustomChat pageId={id} minimized={false} />
      </FacebookProvider>
    </div>
  );
};

export default React.memo(FacebookChat);
