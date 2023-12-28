import {ClaimsItem} from './ClaimsItem'
import {useDataStore} from "../store/data-store/data-store.ts"


import {Iitem} from "../store/data-store/types.ts"

export const ClaimsList = () => {
    const listItems: Iitem[] = useDataStore(state => state.listItems)
    const countItems = useDataStore(state => state.countItems)

    const loading = useDataStore(state => state.loading)

    if (loading) {
        return <div className='text-center mt-5 position-relative' style={{
            transform: 'translateX(50%)'
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
    console.log(listItems)
    return (
        <>
            {countItems &&
                listItems
                    .sort((a, b) => a.date?.todo.localeCompare(b.date?.todo))
                    .map((item, idx) => {
                        return (
                            <div className="accordion d-flex flex-column my-2" key={item.id}>
                                {<ClaimsItem {...item} index={idx}/>}
                            </div>
                        )
                    })

            }
        </>
    )
}


