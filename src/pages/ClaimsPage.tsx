import { useCallback, useEffect, useState } from 'react'

//import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { ClaimsList } from '../components/ClaimsList'
import { Navigation } from '../components/Navigation'
import {useAuthStore} from "../store/auth-store.ts";
import {useDataStore} from "../store/data-store/data-store.ts";

export const ClaimsPage = () => {
    const loading = useAuthStore(store => store.loading)
    const logout = useAuthStore(store => store.logout)
    const listItems = useDataStore(store => store.listItems)
    const countItems = useDataStore(store => store.countItems)
    const getItems = useDataStore(state => state.getItems)

    const handleClick = () => {
        const countClaim = document.querySelector('.container')
        if(countClaim) {
          countClaim.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        getItems()
    }, [getItems])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
       <Navigation onClick={getItems} buttonTypeText='Все заявки' linkTo='/all' currentRoute='/' logout={logout}/>
    
                {countItems &&
                    <div className="bg-light p-2 text-center">Всего:&nbsp;<strong
                        className="text-success mx-4">{countItems}</strong>
                    </div>
                }
                {/* any type a and b */}
                { !loading && <ClaimsList listItems={listItems}/> }

                { !loading && countItems >= 3 &&
                    <div className="text-center">
                        <button type="button" className="btn btn-primary my-3 btn-hover" onClick={handleClick}><i
                            className="bi bi-arrow-up"/></button>
                    </div>
                }

        </>
    )
}


