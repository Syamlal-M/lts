import { AdapterDayjs, LocalizationProvider } from "lib/mui/Helper";
import { NavigationProvider } from "context/NavigationContext";
import { ThemeProvider } from "context/ThemeContext";
import { CssBaseline } from "components/shared-ui";
import PageRoutes from "pages/_Routes";
import 'App.css';

function App() {
  return (
    <NavigationProvider>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <PageRoutes />
        </LocalizationProvider>
      </ThemeProvider>
    </NavigationProvider>
  );
}

export default App;
