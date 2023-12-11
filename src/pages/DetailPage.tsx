import { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Link, useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'

export const DetailPage = () => {
    const { request, loading } = useHttp()
    const [detail, setDetail] = useState(null)
    const detailId = useParams().id

    const getDetail = useCallback(async () => {
        try {
            const data = JSON.parse(localStorage.getItem('storageBody') || '{}') 
            const fetched = await request(`/api/claim/detail/${detailId}`, 'POST', data)
            setDetail(fetched)
        } catch (e) {
        }
    }, [detailId, request])

    useEffect(() => {
        getDetail()
    }, [getDetail])

    if (loading) {
        return <Loader/>
    }
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <Link to="/" className="text-center my-3"><i className="bi bi-house-fill fs-2 font-size-home"></i></Link>
                <h3>Описание:</h3>
                <div className="mb-5">
                    {detail && detail.map((el, idx) => {
                        return <>
                            <div className="card my-2 p-3 border-primary box-shadow" key={idx}>
                                {el}
                            </div>
                        </>
                    })}
                </div>
            </div>
        </>
    )
}
