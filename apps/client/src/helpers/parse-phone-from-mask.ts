export const parsePhoneFromMask = (phone: string): { phone: string; withoutCC: string } => {
  const parsedPhone: string = phone.replace(/\D/g, '');
  return {
    phone: parsedPhone,
    withoutCC: parsedPhone.substring(3),
  };
};
