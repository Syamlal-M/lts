import COLOR from 'styles/Color';
import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
    typography: {
        htmlFontSize: 10,
        fontSize: 14
    },
    palette: {
        mode: 'light',
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

export default Theme;