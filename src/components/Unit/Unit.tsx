import React from "react"
import { UnitStyles, Toggle } from "./UnitStyles"

type UnitProps = {
    metric: boolean
    setMetric: React.Dispatch<React.SetStateAction<boolean>>
}

const Unit = ({ metric, setMetric }: UnitProps): JSX.Element => (
    <UnitStyles>
        <label htmlFor="cel">°C</label>
        <Toggle metric={metric} onClick={() => setMetric((prev) => !prev)} />
        <label htmlFor="fah">°F</label>
    </UnitStyles>
)

export default Unit