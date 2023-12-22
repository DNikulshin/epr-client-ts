import { useEffect } from 'react'
import { ClaimsList } from '../components/ClaimsList'
import {useDataStore} from '../store/data-store/data-store.ts'

export const ClaimsPage = () => {
    const loading = useDataStore(state => state.loading)
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

    return (
        <>
                {!loading && countItems &&
                    <div className="bg-light p-2 text-center">Всего:&nbsp;<strong
                        className="text-success mx-4">{countItems}</strong>
                    </div>
                }
                <ClaimsList/>

                {!loading && countItems >= 3 &&
                    <div className="text-center">
                        <button type="button" className="btn btn-primary my-3 btn-hover" onClick={handleClick}><i
                            className="bi bi-arrow-up"/></button>
                    </div>
                }

        </>
    )
}


