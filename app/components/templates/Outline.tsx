import Link from "next/link";
import React, { ReactChild } from "react";
import AuthTools from "../organisms/AuthTools";

const Outline: React.SFC<{ children: ReactChild }> = ({ children }) => (
  <div>
    <div>
      <ul>
        <li>
          <Link href="/account">
            <a>Account</a>
          </Link>
        </li>
        <li>
          <Link href="/campaign">
            <a>Campaigns</a>
          </Link>
        </li>
        <li>
          <Link href="/map/maker">
            <a>Map Maker</a>
          </Link>
        </li>
        <li>
          <Link href="/map/viewer">
            <a>Map Viewer</a>
          </Link>
        </li>
      </ul>
    </div>
    <div>
      Shentaria <AuthTools />
    </div>
    {children}
  </div>
);

export default Outline;
