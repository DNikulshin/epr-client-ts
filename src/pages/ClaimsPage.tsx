import { useCallback, useEffect, useState } from 'react'

//import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { ClaimsList } from '../components/ClaimsList'
import { Navigation } from '../components/Navigation'
import {useAuthStore} from "../store/auth-store.ts";
import {useDataStore} from "../store/data-store.ts";

export const ClaimsPage = () => {
    const loading = useAuthStore(store => store.loading)
    const logout = useAuthStore(store => store.logout)
    const listItems = useDataStore(store => store.listItems)
    //const [claims, setClaims] = useState([])

   // const { loading, request } = useHttp()

    // const fetchClaims = useCallback(async () => {
    //     try {
    //         const data = JSON.parse(localStorage.getItem('storageBody') || '{}')
    //         const fetched = await request('/api/claim/me', 'POST', data)
    //         setClaims(fetched)
    //     } catch (e) {
    //     }
    // }, [request])

    const handleClick = () => {
        const countClaim = document.querySelector('.container')
        if(countClaim) {
          countClaim.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // useEffect(() => {
    //     fetchClaims()
    // }, [fetchClaims])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
       <Navigation getListItems={[]} buttonTypeText='Все заявки' linkTo='/all' currentRoute='/' logout={logout}/>
    
                {listItems.length > 0 &&
                    <div className="bg-light p-2 text-center">Всего:&nbsp;<strong
                        className="text-success mx-4">{listItems.length}</strong>
                    </div>
                }
                {/* any type a and b */}
                { !loading && <ClaimsList claims={listItems.sort((a: any, b: any) => a.setDate.localeCompare(b.setDate))}/> }

                { !loading && listItems.length >= 3 &&
                    <div className="text-center">
                        <button type="button" className="btn btn-primary my-3 btn-hover" onClick={handleClick}><i
                            className="bi bi-arrow-up"/></button>
                    </div>
                }

        </>
    )
}


