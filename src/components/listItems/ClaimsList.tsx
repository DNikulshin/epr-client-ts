import {useDataStore} from "../../store/data-store/data-store.ts"
import {PaginationListItems} from "./PaginationListItems.tsx"
import {ErrorItem} from "../error/ErrorItem.tsx";

export const ClaimsList = () => {
    const countItems = useDataStore(state => state.countItems)
    const loading = useDataStore(state => state.loading)
    const error = useDataStore(state => state.error)

    const handleClick = () => {
        const countClaim = document.body
        if (countClaim) {
            countClaim.scrollIntoView({behavior: 'smooth'})
        }
    }

    if (loading) {
        return <div className='text-center mt-5 position-relative' style={{
            transform: 'translateX(40%)'
        }}>
            <span className="loader"></span>
        </div>
    }


    if (!countItems && !loading) {
        if (error === 'ERR_NETWORK') {
            return  <ErrorItem text={'Неполадки в сети...!'}/>
        }
        return <ErrorItem text={'Заявок нет!'}/>
    }

    return (
        <>
            {!loading && countItems > 0 &&
                <div className="bg-light p-2 text-center">Всего:&nbsp;<strong
                    className="text-success mx-4">{countItems}</strong>
                </div>
            }
              <PaginationListItems itemsPerPage={5}/>
            {!loading && countItems >= 3 &&
                <div className="text-center">
                    <button type="button" className="btn btn-sm btn-primary mb-3 mt-2 btn-hover"
                            onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                             className="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                        </svg>
                    </button>
                </div>
            }

        </>
    )
}


