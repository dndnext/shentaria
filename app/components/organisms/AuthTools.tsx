import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import React from "react";
import { UserConsumer } from "../contexts/user";

const styles = {
  orangeAvatar: {
    backgroundColor: deepOrange[500],
    color: "#fff",
    margin: 10,
  },
  row: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "auto",
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
              <a>Login</a>
            </Link>
          )}
        </div>
      );
    }}
  </UserConsumer>
);

export default withStyles(styles)(AuthMenu);
