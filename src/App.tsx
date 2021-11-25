import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Chat } from './components/Chat';
import WsClientProvider from './websocket/WsClient';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ChatLobby } from './components/ChatLobby';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4F359B'
    },
    secondary: {
      main: '#302056',
    },
    text: {
      primary: '#B5BA72',
      secondary: '#99907D'
    },
    background: {
      default: '#110B11',
      //paper: 
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WsClientProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ChatLobby />} />
            <Route path="chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>

      </WsClientProvider>
    </ThemeProvider>
  );
}

export default App;
