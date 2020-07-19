const isLoggedIn = false;
const isAdmin = false;

const getCookiesObject = (request) => {
  const cookies = request.get("Cookie")
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

getLoggedIn = () => {
  return isLoggedIn;
}

module.exports = {
  getCookiesObject,
  getLoggedIn,
};