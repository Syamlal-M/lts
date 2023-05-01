import { NavigationProvider } from "context/NavigationContext";
import { ThemeProvider } from "context/ThemeContext";
import { CssBaseline } from "components/shared-ui";
import PageRoutes from "pages/_Routes";
import 'App.css';

function App() {
  return (
    <NavigationProvider>
      <ThemeProvider>
        <CssBaseline />
        <PageRoutes />
      </ThemeProvider>
    </NavigationProvider>
  );
}

export default App;
