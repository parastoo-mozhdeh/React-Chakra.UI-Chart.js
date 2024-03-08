import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider } from "@chakra-ui/react"

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <ChakraProvider>
  <StrictMode>
    <ColorModeScript />
    <App />
  </StrictMode>
  </ChakraProvider>
);


serviceWorker.unregister();

reportWebVitals();
