import {ClaimsList} from '../components/ClaimsList'
import {useDataStore} from '../store/data-store/data-store.ts'


export const ClaimsPage = () => {
    const loading = useDataStore(state => state.loading)
    const countItems = useDataStore(store => store.countItems)


    const handleClick = () => {
        const countClaim = document.body
        if (countClaim) {
            countClaim.scrollIntoView({behavior: 'smooth'})
        }
    }

    return (
        <>
            {!loading && countItems > 0 &&
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


