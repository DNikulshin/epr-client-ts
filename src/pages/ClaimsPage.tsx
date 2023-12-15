import { useCallback, useEffect, useState } from 'react'

import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { ClaimsList } from '../components/ClaimsList'
import { Navigation } from '../components/Navigation'

export const ClaimsPage = () => {
   // const auth = useContext(AuthContext)
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
        <Navigation fetchClaims={fetchClaims} buttonTypeText='Все заявки' linkTo='/all' currentRoute='/'/>
    
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


