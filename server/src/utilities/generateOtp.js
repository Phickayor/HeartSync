const generateOtp = (otpLength) => {
  var otpArr = [];
  for (var i = 0; i < otpLength; i++) {
    otpArr.push(Math.floor(Math.random() * 9));
  }
  var otp = otpArr.join("");
  return parseInt(otp);
};

module.exports = generateOtp;
