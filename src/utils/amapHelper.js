import AMapLoader from "@amap/amap-jsapi-loader";

window._AMapSecurityConfig = {
  securityJsCode: "",
};

const initAmap = async () => {
  return await AMapLoader.load({
    key: "", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  });
};

const amap = await initAmap();

//地理编码
export const initGeocoder = (city = "全国") => {
  let geocoder;
  amap.plugin("AMap.Geocoder", function () {
    geocoder = new amap.Geocoder({
      // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
      city,
      batch: true,
    });
  });
  return geocoder;
};

//关键字搜搜
export const initPlaceSearch = (
  city = "全国",
  lang = "zh_cn",
  extensions = "base"
) => {
  //   const placeSearch = new amap.PlaceSearch({
  //     // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
  //     city,
  //   });
  let placeSearch;
  amap.plugin("AMap.PlaceSearch", function () {
    placeSearch = new amap.PlaceSearch({
      city,
      lang,
      extensions,
    });
  });
  return placeSearch;
};

//天气
export const initWeather = () => {
  let weather;
  amap.plugin("AMap.Weather", () => {
    weather = new amap.Weather();
  });
  return weather;
};
