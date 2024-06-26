import cardValidator from "card-validator";

export const isValidCVV = (cvv: number): boolean => {
  console.log(cvv, "cvv vaid");
  // Check if the CVV is a 3-digit number
  const cardValidation = cardValidator.cvv(cvv);
  if (cardValidation.isValid) {
    return true;
  } else {
    return false;
  }
};

export const isValidExpiryDate = (
  expiryMonth: number,
  expiryYear: number
): boolean => {
  const expDate = expiryMonth + "/" + expiryYear;

  const cardValidation = cardValidator.expirationDate(expDate);
  if (cardValidation.isValid) {
    return true;
  } else {
    return false;
  }
};


export const isValidHolderName = (cardName: string): boolean => {
  // Check if the CVV is a 3-digit number
  const cardValidation = cardValidator.cardholderName(cardName);

  if (cardValidation.isValid) {
    return true;
  } else {
    return false;
  }
};

export const isValidCardNumber = (cardNumber: number): boolean => {
  console.log(cardNumber, "cardnumber vaid");

  const cardValidation = cardValidator.number(cardNumber);

  if (cardValidation.isValid) {
    return true;
  } else {
    return false;
  }
};
