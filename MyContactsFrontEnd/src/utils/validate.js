export const validations = {
  isEmailValid(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  },
  formatPhone(phoneNumber) {
    if (!phoneNumber) return '';
    return phoneNumber
      .replace(/\D/g, '')
      .replace(/^(\d{2})\B/, '($1) ')
      .replace(/(\d{1})?(\d{4})(\d{4})/, '$1$2-$3');
  },
};
