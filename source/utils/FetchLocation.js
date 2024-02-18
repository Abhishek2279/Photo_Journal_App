import { getLocation } from "react-native-weather-api";

export const fetchLocation = async () => {
    try {

        const location = await getLocation()

        const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + location.coords.latitude + '&lon=' + location.coords.longitude + '&units=metric&appid=21fa82bf9ef5a3c1906298df59912b25';

        const response = await fetch(url)
        return response.json()
    } catch (error) {
        throw error
    }

}