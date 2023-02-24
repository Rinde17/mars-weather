import React from "react";
import { PreviousWrapper, Toggle, PreviousDays, PreviousDay } from "./PreviousStyles";
import { PreviousProps } from "../../types/PreviousProps";

const Previous = ({
                      isMetric,
                      previous,
                      setPrevious,
                      setSelectedSol,
                      weather
                  }: PreviousProps): JSX.Element => (
    <PreviousWrapper previous={previous}>
        <Toggle
            className="weather-toggle"
            onClick={() => setPrevious((prev) => !prev)}
            previous={previous}
        >
            <span>&#8593;</span>
            <span className="sr-only">Show previous weather</span>
        </Toggle>

        <h2 className="main-title previous-weather__title">Les 7 derniers jours</h2>
        <PreviousDays>
            {weather.map((sol, i) => (
                <PreviousDay key={sol.sol} previous={previous}>
                    <h3 className="previous-day__sol">
                        <span>{sol.sol}</span>
                        <p className="previous-day__date">{sol.date.toString()}</p>
                        <p className="previous-day__temp">
                            Max:{" "}
                            <span>{sol.maxTemp}</span>
                            <span>{isMetric ? " °C" : " °C"}</span>
                        </p>
                        <p className="previous-day__temp">
                            Min:{" "}
                            <span>{sol.minTemp}</span>
                            <span>{isMetric ? " °C" : " °C"}</span>
                        </p>
                        <button
                            className="previous-day__more-info"
                            onClick={() => setSelectedSol(i)}
                        >
                            Afficher
                        </button>
                    </h3>
                </PreviousDay>
            ))}
        </PreviousDays>
    </PreviousWrapper>
)

export default Previous;