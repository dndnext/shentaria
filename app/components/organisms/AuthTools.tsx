import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import { UserConsumer } from "../contexts/user";

const styles = {
  item: {
    "&:hover": {
      color: "#C0FFEE",
      opacity: 1,
    },
    cursor: "pointer",
    marginRight: 15,
  },
  orangeAvatar: {
    backgroundColor: deepOrange[500],
    color: "#fff",
    margin: 10,
  },
  row: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginLeft: "auto",
    minHeight: 60,
  },
};

const AuthMenu: React.SFC<{ classes: any }> = ({ classes }) => (
  <UserConsumer>
    {({ session }) => {
      console.info("session", session);
      return (
        <div className={classes.row}>
          {(session &&
            session.user && (
              <Avatar className={classes.orangeAvatar}>
                {session.user.email.slice(0, 2)}
              </Avatar>
            )) || (
            <Link href="/auth">
              <Typography variant="h6" color="inherit" className={classes.item}>
                Login
              </Typography>
            </Link>
          )}
        </div>
      );
    }}
  </UserConsumer>
);

export default withStyles(styles)(AuthMenu);
