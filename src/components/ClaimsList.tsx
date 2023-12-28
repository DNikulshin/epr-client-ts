import {useDataStore} from "../store/data-store/data-store.ts"
import {Pagination} from "./Pagination.tsx"

export const ClaimsList = () => {
    const countItems = useDataStore(state => state.countItems)
    const loading = useDataStore(state => state.loading)

    if (loading) {
        return <div className='text-center mt-5 position-relative' style={{
            transform: 'translateX(40%)'
        }}>
            <span className="loader"></span>
        </div>
    }


    if (!countItems && !loading) {

        return <>

            <h3 className="text-danger text-center mt-5">
                <br/>
                Заявок нет!
            </h3>
        </>
    }

    return (
        <>
            <Pagination itemsPerPage={5}/>
        </>
    )
}


