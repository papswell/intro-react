class TweetBox extends React.Component {

  constructor() {
    super();

    this.state = {
      text: '',
      isPhotoAdded: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
  }

  handleChange(event) {
    const newTextValue = event.target.value;
    this.setState({
      text: newTextValue,
    })
  }

  handlePhotoClick(event) {
    this.setState({
      isPhotoAdded: !this.state.isPhotoAdded,
    });
  }

  getRemainingCharacters() {
    let remaining = 140 - this.state.text.length;
    if (this.state.isPhotoAdded) {
      remaining -= 23;
    }
    return remaining;
  }

  render() {
    const { text, isPhotoAdded } = this.state;

    const length = text.length;
    const remaining = this.getRemainingCharacters();

    const disabled = (length === 0 || remaining < 0) && !isPhotoAdded;

    return (
      <div className="well clearfix">
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

ReactDOM.render(
  <TweetBox />,
  document.getElementById("react-app")
);
