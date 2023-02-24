import React from "react";
import { Weather } from "./WeatherType";

export type PreviousProps = {
    isMetric: boolean
    previous: boolean
    setPrevious: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedSol: React.Dispatch<React.SetStateAction<number>>
    weather: Weather[]
}