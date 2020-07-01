import PropTypes from "prop-types";

export const quoteType = PropTypes.shape({
  hash: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  context: PropTypes.string,
  occupation: PropTypes.string,
  time: PropTypes.string,
});
