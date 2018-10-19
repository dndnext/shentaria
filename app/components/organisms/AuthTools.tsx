import Link from "next/link";
import React from "react";
import { UserConsumer } from "../contexts/user";

const AuthMenu: React.SFC = () => (
  <UserConsumer>
    {({ session }) => {
      console.info("session", session);
      return (
        <div>
          {(session && session.user && session.user.name) || (
            <Link href="/auth">
              <a>Login</a>
            </Link>
          )}
        </div>
      );
    }}
  </UserConsumer>
);

export default AuthMenu;
