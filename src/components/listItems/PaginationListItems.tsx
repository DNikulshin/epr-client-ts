import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDataStore } from '../../store/data-store/data-store.ts'
import { Item } from '../claimsItem/Item.tsx'
import Select from 'react-select';
//import { useLocation } from 'react-router-dom'
import { ErrorItem } from '../error/ErrorItem.tsx'

interface itemsPerPageProps {
  itemsPerPage: number
}

const options = [
  {
    label: "Кроме выполненных",
    value: 'Кроме выполненных'
  },
  {
    label: 'Выполнено',
    value: 'Выполнено'
  },
  // {
  //   label: 'Не выполнено',
  //   value: 'Не выполнено'
  // },
  // {
  //   label: 'Выполняется',
  //   value: 'Выполняется'
  // }
]



export const PaginationListItems = ({ itemsPerPage}: itemsPerPageProps) => {
  const [itemOffset, setItemOffset] = useState(0)
  const listItems = useDataStore(state => state.listItems)
  const countItems = useDataStore(state => state.countItems)
  const loading = useDataStore(state => state.loading)
  const [selectedOption, setSelectedOption] = useState(options[0])
  //const location = useLocation()
  const endOffset = itemOffset + itemsPerPage
  const currentItems = listItems
    .sort((a, b) => {
        if (a?.date?.todo && b?.date?.todo) {
          return a?.date?.todo > b?.date?.todo
            ? 1 :
            a?.date?.todo < b?.date?.todo
              ? -1 : 0
        }
        return 0
      }
    )
    .filter(item => {
      if(selectedOption.value === 'Кроме выполненных') {
        return item.state?.name !== 'Выполнено'
      }
      return item.state?.name === 'Выполнено'
    })
    .slice(itemOffset, endOffset)

  const pageCount = Math.ceil(countItems / itemsPerPage)


  function Items() {
    return (
      <>
        {currentItems &&
          currentItems
            .map((item, idx: number) => {
              return (
                <div className="accordion d-flex flex-column my-3" key={item?.id}>
                  {<Item {...item} numberItem={idx + 1} />}
                </div>
              )
            })
        }
      </>
    )
  }

  const handlePageClick = (event: { selected: number }) => {
    const countClaim = document.body
    if (countClaim) {
      countClaim.scrollIntoView({ behavior: 'smooth' })
    }
    const newOffset = (event.selected * itemsPerPage) % currentItems.length
    setItemOffset(newOffset)
  }
  const handleClick = () => {
    const countClaim = document.body
    if (countClaim) {
      countClaim.scrollIntoView({behavior: 'smooth'})
    }
  }

  console.log(listItems, 'listItems PaginationListItems')

  return (
    <>
      {!loading && countItems> 0 &&
          <div className="bg-light p-2 text-center">Всего:&nbsp;
            <strong className="text-success mx-4">{countItems}</strong>
            {selectedOption.value === 'Выполнено' && currentItems.length > 0 && <span>Выполнено: <span className="text-success">{currentItems.length}</span></span>}
          </div>

      }
      <Select
        defaultValue={selectedOption}
        onChange={(newValue) => setSelectedOption(newValue ?? { label: '', value: '' })}
        options={options}
        className="d=flex w-100 bg-dark-subtle"
        autoFocus={false}
        isSearchable={false}
      />
      {
        <>
        {!currentItems.length && <ErrorItem text={'Заявок нет!'}/>}
          {(countItems && currentItems.length > 0) && <Items />}
        </>
      }

      {(countItems && currentItems.length > 0) &&
        <ReactPaginate
          className="d-flex justify-content-around align-items-center pagination"
          breakLabel="..."
          nextLabel={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                          className="bi bi-arrow-right-circle btn-hover" viewBox="0 0 16 16">
            <path fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={itemsPerPage}
          pageCount={pageCount}
          previousLabel={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                              className="bi bi-arrow-left-circle btn-hover" viewBox="0 0 16 16">
            <path fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>}
          renderOnZeroPageCount={null}
          activeClassName="active-page"
        />
      }
      {(!loading && countItems >= 3 && currentItems.length >= 3 ) &&
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