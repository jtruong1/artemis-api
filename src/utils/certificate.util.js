const { differenceInDays } = require('date-fns');

const parseCertificate = ({ socket }) => {
  const { subjectaltname, valid_from, valid_to } = socket.getPeerCertificate();

  if (!subjectaltname || !valid_from || !valid_to) {
    return { valid: false };
  }

  const validTo = new Date(valid_to);

  return {
    valid: socket.authorized,
    valid_from: new Date(valid_from).toUTCString(),
    valid_to: validTo.toUTCString(),
    valid_days: differenceInDays(validTo, new Date()),
  };
};

module.exports = { parseCertificate };
