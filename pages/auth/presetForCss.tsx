import { css } from "emotion";

const heading1 = css`
  font-size: 32px;
  font-family: "Roboto", Times, serif;
  height: 20px;
`;

const flexParent = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
  background-color: SkyBlue;
`;

const block = css`
  display: block;
  text-align: center;
`;

export default { heading1, flexParent, block };
