import COLOR from 'styles/Color';
import { createTheme } from '@mui/material/styles';

const DarkTheme = createTheme({
    typography: {
        htmlFontSize: 10,
        fontSize: 14
    },
    palette: {
        mode: 'dark',
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
        borderRadius: 2
    }
});

export default DarkTheme;