import React, {useCallback, useEffect, useState} from 'react'
import { useHttp } from '../hooks/http.hook'
import { Link, useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { MapItem } from '../components/MapItem'

export const MapPage = () => {
    const { request, loading } = useHttp()
    const [coordinates, setCoordinates] = useState(null)
    const coordinateId = useParams().id

    const getCoordinates = useCallback(async () => {
        try {
            const data = JSON.parse(localStorage.getItem('storageBody')  || '{}')
            const fetched = await request(`/api/claim/coordinates/${coordinateId}`, 'POST', data)
            setCoordinates(fetched)
        } catch (e) {}
    }, [coordinateId, request])

    useEffect(() => {
        getCoordinates()
    }, [getCoordinates])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <Link to="/"  className="text-center my-3"><i className="bi bi-house-fill fs-2 font-size-home"></i></Link>
                <strong className="my-2">Координаты:</strong>
                <div className="my-2 text-center cursor-pointer copy-text">&nbsp;{coordinates}</div>
                <MapItem detail={Object.values({ coordinates })}/>
            </div>
        </>
    )
}
