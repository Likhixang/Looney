/*
FROM:https://raw.githubusercontent.com/RuCu6/QuanX/main/Scripts/header.js
*/
// 2024-02-20 17:20

const url = $request.url;
const header = $request.headers;
const opt12306 = header["Operation-Type"] || header["operation-type"];
const ua = header["User-Agent"] || header["user-agent"];
const isQuanX = typeof $task !== "undefined";

if (url.includes("/mobile.12306.cn/otsmobile/app/mgs/")) {
  const list12306 = [
    // "com.cars.otsmobile.bangbangSafe.deciveInfo", 
    // "com.cars.otsmobile.checkLoginStatus", 
    // "com.cars.otsmobile.city",
    // "com.cars.otsmobile.initCountry",
    // "com.cars.otsmobile.initNewSysCache",
    // "com.cars.otsmobile.initProvince",
    "com.cars.otsmobile.integration.activityBanner", 
    "com.cars.otsmobile.memberInfo.getMemberQa", 
    // "com.cars.otsmobile.memberInfo.integrationHomeInit", 
    "com.cars.otsmobile.newHomePage.getWeatherByStationCode", 
    "com.cars.otsmobile.newHomePage.initData", 
    "com.cars.otsmobile.newHomePageBussData", 
    // "com.cars.otsmobile.newHomePageRefresh",
    "com.cars.otsmobile.travelPage.initData" 
  ];
  if (isQuanX) {
    if (list12306?.includes(opt12306)) {
      $done({ status: "HTTP/1.1 404 Not Found" });
    } else {
      $done({});
    }
  } else {
    if (list12306?.includes(opt12306)) {
      $done();
    } else {
      $done({});
    }
  }
} else {
  $done({});
}