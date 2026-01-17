export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const addThousandsSeparator = (num) => {
  if (num === null || num === undefined || Number.isNaN(Number(num))) {
    return "";
  }

  const [integerPart, fractionalPart] = String(num).split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart !== undefined
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

