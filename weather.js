#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js";
import { DATA_DICTIONARY, saveKeyValue } from "./services/storage.service.js";

const ARGS_KEYS = {
	HELP: "h",
	CITY: "c",
	TOKEN: "t",
};

const saveToken = async (token) => {
	// Сохранение токена
	if (!token.length) {
		printError("Не передан токен");
		return;
	}
	try {
		await saveKeyValue(DATA_DICTIONARY.TOKEN, token);
		printSuccess("Токен успешно сохранен");
	} catch (error) {
		printError(error);
	}
};

const saveCity = async (cityName) => {
	// Сохранение токена
	if (!cityName.length) {
		printError("Не передан город");
		return;
	}
	try {
		await saveKeyValue(DATA_DICTIONARY.CITY, cityName);
		printSuccess("Город успешно сохранен");
	} catch (error) {
		printError(error);
	}
};

const getForecast = async () => {
    try {
        const weather = await getWeather(process.env.CITY);
        printWeather(weather)
    } catch (e) {
        if(e?.response?.status === 404){
            printError('Неверно указан город!')
        }else if(e?.response?.status === 401){
            printError('Неверно указан токен!')
        }else {
            printError(e.message)
        }
    }
};

const initCLI = async () => {
	const args = getArgs(process.argv);
	if (args[ARGS_KEYS.HELP]) {
		printHelp();
		return;
	}

	if (args[ARGS_KEYS.CITY]) {
		await saveCity(args[ARGS_KEYS.CITY]);
	}

	if (args[ARGS_KEYS.TOKEN]) {
		await saveToken(args[ARGS_KEYS.TOKEN]);
	}

	await getForecast()
};

initCLI();
