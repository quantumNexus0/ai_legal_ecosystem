"use strict";
!(function () {
  var t = (window.LZWebsite || {}).cookieConsent || {};
  (t.locationTasks = {
    cookieName: "lzOtTestCookie",
    init: function () {
      t.locationTasks.setCookie(), t.locationTasks.setOneTrustVariable();
    },
    getCookieParam: function (o) {
      o = new RegExp(o + "=([^;]+)").exec(document.cookie);
      return null === o ? "" : o[1];
    },
    getQueryParam: function (o) {
      o = new RegExp("[\\?&]" + o + "=([^&#]*)").exec(location.search);
      return null === o ? "" : decodeURIComponent(o[1].replace(/\+/g, " "));
    },
    setCookie: function () {
      var o,
        e = t.locationTasks.getQueryParam("otState");
      !e ||
        ((o = t.locationTasks.getQueryParam("otCountry")) &&
          (t.locationTasks.writeCookie(
            t.locationTasks.cookieName + "=" + e + "," + o
          ),
          t.locationTasks.writeCookie("lzcountry=" + o)));
    },
    setOneTrustVariable: function () {
      var o = t.locationTasks.getCookieParam(t.locationTasks.cookieName);
      o &&
        ((o = o.split(",")),
        (window.OneTrust = {
          geolocationResponse: { stateCode: o[0], countryCode: o[1] },
        }));
    },
    writeCookie: function (o) {
      document.cookie = o + "; path=/; domain=.legalzoom.com";
    },
  }),
    t.locationTasks.init();
})();
