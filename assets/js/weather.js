/* ==========================================================================
   weather.js
   - 대전(Daejeon) 지역 날씨를 가져와 Hero 하단 정보바에 표시
   - 날씨 상태에 따라 강아지 케어 멘트가 자동으로 바뀜

   [사용 방법]
   1. https://openweathermap.org 에서 무료 API 키 발급
   2. 아래 API_KEY 자리에 발급받은 키를 그대로 붙여넣기
   3. USE_REAL_API 를 true로 변경
   그러면 바로 실시간 대전 날씨로 전환됩니다. (그 전까지는 더미 데이터로 동작)
   ========================================================================== */

(() => {
  // ▼▼▼ API 키 발급받으면 여기에 넣어주세요 ▼▼▼
  const API_KEY = "5bc3aefbf6975f82f260043f6132ea00";
  const USE_REAL_API = true; // API_KEY 입력 후 true로 변경
  const CITY = "Daejeon,KR";
  // ▲▲▲ ▲▲▲

  const WEATHER_CONFIG = {
    Clear: {
      icon: "./assets/images/icons/weather/icon-weather-clear.svg",
      label: "맑음",
      tips: [
        "맑은 날씨엔 산책하기 좋아요! 자외선 차단에도 신경 써주세요.",
        "산책하기 좋은 날이에요. 충분한 물도 챙겨주세요.",
      ],
    },
    Clouds: {
      icon: "./assets/images/icons/weather/icon-weather-clouds.svg",
      label: "흐림",
      tips: [
        "흐린 날엔 기온 변화가 있을 수 있어요. 가벼운 외투를 챙겨주세요.",
        "구름이 많은 날이에요. 산책 후 발과 털을 살펴봐주세요.",
      ],
    },
    Rain: {
      icon: "./assets/images/icons/weather/icon-weather-rain.svg",
      label: "비",
      tips: [
        "산책 후에는 발과 털을 깨끗하게 관리해주세요.",
        "비 오는 날엔 발바닥 사이 물기를 꼭 닦아주세요.",
      ],
    },
    Drizzle: {
      icon: "./assets/images/icons/weather/icon-weather-rain.svg",
      label: "약한 비",
      tips: ["산책 후에는 발과 털을 깨끗하게 관리해주세요."],
    },
    Thunderstorm: {
      icon: "./assets/images/icons/weather/icon-weather-thunder.svg",
      label: "뇌우",
      tips: ["천둥이 칠 땐 강아지가 불안할 수 있어요. 실내에서 안정시켜주세요."],
    },
    Snow: {
      icon: "./assets/images/icons/weather/icon-weather-snow.svg",
      label: "눈",
      tips: [
        "눈 오는 날엔 염화칼슘이 발에 닿지 않도록 산책 후 꼭 씻겨주세요.",
        "발바닥이 시릴 수 있어요. 산책 시간을 짧게 조절해주세요.",
      ],
    },
    Mist: {
      icon: "./assets/images/icons/weather/icon-weather-mist.svg",
      label: "안개",
      tips: ["안개가 많은 날엔 산책 시 차량 주의가 필요해요."],
    },
    Haze: {
      icon: "./assets/images/icons/weather/icon-weather-mist.svg",
      label: "흐림",
      tips: ["미세먼지가 있을 수 있어요. 산책 후 발과 털을 닦아주세요."],
    },
    Fog: {
      icon: "./assets/images/icons/weather/icon-weather-mist.svg",
      label: "안개",
      tips: ["안개가 많은 날엔 산책 시 차량 주의가 필요해요."],
    },
  };

  const DEFAULT_WEATHER_KEY = "Clouds";

  async function fetchWeather() {
    if (USE_REAL_API && API_KEY) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=kr`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("날씨 정보를 가져오지 못했습니다.");
      const data = await res.json();
      return {
        tempC: Math.round(data.main.temp),
        weatherKey: data.weather[0].main,
      };
    }

    // ---- 더미 데이터 (API 키 입력 전까지 임시 사용) ----
    await new Promise((resolve) => setTimeout(resolve, 200));
    return { tempC: 19, weatherKey: "Rain" };
  }

  function renderWeather({ tempC, weatherKey }) {
    const config = WEATHER_CONFIG[weatherKey] || WEATHER_CONFIG[DEFAULT_WEATHER_KEY];

    const iconEl = document.getElementById("weatherIcon");
    const tempEl = document.getElementById("weatherTemp");
    const tipEl = document.getElementById("weatherTip");

    if (iconEl) {
      iconEl.src = config.icon;
      iconEl.alt = config.label;
    }
    if (tempEl) {
      tempEl.textContent = `${tempC}℃`;
    }
    if (tipEl) {
      const tips = config.tips;
      tipEl.textContent = tips[Math.floor(Math.random() * tips.length)];
    }
  }

  async function initWeatherWidget() {
    try {
      const data = await fetchWeather();
      renderWeather(data);
    } catch (err) {
      console.error("[weather.js] 날씨 정보를 불러오지 못했습니다:", err);
      renderWeather({ tempC: 19, weatherKey: DEFAULT_WEATHER_KEY });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initWeatherWidget();
    setInterval(initWeatherWidget, 30 * 60 * 1000); // 30분마다 갱신
  });
})();
