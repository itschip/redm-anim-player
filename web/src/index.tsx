import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { VisibilityProvider } from './providers/VisibilityProvider';
import { ChakraProvider } from '@chakra-ui/react';
import { customTheme } from './theme/theme';

ReactDOM.render(
  <React.StrictMode>
    <VisibilityProvider>
      <ChakraProvider theme={customTheme}>
        <App />
      </ChakraProvider>
    </VisibilityProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
