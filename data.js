

const key = 'fad974cef9f040f5b3a233026251806'

export async function getDataC(cityName) {
    //get request to fetch the data in json form
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cityName}&days=7`)

    //throwing error manually
    if (!response.ok) {
        throw Error('There are no such city!!')
    }

    //transforming the data from json
    const cityData = await response.json()


    //getting only the wanted data from each day
    //for the small cards on the top
    const weekDays = cityData.forecast.forecastday.map((day) => ({
        date: day.date,
        icon: day.day.condition.icon,
        avgtemp: day.day.avgtemp_c,

    }))


    //the complete city forecast object
    const cityForecast = {
        //about the place we want to see the weather in
        place_info: {
            city: cityData.location.name,
            country: cityData.location.country,
            local_time: cityData.location.localtime
        },
        //info about the current day
        current: {
            date: cityData.location.localtime,
            condition_Text: cityData.current.condition.text,
            icon: cityData.current.condition.icon,
            temp: cityData.current.temp_c+'&deg;c',
            maxTemp: cityData.forecast.forecastday[0].day.maxtemp_c,
            minTemp: cityData.forecast.forecastday[0].day.mintemp_c,
            humidity: cityData.current.humidity,
            sunrise: cityData.forecast.forecastday[0].astro.sunrise,
            sunset: cityData.forecast.forecastday[0].astro.sunset,
            chance_of_rain: cityData.forecast.forecastday[0].day.daily_chance_of_rain
        },

        //info about seven days
        //including today and six days after
        weekDaysForecast: weekDays


    }

    return cityForecast


}

export async function getDataF(cityName) {
    //get request to fetch the data in json form
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cityName}&days=7`)

    //throwing error manually
    if (!response.ok) {
        throw Error('There are no such city!!')
    }

    //transforming the data from json
    const cityData = await response.json()


    //getting only the wanted data from each day
    //for the small cards on the top
    const weekDays = cityData.forecast.forecastday.map((day) => ({
        date: day.date,
        icon: day.day.condition.icon,
        avgtemp: day.day.avgtemp_f

    }))


    //the complete city forecast object
    const cityForecast = {
        //about the place we want to see the weather in
        place_info: {
            city: cityData.location.name,
            country: cityData.location.country,
            local_time: cityData.location.localtime
        },
        //info about the current day
        current: {
            date: cityData.location.localtime,
            condition_Text: cityData.current.condition.text,
            icon: cityData.current.condition.icon,
            temp: cityData.current.temp_f+'&deg;f',
            maxTemp: cityData.forecast.forecastday[0].day.maxtemp_f,
            minTemp: cityData.forecast.forecastday[0].day.mintemp_f,
            humidity: cityData.current.humidity,
            sunrise: cityData.forecast.forecastday[0].astro.sunrise,
            sunset: cityData.forecast.forecastday[0].astro.sunset,
            chance_of_rain: cityData.forecast.forecastday[0].day.daily_chance_of_rain
        },

        //info about seven days
        //including today and six days after
        weekDaysForecast: weekDays


    }

    return cityForecast
}

