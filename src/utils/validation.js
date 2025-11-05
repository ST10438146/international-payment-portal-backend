// RegEx patterns for input validation (whitelist approach)
export const patterns = {
  username: /^[a-z0-9_]{3,30}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  idNumber: /^[0-9]{13}$/,
  accountNumber: /^[0-9]{10,16}$/,
  swiftCode: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
  fullName: /^[a-zA-Z\s'-]{2,100}$/,
  amount: /^\d+(\.\d{1,2})?$/,
  currency: /^(USD|EUR|GBP|ZAR|JPY|AUD|CAD|CHF)$/,
  bankName: /^[a-zA-Z0-9\s&'-]{2,100}$/
};

export const validateInput = (input, pattern) => {
  if (typeof input !== 'string') return false;
  return pattern.test(input);
};

export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
};