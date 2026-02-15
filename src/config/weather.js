const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getNearestForecast = (list, eventDate) => {
  if (!Array.isArray(list) || list.length === 0) {
    return null;
  }

  const targetTime = new Date(eventDate).getTime();
  let nearest = list[0];
  let nearestDiff = Math.abs(new Date(list[0].dt_txt).getTime() - targetTime);

  for (const item of list) {
    const itemDiff = Math.abs(new Date(item.dt_txt).getTime() - targetTime);
    if (itemDiff < nearestDiff) {
      nearest = item;
      nearestDiff = itemDiff;
    }
  }

  return nearest;
};

const fetchWeatherForecastWithRetry = async (location, eventDate) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENWEATHER_API_KEY is not configured');
  }

  const maxAttempts = Number(process.env.OPENWEATHER_MAX_RETRIES || 3);
  const baseDelayMs = Number(process.env.OPENWEATHER_RETRY_BASE_MS || 500);

  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;
      const response = await fetch(url, { method: 'GET' });

      if (!response.ok) {
        throw new Error(`OpenWeather request failed with status ${response.status}`);
      }

      const data = await response.json();
      const nearest = getNearestForecast(data.list, eventDate);

      return {
        source: 'openweather',
        location: data.city?.name || location,
        country: data.city?.country || null,
        requested_event_date: eventDate,
        fetched_at: new Date().toISOString(),
        forecast: nearest
          ? {
              forecast_time: nearest.dt_txt,
              temp_c: nearest.main?.temp ?? null,
              feels_like_c: nearest.main?.feels_like ?? null,
              humidity: nearest.main?.humidity ?? null,
              weather: nearest.weather?.[0]?.description ?? null,
              wind_speed: nearest.wind?.speed ?? null
            }
          : null
      };
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        const delayMs = baseDelayMs * 2 ** (attempt - 1);
        await sleep(delayMs);
      }
    }
  }

  throw lastError;
};

module.exports = {
  fetchWeatherForecastWithRetry
};
