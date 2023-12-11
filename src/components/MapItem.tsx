import { useCallback, useEffect, useRef } from 'react'
import { Map, YMaps, SearchControl, Placemark, GeolocationControl } from '@pbe/react-yandex-maps'


const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 5,
};

export const MapItem = ({ detail }) => {
    const searchRef = useRef(null)

    const coordinateOne = +detail.toString()?.split(',')[0] || []
    const coordinateTwo = +detail.toString()?.split(',')[1] || []

    const setCoordinates = useCallback(() => {
        searchRef.current = detail
        console.log(detail)
        return searchRef.current

    }, [detail])

    useEffect(() => {
        searchRef.current = detail
    }, [detail])

    return (
        <div className="map">
            <h2>Yandex Map</h2>
            <YMaps>
                <Map defaultState={defaultState}>
                    <Placemark geometry={[55.684758, 37.738521]} />
                </Map>
            </YMaps>
        </div>
    )
}

