import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus, getAvatar} from "../../reducer/user/selectors";

import {AppRoute} from "../../const";

interface Props {
  avatarUrl: string;
  authorizationStatus: string;
  isSignIn: boolean;
}

const UserBlock: React.FunctionComponent<Props> = (props: Props) => {
  const {avatarUrl, authorizationStatus, isSignIn} = props;
  const signIn = isSignIn ? `` :
    <Link to={AppRoute.SIGN_IN} className="user-block__link">
      Sign in
    </Link>;
  const avatar = authorizationStatus === AuthorizationStatus.AUTH && !isSignIn ?
    <Link to={AppRoute.MY_LIST}>
      <div className="user-block__avatar">
        <img src={avatarUrl} alt="User avatar" width="63" height="63" />
      </div>
    </Link> :
    ``;
  return (
    <div className="user-block">
      {authorizationStatus === AuthorizationStatus.AUTH ? avatar : signIn}
    </div>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  avatarUrl: getAvatar(state),
});

export {UserBlock};
export default connect(mapStateToProps, null)(UserBlock);
