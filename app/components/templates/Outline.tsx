import AppBar from "@material-ui/core/AppBar";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React, { ReactChild } from "react";
import AuthTools from "../organisms/AuthTools";

const styles = createStyles({
  item: {
    cursor: "pointer",
    marginRight: 15,
  },
  root: {
    flexGrow: 1,
  },
});

const links = [
  { label: "Home", href: "/" },
  { label: "Account", href: "/account" },
  { label: "Encyclopedia", href: "/encyclopedia" },
  { label: "Campaigns", href: "/campaign" },
  { label: "Map Editor", href: "/map/maker" },
  { label: "Maps", href: "/map" },
];

const Outline: React.SFC<{ children: ReactChild; classes: any }> = ({
  children,
  classes,
}) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        {links.map(({ label, href }) => (
          <Link key={label} href={href}>
            <Typography variant="h6" color="inherit" className={classes.item}>
              {label}
            </Typography>
          </Link>
        ))}
      </Toolbar>
    </AppBar>
    <div>
      Shentaria <AuthTools />
    </div>
    {children}
  </div>
);

export default withStyles(styles)(Outline);
