import chalk from 'chalk'
import dedent from 'dedent-js'

export const printError = (error) => {
    console.log(chalk.bgRed('[ERROR]'), error)
}

export const printSuccess = (message) => {
    console.log(chalk.bgGreen('[SUCCESS]'), message)
}

export const printHelp = () => {
    console.log(
        dedent`
        ${chalk.bgCyan('[HELP]')}
        Без параметров - вывод погоды
        -c [CITY_NAME] - установка города
        -t [TOKEN] - установка токена openWeather
        -h - помощь'
        `
    )
}

export const printWeather = (weatherObj) => {
    const {weather,wind,main, name} = weatherObj

    const description = weather[0].description
    const {temp,feels_like} = main;
    const {speed} = wind;
    const icon = getIcon(weather[0].icon)
    console.log(
        dedent`
        ${chalk.bgCyan(`[ПОГОДА в ${name.toUpperCase()}]`)}
        ${icon.repeat(3)} ${description.charAt(0).toUpperCase() + description.slice(1)};
        Температура: ${temp};
        Ощущается как: ${feels_like};
        Скорость ветра: ${speed}м/с;
        `
    )
}

export const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case "01":
			return "☀️";
		case "02":
			return "🌤️";
		case "03":
			return "☁️";
		case "04":
			return "☁️";
		case "09":
			return "🌧️";
		case "10":
			return "🌦️";
		case "11":
			return "🌩️";
		case "13":
			return "❄️";
		case "50":
			return "🌫️";
		default:
			return "";
	}
};