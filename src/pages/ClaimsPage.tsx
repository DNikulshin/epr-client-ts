import { useCallback, useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { ClaimsList } from '../components/ClaimsList'

export const ClaimsPage = () => {
    const auth = useContext(AuthContext)
    const [claims, setClaims] = useState([])

    const { loading, request } = useHttp()

    const fetchClaims = useCallback(async () => {
        try {
            const data = JSON.parse(localStorage.getItem('storageBody') || '{}') 
            const fetched = await request('/api/claim/me', 'POST', data)
            setClaims(fetched)
        } catch (e) {
        }
    }, [request])

    const handleClick = () => {
        const countClaim = document.querySelector('.container')
        if(countClaim) {
          countClaim.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        fetchClaims()
    }, [fetchClaims])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
                <div className="d-flex justify-content-center text-center gap-4 align-items-center bg-secondary bg-opacity-50 w-100 flex-nowrap rounded">
                    <Link to="/" className="btn btn-primary fs-4 my-3 mx-3 btn-hover btn-shadow" onClick={fetchClaims}>
                        <i className="bi bi-arrow-clockwise"/>
                    </Link>
                    <Link to="/all" className="d-flex btn btn-sm btn-success btn-outline-success btn-hover text-white fs-6 flex-nowrap btn-shadow">Все заявки</Link>
                    <Link
                        className="btn btn-sm btn-danger text-white btn-shadow"
                        to="/"
                        title="Выйти"
                        onClick={auth.logout}
                    >
                        Выйти
                    </Link>
                </div>
                {claims.length > 0 &&
                    <div className="bg-light p-2 text-center">Всего:&nbsp;<strong
                        className="text-success mx-4">{claims.length}</strong>
                    </div>
                }
                {/* any type a and b */}
                { !loading && <ClaimsList claims={claims.sort((a: any, b: any) => a.setDate.localeCompare(b.setDate))}/> }

                { !loading && claims.length >= 3 &&
                    <div className="text-center">
                        <button type="button" className="btn btn-primary my-3 btn-hover" onClick={handleClick}><i
                            className="bi bi-arrow-up"/></button>
                    </div>
                }

        </>
    )
}


