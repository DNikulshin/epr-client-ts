
import {useState} from 'react'
import ReactPaginate from 'react-paginate'
import {useDataStore} from "../../store/data-store/data-store.ts"
import {Item} from "../claimsItem/Item.tsx"


interface itemsPerPageProps {
    itemsPerPage: number
}

export const PaginationListItems = ({itemsPerPage}: itemsPerPageProps) => {
    const [itemOffset, setItemOffset] = useState(0)
    const listItems = useDataStore(state => state.listItems)
    const countItems = useDataStore(state => state.countItems)
    const endOffset = itemOffset + itemsPerPage
    const currentItems = listItems
        .sort((a, b) =>
            a.date?.todo > b.date?.todo
              ? 1 :
              a.date?.todo < b.date?.todo
                ? -1 : 0
        )
        .slice(itemOffset, endOffset)

    const pageCount = Math.ceil(countItems / itemsPerPage)

    function Items() {
        return (
            <>
                {currentItems &&
                    currentItems
                        .map((item, idx) => {
                            return (
                                <div className="accordion d-flex flex-column my-2" key={item.id}>
                                    {<Item {...item} index={idx}/>}
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
            {countItems > 5 &&
                    <ReactPaginate
                        className="d-flex justify-content-around align-items-center pagination"
                        breakLabel="..."
                        nextLabel={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                        className="bi bi-arrow-right-circle btn-hover" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                        </svg>}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={itemsPerPage}
                        pageCount={pageCount}
                        previousLabel={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                            className="bi bi-arrow-left-circle btn-hover" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                        </svg>}
                        renderOnZeroPageCount={null}
                        activeClassName="active-page"
                    />
               }
        </>
    )
}