import React from "react";
import { InfoStyles } from "./InfoStyles";

const Info = (): JSX.Element => (
    <InfoStyles>
        <p>
            InSight prend des mesures météorologiques quotidiennes (température, vent, pression) sur la surface de Mars
            à Elysium Planitia, une plaine plate et lisse près de l'équateur de Mars.
        </p>
        <p>
            Malheureusement l'API à cessé de fonctionner.{" "}
            <a href="https://mars.nasa.gov/insight/mission/overview/">Cliquez ici</a>{" "}
            pour avoir plus d'information à propos de la mission InSight.
        </p>
    </InfoStyles>
)

export default Info;