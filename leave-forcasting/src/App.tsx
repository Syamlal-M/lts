import { CssBaseline, ThemeProvider } from "@mui/material";
import { NavigationProvider } from "context/NavigationContext";
import PageRoutes from "pages/_Routes";
import Theme from "lib/mui/Theme";
import 'App.css';

function App() {
  return (
    <NavigationProvider>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <PageRoutes />
      </ThemeProvider>
    </NavigationProvider>
  );
}

export default App;
