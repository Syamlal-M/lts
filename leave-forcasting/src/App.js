import { Button, Container } from '@mui/material';
import { useEffect } from 'react';
import { ThemeProvider } from "@mui/system";
import theme from './styles/theme';
import Appbar from "./components/appBar";

function App() {
  useEffect(() => {
      document.title = "Leave Tracker System";
    }, []);

  return (
      <ThemeProvider theme={theme}>
        <Container
            maxWidth= "xl"
            sx={{
              background: '#fff'
            }}
        >
            <Appbar />
            <Button variant="contained"> Test </Button>
        </Container>
      </ThemeProvider>
  );
}

export default App;
