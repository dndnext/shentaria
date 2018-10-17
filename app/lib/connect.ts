import fetch from "isomorphic-fetch";
// @ts-ignore
import { connect } from "react-refetch";
// @ts-ignore

const token = JSON.parse(localStorage.session).csrfToken;

connect.defaults({
  fetch,
  headers: {
    "x-csrf-token": token,
  },
});

export default connect;
