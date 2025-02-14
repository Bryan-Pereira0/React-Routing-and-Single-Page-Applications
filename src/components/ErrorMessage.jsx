import {string} from 'prop-types';

const ErrorMessage = ({ message }) => (
  <div className="error-message">
    {message}
  </div>
);

ErrorMessage.propTypes = {
  message: string
};

export default ErrorMessage;