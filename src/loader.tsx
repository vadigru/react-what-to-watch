import * as React from "react";
import {css} from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 25%;
`;

const Loading = () => {
  return (
    <div className="sweet-loading">
      <PuffLoader
        css={override}
        size={100}
        color={`#212121`}
        loading={true}
      />
    </div>
  );
};

export default Loading;
