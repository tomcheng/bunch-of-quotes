import PropTypes from "prop-types";
import React, { Component } from "react";

class App extends Component {
  static propTypes = {
    quotes: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.shape({
          name: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
          position: PropTypes.string.isRequired,
        }).isRequired,
        id: PropTypes.number.isRequired,
        quote: PropTypes.string.isRequired
      })
    ).isRequired
  };

  render() {
    const { quotes } = this.props;

    return (
      <div>
        {quotes.map(quote => <div key={quote.id}>
          {quote.quote} -{quote.author.name}, {quote.author.position} ({quote.author.time})
        </div>)}
      </div>
    );
  }
}

export default App;
