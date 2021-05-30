import React from 'react';
import Routes from './routes';
import { ViewportProvider } from './useViewport';


function App() {

  return (
    <ViewportProvider>
      <Routes />
    </ViewportProvider>
  );
} 

export default App;
