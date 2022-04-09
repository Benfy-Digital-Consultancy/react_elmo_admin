import React from "react";
import Sidebar from "../component/common/Sidebar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { mainLayoutStyle } from "service/helpers/Constants";
import Header from "../component/common/Header";
export function MainLayout(props) {
  const outerTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#1A4BA1",
      },

      secondary: {
        main: "#FBFBFB",
      },
    },
  });
  const classes = mainLayoutStyle();
  return (
    <>
      <Header />
      <ThemeProvider theme={outerTheme}>
        <div className={classes.root + " mb-5"}>
          <Sidebar classes={classes} />
          <main className={classes.content}>{props.children}</main>
        </div>
      </ThemeProvider>
    </>
  );
}
