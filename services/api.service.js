// import https from 'https'
import axios from "axios";
import { DATA_DICTIONARY, getKeyValue } from "./storage.service.js";

export const getWeather = async () => {
	const token = process.env.WEATHER_TOKEN
		? process.env.WEATHER_TOKEN
		: await getKeyValue(DATA_DICTIONARY.TOKEN);
	if (!token) {
		throw new Error(
			"Не задан ключ API. Задайте его через команду -t [API_KEY]"
		);
	}

	const city = process.env.CITY
		? process.env.CITY
		: await getKeyValue(DATA_DICTIONARY.CITY);
	if (!city) {
		throw new Error("Не задан город. Задайте его через команду -c [CITY_NAME]");
	}
	const { data } = await axios.get(
		"https://api.openweathermap.org/data/2.5/weather",
		{
			params: {
				q: city,
				appid: token,
				lang: "ru",
				units: "metric",
			},
		}
	);

	return data;
	// const url = new URL('https://api.openweathermap.org/data/2.5/weather')
	// url.searchParams.append('q', city)
	// url.searchParams.append('appid', token)
	// url.searchParams.append('lang', 'ru')
	// url.searchParams.append('units', 'metric')

	// https.get(url, resp => {
	//     let res = ''
	//     resp.on('data', chunk => res += chunk)
	//     resp.on('end', () => {
	//         console.log(res)
	//     })
	//     resp.on('error', () => {
	//         console.log(res)
	//         throw new Error('Не удалось загрузить данные =(')
	//     })
	// })
};
