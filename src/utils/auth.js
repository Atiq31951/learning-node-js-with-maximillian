const isLoggedIn = false;
const isAdmin = false;

const getCookiesObject = (request) => {
  const cookies = request.get("Cookie");
  const cookiesAsObject = {};
  if (cookies && cookies.length) {
    const cookiesArr = cookies.split(";");
    cookiesArr.forEach((cookieStr) => {
      const makeArr = cookieStr.split("=");
      cookiesAsObject[makeArr[0].trim()] = makeArr[1];
    });
  }
  return cookiesAsObject;
};

const getSixDigitOTP = () => {
  const RandomGeneratedString = (
    Math.random(100) * new Date().getTime()
  ).toString();
  let fixedLengthString = RandomGeneratedString;
  if (RandomGeneratedString.includes(".")) {
    const splitedStringArr = RandomGeneratedString.split(".");
    fixedLengthString = splitedStringArr[0] + fixedLengthString[1];
  }
  return fixedLengthString.substr(0, 6);
};

getLoggedIn = () => {
  return isLoggedIn;
};

module.exports = {
  getCookiesObject,
  getLoggedIn,
  getSixDigitOTP,
};
