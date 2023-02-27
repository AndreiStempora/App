import { IonItem, IonLabel } from "@ionic/react"
import { useEffect, useState } from "react"

const VehicleSearchItem = ({ vehicle, match, click }) => {
    const [vin, setVin] = useState(vehicle.vehicle_vin)
    const [stock, setStock] = useState(vehicle.vehicle_stock)

    const emboldMatchingString = (string) => {
        if (string?.toUpperCase().startsWith(match.toUpperCase())) {
            const stringArray = string.toUpperCase().split(match.toUpperCase());
            return <>{stringArray[0]}<span className="matched" data-highlight={string}>{match.toUpperCase()}</span>{stringArray[1]}</>
        }
        return string;
    }

    useEffect(() => {
        setVin(emboldMatchingString(vehicle.vehicle_vin))
        setStock(emboldMatchingString(vehicle.vehicle_stock))
    }, [match])


    return (
        <IonItem button={true} onClick={() => click(vehicle.vehicle_vin)} className='search-result-element'>
            <IonLabel>
                <div className="element-name">
                    {vehicle.vehicle_make} {vehicle.vehicle_model} {vehicle.vehicle_trim}
                </div>
                <div className="element-search">
                    <span className="element-vin">
                        <span className="name">
                            Vin:
                        </span>
                        <span className="value">
                            {vin}
                        </span>
                    </span>
                    <span className="element-stock">
                        <span className="name">
                            Stock:
                        </span>
                        <span className="value">
                            {stock}
                        </span>
                    </span>
                </div>
            </IonLabel>
        </IonItem>
    )
}

export default VehicleSearchItem