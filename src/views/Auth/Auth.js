import React, { useState } from 'react';
import { useViewport } from '../../useViewport';
import './auth.scss';

import AuthDesktopWrapper from "./AuthDesktopWrapper/AuthDesktopWrapper";
import AuthMobileWrapper from "./AuthMobileWrapper/AuthMobileWrapper";


const Auth = () => {
  const { width } = useViewport();
  const breakpoint = 900;

  return width < breakpoint ? <AuthMobileWrapper /> : <AuthDesktopWrapper />;

}

export default Auth;