import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline, createTheme } from '@mui/material';
import './main.css';
import App from './App';
import AppContextProvider from './hooks/context';
import { SidebarStateProvider } from '@/hooks/EM_SidebarStateContext';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

root.render(
  // <React.StrictMode>
  <AppContextProvider>
    <SidebarStateProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </SidebarStateProvider>
  </AppContextProvider>,
  // </React.StrictMode>,
);
