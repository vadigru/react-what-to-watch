import * as React from "react";
import {connect} from "react-redux";

import UserBlock from "../user-block/user-block";
import Logo from "../logo/logo";
import {getAvatar} from "../../reducer/user/selectors";

interface Props {
  avatarUrl: string;
  className: string;
  isSignIn: boolean;
  children: React.ReactNode;
}

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const {avatarUrl, className = ``, isSignIn = false, children} = props;
  return (
    <header className={`page-header ${className}`}>
      <Logo />
      {children}
      <UserBlock avatarUrl={avatarUrl} isSignIn={isSignIn}/>
    </header>
  );
};

const mapStateToProps = (state) => ({
  avatarUrl: getAvatar(state)
});

export {Header};
export default connect(mapStateToProps, null)(Header);
