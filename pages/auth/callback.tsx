// @ts-ignore
import { NextAuth } from "next-auth/client";
// @ts-ignore
import Link from "next/link";
import Router from "next/router";
import React from "react";

export default class extends React.Component {
  public static async getInitialProps({ req }: { req: any }) {
    return {
      session: await NextAuth.init({ force: true, req }),
    };
  }

  public async componentDidMount() {
    const session = await NextAuth.init({ force: true });
    console.info("session", session);
    Router.push("/");
  }

  public render() {
    // Provide a link for clients without JavaScript as a fallback.
    return (
      <React.Fragment>
        <style jsx global>{`
          body {
            background-color: #fff;
          }
          .circle-loader {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50%;
            z-index: 100;
            text-align: center;
            transform: translate(-50%, -50%);
          }
          .circle-loader .circle {
            fill: transparent;
            stroke: rgba(0, 0, 0, 0.2);
            stroke-width: 4px;
            animation: dash 2s ease infinite, rotate 2s linear infinite;
          }
          @keyframes dash {
            0% {
              stroke-dasharray: 1, 95;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 85, 95;
              stroke-dashoffset: -25;
            }
            100% {
              stroke-dasharray: 85, 95;
              stroke-dashoffset: -93;
            }
          }
          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <noscript>
          <style>{`
            svg {
              display: none;
            }
            a {
              font-weight: bold;
            }
          `}</style>
        </noscript>
        <a href="/" className="circle-loader">
          <svg
            className="circle"
            width="60"
            height="60"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="30" cy="30" r="15" />
          </svg>
          <noscript>Click here to continue</noscript>
        </a>
      </React.Fragment>
    );
  }
}
