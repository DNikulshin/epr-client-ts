import { Map, YMaps, Placemark, GeolocationControl } from '@pbe/react-yandex-maps'

interface MapProps {
    coordinates: {
        lat: number
        lon: number
    }

}

export const MapItem = ({coordinates}: MapProps) => {

    return (
        <div className="map" style={{
        }}>
            <h2>Yandex Maps</h2>
            <YMaps>
                <Map defaultState={{center: [coordinates.lat, coordinates.lon], zoom: 14}} width="75vw" id="map-item">
                    <Placemark geometry={[coordinates.lat, coordinates.lon]} />
                    <GeolocationControl/>
                </Map>
            </YMaps>
        </div>
    )
}

