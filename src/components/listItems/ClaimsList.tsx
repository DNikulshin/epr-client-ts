import {useDataStore} from "../../store/data-store/data-store.ts"
import {PaginationListItems} from "./PaginationListItems.tsx"
import {ErrorItem} from "../error/ErrorItem.tsx"

export const ClaimsList = () => {
    const countItems = useDataStore(state => state.countItems)
    const loading = useDataStore(state => state.loading)
    const error = useDataStore(state => state.error)




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
            {countItems && <PaginationListItems itemsPerPage={5} />}

        </>
    )
}


