import { Button } from "antd";
import React, { useState, useEffect } from "react";
import "./CookiesSetup.scss";
//  <script>
const cook = document.cookie
  .split(";")
  .map((cookie) => cookie.split("="))
  .reduce(
    (accumulator, [key, value]) => ({
      ...accumulator,
      [key.trim()]: decodeURIComponent(value),
    }),
    {}
  );

//     // creating a cookie
// document.cookie = "seniore=//////shshhshshhs";
//   </script>
const CookiesSetup = () => {
  const cookieStorage = {
    getItem: (item) => {
      const cookies = document.cookie
        .split(";")
        .map((cookie) => cookie.split("="))
        .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
      return cookies[item];
    },
    setItem: (item, value) => {
      document.cookie = `${item}=${value};`;
    },
  };

  const storageType = cookieStorage;
  const consentPropertyName = "acceptCookeStorage";
  const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
  const saveToStorage = () => storageType.setItem(consentPropertyName, true);

  const acceptFn = () => {
    saveToStorage(storageType);
    setTimeout(() => {
      setShowCookiesPopup(false);
    }, 1000);
  };
  window.onload = () => {
    if (shouldShowPopup(storageType)) {
      setTimeout(() => {
        setShowCookiesPopup(true);
      }, 1000);
    }
  };
  const [ShowCookiesPopup, setShowCookiesPopup] = useState(shouldShowPopup);
  return (
    <div>
      <div id="consent-popup" className={`${!ShowCookiesPopup && "hidden"}`}>
        <div className="cookiesConatiner">
          <h4>
            By using this site you agree to our
            <a href="#">Terms and Conditions</a>. Please
            <a id="accept" href="#" onClick={acceptFn}>
              Accept
            </a>{" "}
            these before using the site.
            <span className="Cookies_btn">
              <Button onClick={acceptFn} type="primary">
                Accept
              </Button>
              <Button onClick={acceptFn}>Decline</Button>
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};
export default CookiesSetup;
