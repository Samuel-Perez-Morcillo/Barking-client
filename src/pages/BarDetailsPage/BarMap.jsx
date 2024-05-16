import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
import { useEffect, useState } from "react"


const BarMap = ({ address }) => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDsI3rFC_Y0nwuiKtPsRePgOe15jqZRja4",
    })

    const [map, setMap] = useState(null)

    const onLoad = (map) => {
        setMap(map)
    }

    const onUnmount = () => {
        setMap(null)
    }



    return (

        <div className="BarMap">
            {
                isLoaded && (

                    <GoogleMap
                        mapContainerStyle={{ height: '300px' }}
                        zoom={12}
                        onLoad={onLoad}
                        center={{ lat: address.latitude, lng: address.longitude }}
                        onUnmount={onUnmount}
                    >
                        <Marker position={{ lat: address.latitude, lng: address.longitude }} />

                    </GoogleMap>
                )}
        </div>
    )
}

export default BarMap