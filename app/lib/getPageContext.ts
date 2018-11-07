import cyan from "@material-ui/core/colors/cyan";
import pink from "@material-ui/core/colors/pink";
import {
  createGenerateClassName,
  createMuiTheme,
} from "@material-ui/core/styles";
import { SheetsRegistry } from "jss";

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: pink[900],
      light: pink[600],
      main: pink[800],
    },
    secondary: {
      dark: cyan[900],
      light: cyan[600],
      main: cyan[800],
    },
  },
  typography: {
    useNextVariants: true,
  },
});

function createPageContext() {
  return {
    generateClassName: createGenerateClassName(),
    sheetsManager: new Map(),
    sheetsRegistry: new SheetsRegistry(),
    theme,
  };
}

export default function getPageContext() {
  if (!(process as any).browser) {
    return createPageContext();
  }

  if (!(global as any).__INIT_MATERIAL_UI__) {
    (global as any).__INIT_MATERIAL_UI__ = createPageContext();
  }

  return (global as any).__INIT_MATERIAL_UI__;
}
