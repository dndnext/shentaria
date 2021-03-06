import fetch from "isomorphic-fetch";
// @ts-ignore
import { connect, PromiseState } from "react-refetch";
// @ts-ignore

export default connect.defaults({
  fetch,
  headers: {
    "x-csrf-token": () => {
      return (
        (global as any).localStorage &&
        JSON.parse(localStorage.session).csrfToken
      );
    },
  },
});

export const ConnectState = PromiseState;
