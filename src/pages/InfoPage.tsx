import { useCallback, useEffect, useState } from 'react';
import { Owner, useDataStore } from '../store/data-store/data-store.ts';
import { useDebounce } from 'use-debounce';
import { FileUpload } from '../components/FileUpload.tsx';
import ReactPaginate from 'react-paginate';
import { NodeItem } from '../store/data-store/types.ts';


const itemsPerPage = 50
export const InfoPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [value] = useDebounce(inputValue, 500)
  const getOwners = useDataStore((state) => state.getOwners);
  const getNodes = useDataStore((state) => state.getNodes);
  const owners = useDataStore((state) => state.owners);
  const nodes = useDataStore((state) => state.nodes);
  const [openOwners, setOpenOwners] = useState(false)
  const [openNodes, setOpenNodes] = useState(false)
  const loading = useDataStore((state) => state.loading);
  const [itemOffset, setItemOffset] = useState(0)
  const pageCount = (countItems: NodeItem[] | Owner[]) => Math.ceil(countItems.length / itemsPerPage)
  const endOffset = itemOffset + itemsPerPage


  const filteredArray = useCallback((array: NodeItem[] | Owner[]) => array.filter((field) => {
    if (value) {
      return field?.name?.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
        field?.number?.toLowerCase().includes(value.toLowerCase())
    }
    return array
  }), [value])

  const handlePageClick = (event: { selected: number }) => {
    const countClaim = document.body
    if (countClaim) {
      countClaim.scrollIntoView({ behavior: 'smooth' })
    }
    const newOffset = (event.selected * itemsPerPage) % nodes?.length
    setItemOffset(newOffset)
  }


  useEffect(() => {
    Promise.all([getOwners(), getNodes()])
  }, [getNodes, getOwners])

  if (loading) {
    return <div className="text-center mt-5 position-relative" style={{
      transform: 'translateX(40%)',
    }}>
      <span className="loader"></span>
    </div>
  }

  return (
    <>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">@</span>
        </div>
        <input type="text" className="form-control"
               placeholder="Поиск..." aria-label="Username"
               aria-describedby="basic-addon1"
               onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="d-flex  justify-content-between align-items-center mb-2 border border-light p-2">
        <button className={`btn btn-outline-primary mx-2 ${openOwners ? 'text-bg-success' : ''}`}
                onClick={() => {

                  setOpenOwners(prevState => !prevState);
                  setOpenNodes(false);
                }}>
          Собственники объектов
        </button>
        {filteredArray(owners).length > 0 && <strong>{filteredArray(owners).length}</strong>}
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2 mt-3 border border-light p-2">
        <button className={`btn btn-outline-primary mx-2 ${openNodes ? 'text-bg-success' : ''}`}
                onClick={() => {

                  setOpenNodes(prevState => !prevState);
                  setOpenOwners(false);
                }
                }>
          Узлы связи
        </button>
        {filteredArray(nodes).length > 0 && <strong>{filteredArray(nodes).length}</strong>}
      </div>

      {openOwners && <ul className="list-group d-flex flex-column gap-2 mb-5">
        {owners && filteredArray(owners).map((item: Owner, idx: number) => {
          return (
            <li className="list-group-item" key={item?.id}>
              <small className="fw-bold mx-1">#{idx + 1}</small>
              {item?.address}
              <p>{item?.name}</p>
              <a href={'tel:' + item?.phone}>{item?.phone}</a>
            </li>
          );
        }).slice(itemOffset, endOffset)}
        {filteredArray(owners).length > 5 && <ReactPaginate
          className="d-flex justify-content-around align-items-center pagination"
          breakLabel="..."
          nextLabel={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                          className="bi bi-arrow-right-circle btn-hover" viewBox="0 0 16 16">
            <path fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount(filteredArray(owners))}
          previousLabel={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                              className="bi bi-arrow-left-circle btn-hover" viewBox="0 0 16 16">
            <path fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>}
          renderOnZeroPageCount={null}
          activeClassName="active-page"
        />}
        {!filteredArray(owners).length && <p className="text-danger text-center">Не найдено.</p>}
      </ul>
      }

      {openNodes && <ul className="list-group d-flex gap-2 mb-5">
        {nodes && filteredArray(nodes).map((item: NodeItem) => {
          return (
            <li className="list-group-item d-flex justify-content-between" key={item?.id}>
              <span>{item?.name?.replace(',', ' ')}</span>
              <FileUpload id={item?.id} objectType="node" styles="-custom" />
            </li>
          )
        }).slice(itemOffset, endOffset)}
        {filteredArray(nodes).length > 5 && <ReactPaginate
          className="d-flex justify-content-around align-items-center pagination"
          breakLabel="..."
          nextLabel={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                          className="bi bi-arrow-right-circle btn-hover" viewBox="0 0 16 16">
            <path fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount(filteredArray(nodes))}
          previousLabel={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                              className="bi bi-arrow-left-circle btn-hover" viewBox="0 0 16 16">
            <path fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>}
          renderOnZeroPageCount={null}
          activeClassName="active-page"
        />}
        {!filteredArray(nodes).length && <p className="text-danger text-center">Не найдено.</p>}
      </ul>
      }

    </>

  );
};
