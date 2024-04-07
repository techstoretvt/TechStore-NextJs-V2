import React, { useEffect } from "react";
import dynamic from 'next/dynamic';
import { FacebookProvider } from 'react-facebook';
const { CustomChat } = dynamic(
  () => import('react-facebook'),
  { loading: () => <p>Loading...</p> }
);

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
