export default {
  //key
  qWeatherApiKey: "",
  //api
  qWeatherApiUrl: "https://devapi.qweather.com/v7/weather/",

  async getCurrentWeatherData(query) {
    return await this.fetchWeatherData(query, "now");
  },

  async getDailyWeatherData(query) {
    return await this.fetchWeatherData(query, "7d");
  },

  async getHourlyWeatherData(query) {
    return await this.fetchWeatherData(query, "24h");
  },

  async fetchWeatherData({ lng, lat }, api = "now") {
    try {
      const getWeatherQuery = {
        location: `${lng},${lat}`,
        key: this.qWeatherApiKey,
      };
      const formatUrlParams = new URLSearchParams(getWeatherQuery).toString();
      const response = await fetch(
        `${this.qWeatherApiUrl}${api}?${formatUrlParams}`
      );
      if (!response.ok) {
        throw new Error("Fetch获取数据时出错");
      }
      return response.json();
    } catch (err) {
      console.log(err);
    }
  },
};
