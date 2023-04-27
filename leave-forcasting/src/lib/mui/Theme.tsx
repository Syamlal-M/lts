import COLOR from 'styles/Color';
import { PaletteMode } from '@mui/material';
import { ThemeOptions, createTheme } from '@mui/material/styles';

const getThemeOptions = (mode: PaletteMode): ThemeOptions => ({
    typography: {
        htmlFontSize: 10,
        fontSize: 14
    },
    palette: {
        mode: mode,
        primary: {
            main: COLOR.primary.main,
            contrastText: COLOR.common.white
        },
        secondary: {
            main: COLOR.secondary.main,
            contrastText: COLOR.common.white
        }
    },
    shape: {
        borderRadius: 2,
    },
    components: {
        MuiCardHeader: {
            styleOverrides: {
                title: {
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    textTransform: "capitalize"
                }
            }
        }
    },
});


const LightTheme = createTheme(getThemeOptions('light'));
const DarkTheme = createTheme(getThemeOptions('dark'));


export { LightTheme, DarkTheme };