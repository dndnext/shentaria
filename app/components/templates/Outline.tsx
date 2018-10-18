import AppBar from "@material-ui/core/AppBar";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React, { ReactChild } from "react";
import AuthTools from "../organisms/AuthTools";

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
});

const Outline: React.SFC<{ children: ReactChild; classes: any }> = ({
  children,
  classes,
}) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <Typography variant="h6" color="inherit">
            Home
          </Typography>
        </Link>
        <Link href="/account">
          <Typography variant="h6" color="inherit">
            Account
          </Typography>
        </Link>
        <Link href="/encyclopedia">
          <Typography variant="h6" color="inherit">
            Encyclopedias
          </Typography>
        </Link>
        <Link href="/campaign">
          <Typography variant="h6" color="inherit">
            Campaigns
          </Typography>
        </Link>
        <Link href="/map/maker">
          <Typography variant="h6" color="inherit">
            Map Maker
          </Typography>
        </Link>
        <Link href="/map">
          <Typography variant="h6" color="inherit">
            Maps
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
    <div>
      Shentaria <AuthTools />
    </div>
    {children}
  </div>
);

export default withStyles(styles)(Outline);
