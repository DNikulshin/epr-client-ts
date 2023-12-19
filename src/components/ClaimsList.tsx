import { ClaimsItem } from './ClaimsItem'
import {useDataStore} from "../store/data-store/data-store.ts"


import {Iitem} from "../store/data-store/types.ts"

export const ClaimsList = () => {
 const listItems: Iitem[] = useDataStore(state => state.listItems)
    const countItems = useDataStore(state => state.countItems)

    if (!countItems) {

        return <>
  
            <h3 className="text-danger text-center mt-5">
         {/*   <Link */}
         {/*   to="/" */}
         {/*   title="Очистить куки!">*/}
         {/*       <i */}
         {/*       className="fas fa-cookie-bite text-warning fs-1 ms-3 opacity-50 text-sh text-center" */}
         {/*       onClick={fetchCookie}*/}
         {/*       />*/}
         {/*</Link>*/}
         <br/>
                Заявок нет!
                </h3>
        </>
    }

    return (
        <>
            { countItems &&
                listItems.map((item, idx) => {
                return (
                    <div className="accordion d-flex flex-column my-2" key={item.id}>
                        <ClaimsItem {...item} index={idx}/>
                    </div>
                )
            })}
        </>
    )
}


