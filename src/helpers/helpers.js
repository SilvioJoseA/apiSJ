// Helpers/validators.js
/**
 * To validate month
 * @param {string} month 
 * @returns 
 */
export const validateMonth = (month) => {
  const normalizedMonth = month?.toLowerCase()?.trim(); // Normaliza: "Enero " → "enero"
  const validMonths = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  return validMonths.includes(normalizedMonth) ? normalizedMonth : null;
};
/**
 * To make amount by cuota
 * @param {number} amount 
 * @param {string} type 
 * @returns 
 */
export const toGetAmount = ( amount , type ) => {
    try {
        if(amount && type ){
            switch ( type ) {
                case 'type1':
                    return parseFloat(amount);
                case 'type2':
                    return parseFloat(amount)*0.93;
                case 'type3':
                    return parseFloat(amount)*0.5;
                case 'second-time':
                    return parseFloat(amount)*1.1;
                default:
                    break;
            }  
        }
    } catch (error) {
        console.error("Error making amount :"+error);
    }
}
/**
 * To make amount with 10% of recharger
 * @param {number} amount 
 * @returns 
 */
export const toGetAmountSecondTime =  amount  => amount ? parseFloat(amount)*1.1: 0;
/**
 * 
 * @param {date} currentDate 
 * @returns 
 */
export const getLastDayOfMarch = (currentDate) => {
    const year = currentDate.getFullYear();
    const marchDate = new Date(year,7,1);
    if (currentDate > marchDate) {
        return new Date(year + 1, 2, 31);
    }
    return marchDate;
}
/**
 * 
 * @param {date} date 
 * @returns 
 */
export const getLocalDateWithOffset = (date) => {
    const pad = (num) => num.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const offsetMinutes = date.getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
    const offsetRemainder = Math.abs(offsetMinutes % 60);
    const offsetSign = offsetMinutes > 0 ? "-" : "+";
    const offset = `${offsetSign}${pad(offsetHours)}${pad(offsetRemainder)}`;
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offset}`;
}
export const getDays = (date) => date && String(date).split('T')[0];
