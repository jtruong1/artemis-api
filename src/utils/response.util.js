const handleResponse = (response) => {
  //
};

const handleErrorResponse = (error) => {
  let message = {};

  if (error.response) {
    message = error.response.data.message;
  } else if (error.request) {
    message = 'Failed to receive response from host';
  } else {
    message = error.message;
  }

  throw new Error(message);
};

module.exports = { handleResponse, handleErrorResponse };
