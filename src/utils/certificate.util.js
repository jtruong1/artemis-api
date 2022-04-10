import { differenceInDays } from 'date-fns';

const parseCertificate = (certificate) => {
  const { issuer, subjectaltname, valid_from, valid_to } = certificate;

  if (!issuer || !subjectaltname || !valid_from || !valid_to) {
    return null;
  }

  const validTo = new Date(valid_to);

  return {
    issuer: issuer.CN,
    valid_from: new Date(valid_from).toISOString(),
    valid_to: validTo.toISOString(),
    valid_days: differenceInDays(validTo, new Date()),
  };
};

export { parseCertificate };
