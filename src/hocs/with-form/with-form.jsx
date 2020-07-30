import React from "react";

const withForm = (Component) => {
  class WithForm extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: 0
      };

      this._handleFormDataChange = this._handleFormDataChange.bind(this);
    }

    _handleFormDataChange(evt) {
      const target = evt.target;
      const rating = target.name === `rating` ? parseInt(target.value, 10) : this.state.rating;
      const comment = target.name === `review-text` ? target.value.length : this.state.comment;

      this.setState({
        rating,
        comment
      });
    }

    render() {
      const {rating, comment} = this.state;
      return (
        <Component
          {...this.props}
          rating={rating}
          comment={comment}
          onFormDataChange={this._handleFormDataChange}
        />
      );
    }
  }

  return WithForm;
};


export default withForm;
