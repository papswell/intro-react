class TweetBox extends React.Component {

  constructor() {
    super();

    this.state = {
      text: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const newTextValue = event.target.value;
    this.setState({
      text: newTextValue,
    })
  }

  render() {

    const disabled = this.state.text.length === 0;

    return (
      <div className="well clearfix">
        <textarea
          className="form-control"
          onChange={this.handleChange}
        />
        <br/>
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
