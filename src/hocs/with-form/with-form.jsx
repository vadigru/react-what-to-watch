import React from "react";

const withForm = (Component) => {
  class WithForm extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isCommentAdded: false,
        isFormInvalid: true
      };

      this._handleChangeFormFlag = this._handleChangeFormFlag.bind(this);
      this._handleCommentAddedFlag = this._handleCommentAddedFlag.bind(this);
    }

    _handleChangeFormFlag(boolean) {
      this.setState({
        isFormInvalid: boolean
      });
    }

    _handleCommentAddedFlag(boolean) {
      this.setState({
        isCommentAdded: boolean
      });
    }

    render() {
      const {isCommentAdded, isFormInvalid} = this.state;
      return (
        <Component
          {...this.props}
          isCommentAdded={isCommentAdded}
          isFormInvalid={isFormInvalid}
          onCommentPost={this._handleCommentAddedFlag}
          onTextareaChange={this._handleChangeFormFlag}
        />
      );
    }
  }

  return WithForm;
};


export default withForm;
