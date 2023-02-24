import React from "react";
import { displaySpeed, formatTemperature } from "../../helpers";
import { Date, Temp, Wind, Wrapper } from "./WeatherDataStyles";
import { WeatherDataProps } from "../../types/WeatherDataProps";

const WeatherData = ({ sol, isMetric }: WeatherDataProps): JSX.Element => (
    <Wrapper>
        {sol ? (
            <>
                <Date>
                    <h2>{sol.sol}</h2>
                    <p>{sol.date.toString()}</p>
                </Date>
                <Temp>
                    <h2 className="section-title">Temp</h2>
                    <p className="reading">
                        Max: {" "}
                        <span>
                            {/* Si sol.maxTemp est de type "number" alors on fait la fonction formatTemperature */}
                            {/* sinon on renvoie sol.maxTemp avec "Pas de donnée" */}
                            {typeof sol.maxTemp === "number"
                                ? formatTemperature(sol.maxTemp, isMetric)
                                : sol.maxTemp}
                        </span>
                        <span> {isMetric ? " °C" : " °F"}</span>
                    </p>
                    <p className="reading">
                        Min:
                        <span>
              {" "}
                            {typeof sol.minTemp === "number"
                                ? formatTemperature(sol.minTemp, isMetric)
                                : sol.minTemp}
            </span>
                        <span> {isMetric ? " °C" : " °F"}</span>
                    </p>
                </Temp>

                <Wind deg={sol.windDirectionDegrees}>
                    <h2 className="section-title">Vent</h2>
                    <p className="reading">
                        <span>{displaySpeed(sol.windSpeed, isMetric)}</span>
                        <span>{isMetric ? " kph" : " mph"}</span>
                    </p>

                    <div className="wind__direction">
                        <div className="wind__arrow"></div>
                    </div>
                </Wind>
            </>
        ) : (
            <h2>Pas de données</h2>
        )}
    </Wrapper>
)

export default WeatherData;