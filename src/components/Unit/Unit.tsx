import React from "react";
import { UnitStyles, Toggle } from "./UnitStyles";
import { UnitProps } from "../../types/UnitProps";

const Unit = ({ metric, setMetric }: UnitProps): JSX.Element => (
    <UnitStyles>
        <label htmlFor="cel">°C</label>
        <Toggle metric={metric} onClick={() => setMetric((prev) => !prev)} />
        <label htmlFor="fah">°F</label>
    </UnitStyles>
)

export default Unit;