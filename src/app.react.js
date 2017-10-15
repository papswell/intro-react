/**
 * This is the React part of our application.
 * It is DECLARATIVE: we describe our User Interface (UI) in the render method of
 * Components, connect some callbacks to update Components internal state,
 * and everything is managed by React.
 */

/**
 * TweetBox component. As the app is simple here, all the UI is described in this
 * component.
 * @type {React.Component}
 */
class TweetBox extends React.Component {

  /**
   * Constructor of the component.
   * This function is called only once when the component is created.
   */
  constructor() {
    // We need to call the constructor of the parent class (React.Component)
    super();

    // This component needs an internal state, which will evolve as the user
    // uses the application. Any time the state is updated, the component re-render.
    // We declare the initial state in the constructor.
    this.state = {
      text: '',
      isPhotoAdded: false,
    };

    // Bind the internal methods of the component to itself, so that when these
    // methods are called through event listener callbacks, the 'this' context
    // is not lost.
    this.handleChange = this.handleChange.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
  }

  /**
   * Callback function, triggered any tme the user type something in the
   * textarea. React automatically binds a SyntheticEvent as first parameter to
   * change callbacks, that can be used according our needs.
   * @see https://reactjs.org/docs/events.html
   *
   * @param  {SyntheticEvent} event
   */
  handleChange(event) {
    const newTextValue = event.target.value;

    // Update the state with the new textarea value.
    // NOTE we have to call setState() method to update the state and ensures
    // that the component re-renders correctly
    // !!! Doing this.state.text = "NEW TEXT" will not work !!!
    this.setState({
      text: newTextValue,
    })
  }

  /**
   * Callback triggered whenthe user clicks on the photo button
   * @param  {[SyntheticEvent]} event the click event
   */
  handlePhotoClick(event) {
    this.setState({
      isPhotoAdded: !this.state.isPhotoAdded,
    });
  }

  /**
   * Helper method computing the number of characters that the user can still
   * write according to the state of the component
   * @return {Number}
   */
  getRemainingCharacters() {
    let remaining = 140 - this.state.text.length;
    if (this.state.isPhotoAdded) {
      remaining -= 23;
    }
    return remaining;
  }

  /**
   * Helper method that render the alert box according to the state of the
   * component
   * @return {JSX} the JSX markup for the alert box
   */
  renderOverflowAlert() {
    const { text, isPhotoAdded } = this.state;
    const maxValue = isPhotoAdded ? 140 - 23 : 140;
    const validText = text.slice(maxValue - 10, maxValue);
    const extraText = text.slice(maxValue);

    return (
      <div class="alert alert-danger" role="alert">
        <strong>Tweet too long !</strong>
        <br />
        <span>
          ...&nbsp;
          {validText}
          <strong>
            {extraText}
          </strong>
        </span>
      </div>
    )
  }

  /**
   * This method is called once when the component mounts, and then any time the
   * state of the component is updated via setState(...)
   * It describe all the UI, and connects the change callbacks to it.
   *
   * @return {JSX} the JSX markup of the TweetBox UI.
   */
  render() {
    const { text, isPhotoAdded } = this.state;

    const remaining = this.getRemainingCharacters();
    const disabled = remaining === 140 || remaining < 0;

    return (
      <div className="well clearfix">
        {remaining < 0 && this.renderOverflowAlert()}
        <textarea
          className="form-control"
          onChange={this.handleChange}
        />
        <br/>
        <span className="counter">{remaining}</span>
        <button
          className="btn btn-light pull-right photo-button"
          onClick={this.handlePhotoClick}
        >
          {isPhotoAdded ? 'Photo added :)' : 'Add a photo'}
        </button>
        <button
          className="btn btn-primary pull-right"
          disabled={disabled}
        >
          Tweet
        </button>
      </div>
    );
  }
};

/**
 * Mount a TweetBox component in the DOM.
 */
ReactDOM.render(
  <TweetBox />,
  document.getElementById("react-app")
);
