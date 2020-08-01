import * as React from "react";
import {connect} from "react-redux";

import Header from "../header/header";
import Footer from "../footer/footer";

import {ActionCreator as UserActionCreator} from "../../reducer/user/user";
import {getSignInFlag} from "../../reducer/user/selectors";

interface Props {
  onSubmit: ({login: sring, password: string}) => void;
  isValid: boolean;
  signInFlag: boolean;
  changeSignInFlag: (boolean) => void;
}

class SignIn extends React.PureComponent<Props> {
  private loginRef: React.RefObject<HTMLInputElement>;
  private passwordRef: React.RefObject<HTMLInputElement>;
  constructor(props) {
    super(props);

    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;
    evt.preventDefault();

    onSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  componentDidMount() {
    const {changeSignInFlag} = this.props;
    changeSignInFlag(true);
  }

  render() {
    const {isValid, signInFlag} = this.props;
    return (
      <div className="user-page">

        <Header className={`user-page__head`} isSignIn={signInFlag}>
          <h1 className="page-title user-page__title">Sign in</h1>
        </Header>

        <div className="sign-in user-page__content">
          <form
            action="#"
            className="sign-in__form"
            onSubmit={this.handleSubmit}
          >
            {isValid ? `` :
              <div className="sign-in__message">
                <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
              </div>}
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  ref={this.loginRef}
                  required
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  ref={this.passwordRef}
                  required
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button
                className="sign-in__btn"
                type="submit"
              >Sign in</button>
            </div>
          </form>
        </div>

        <Footer />

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signInFlag: getSignInFlag(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeSignInFlag(boolean) {
    dispatch(UserActionCreator.changeSignInFlag(boolean));
  }
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
