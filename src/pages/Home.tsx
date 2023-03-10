import React, { useEffect, useState } from "react";
import { Weather } from "../types/WeatherType";
import { API_URL } from "../mars-weather-api";
import { formatDate } from "../helpers";
import BGImage from '../img/mars.jpg';
import {
    AppWrapper,
    GlobalStyle,
    InfoWrapper,
    MarsWeather,
    Spinner
} from "../App.styles";
import { Info, Previous, Unit, WeatherData } from '../components/index';

const Home = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [weather, setWeather] = useState<Weather[] | []>([]);
    const [selectedSol, setSelectedSol] = useState<number>(0);
    const [metric, setMetric] = useState<boolean>(true);
    const [previous, setPrevious] = useState<boolean>(false);

    useEffect(() => {
        const fetchFromAPI = async () => {
            // first "await": wait for data to be retrieved from API
            // second "await": wait for data to be converted to json
            const res = await fetch(API_URL);
            const weather = await res.json();
            const marsWeather = weather.sol_keys.map((key: string) => {
                return {
                    sol: key,
                    maxTemp: weather[key].AT?.mx ?? "No data",
                    minTemp: weather[key].AT?.mn ?? "No data",
                    windSpeed: Math.round(weather[key].HWS?.av ?? 0),
                    windDirectionDegrees:
                        weather[key].WD?.most_common?.compass_degrees ?? 0,
                    date: formatDate(new Date(weather[key].First_UTC))
                };
            });
            setWeather(marsWeather);
            // set the default selected day to the most recent/latest
            setSelectedSol(marsWeather.length - 1);
            setLoading(false);
        }

        fetchFromAPI();
    }, []);

    return (
        <>
            <GlobalStyle bgImage={BGImage} />
            <AppWrapper data-testid="app-wrapper">
                <MarsWeather data-testid="mars-weather">
                    {loading ? (
                        <Spinner data-testid="spinner" />
                    ) : (
                        <>
                            <h1 className="main-title">
                                Derni??re m??t??o pour Elysium Plantitia
                            </h1>
                            <WeatherData sol={weather[selectedSol]} isMetric={metric} />
                            <InfoWrapper>
                                <Info />
                                <Unit metric={metric} setMetric={setMetric} />
                            </InfoWrapper>
                        </>
                    )}
                </MarsWeather>
                <Previous
                    weather={weather}
                    previous={previous}
                    setPrevious={setPrevious}
                    setSelectedSol={setSelectedSol}
                    isMetric={metric}
                />
            </AppWrapper>
        </>
    );

}

export default Home;