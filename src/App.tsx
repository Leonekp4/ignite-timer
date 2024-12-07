import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { Router } from './Router';
//import { createContext } from 'react';
import { CyclesContextProvider } from './contexts/CyclesContext';



export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>

        <CyclesContextProvider>
          <Router /> 
        </CyclesContextProvider>

      </BrowserRouter>

      <GlobalStyle />  {/* importação do estilo global para detro do tema */}
    </ThemeProvider>
  )
}
