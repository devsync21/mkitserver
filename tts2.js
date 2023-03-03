var tough = require("tough-cookie");
var Cookie = tough.Cookie;
var cookie = Cookie.parse(header);
cookie.value = "somethingdifferent";
header = cookie.toString();
var cookiejar = new tough.CookieJar();

// Asynchronous!
var cookie = await cookiejar.setCookie(
  cookie,
  "https://currentdomain.example.com/path"
);
var cookies = await cookiejar.getCookies("https://example.com/otherpath");

// Or with callbacks!
cookiejar.setCookie(
  cookie,
  "https://currentdomain.example.com/path",
  function (err, cookie) {
    /* ... */
  }
);
cookiejar.getCookies("http://example.com/otherpath", function (err, cookies) {
  /* ... */
});