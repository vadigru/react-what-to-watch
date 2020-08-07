import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  rating: number;
  comment: number;
}

interface InjectedProps {
  rating: number;
  comment: number;
  onFormDataChange: (evt: React.SyntheticEvent<EventTarget>) => void;
}

const withForm = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithForm extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        rating: 3,
        comment: 0,
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
