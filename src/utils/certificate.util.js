const parseCertificate = ({ socket }) => {
  const { subjectaltname, valid_from, valid_to } = socket.getPeerCertificate();

  if (!subjectaltname || !valid_from || !valid_to) {
    return { valid: false };
  }

  const validTo = Date.parse(valid_to);

  return {
    valid: socket.authorized,
    valid_from: Date.parse(valid_from),
    valid_to: validTo,
    valid_days: Math.round((validTo - Date.now()) / (1000 * 60 * 60 * 24)),
  };
};

module.exports = { parseCertificate };
