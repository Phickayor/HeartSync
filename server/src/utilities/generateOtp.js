const generateOtp = (otpLength) => {
  let otpArr = [];
  for (let i = 0; i < otpLength; i++) {
    otpArr.push(Math.floor(Math.random() * 9));
  }
  let otp = otpArr.join("");
  return parseInt(otp);
};

module.exports = generateOtp;
