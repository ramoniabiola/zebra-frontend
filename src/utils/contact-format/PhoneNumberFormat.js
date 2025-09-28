import { parsePhoneNumberFromString } from "libphonenumber-js";

export const formatPhoneNumber = (phone) => {
  const phoneNumber = parsePhoneNumberFromString(phone, "NG"); // NG = Nigeria
  return phoneNumber ? phoneNumber.formatInternational() : phone;
};
