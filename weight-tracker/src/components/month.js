const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Converts a month number (1-12) to its full name
 * @param {number} monthNumber - The month number (1 = January, 12 = December)
 * @returns {string} - The month name
 */
export const getMonthName = (monthNumber) => {
  if (monthNumber < 1 || monthNumber > 12) return 'Invalid Month';
  return monthNames[monthNumber - 1];
};
