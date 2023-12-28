import {useState} from 'react'
import ReactPaginate from 'react-paginate'
import {useDataStore} from "../store/data-store/data-store.ts"
import {ClaimsItem} from "./ClaimsItem.tsx"

interface  itemsPerPageProps{
    itemsPerPage: number
}
export const  Pagination = ({itemsPerPage} : itemsPerPageProps) => {
    const [itemOffset, setItemOffset] = useState(0)
    const listItems = useDataStore(state => state.listItems)
    const countItems = useDataStore(state => state.countItems)
    const endOffset = itemOffset + itemsPerPage
    const currentItems = listItems.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(countItems / itemsPerPage)

    function Items() {
        return (
            <>
                {countItems &&
                    currentItems
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
        );
    }
    const handlePageClick = (event: { selected: number }) => {
        const countClaim = document.body
        if (countClaim) {
            countClaim.scrollIntoView({behavior: 'smooth'})
        }
        const newOffset = (event.selected * itemsPerPage) % countItems
        setItemOffset(newOffset)
    }

    console.log(listItems)
    return (
        <>
            <Items/>
            {countItems > 5 && <ReactPaginate
                className="d-flex justify-content-around align-items-center pagination"
                breakLabel="..."
                nextLabel="след >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={itemsPerPage}
                pageCount={pageCount}
                previousLabel="< пред"
                renderOnZeroPageCount={null}
                activeClassName="active-page"
            />}
        </>
    )
}