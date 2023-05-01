import { NavigationProvider } from "context/NavigationContext";
import { ThemeProvider } from "context/ThemeContext";
import { CssBaseline } from "components/shared-ui";
import PageRoutes from "pages/_Routes";
import 'App.css';
import { SelectListProvider } from "context/SelectListContext";

function App() {
  return (
    <NavigationProvider>
      <ThemeProvider>
        <SelectListProvider>
          <CssBaseline />
          <PageRoutes />
        </SelectListProvider>
      </ThemeProvider>
    </NavigationProvider>
  );
}

export default App;
