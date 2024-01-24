import { DateTime } from './DateTime.tsx'
import { Division } from './division/Division.tsx'
import { Employee } from './employee/Employee.tsx';
import { ItemDetail } from './ItemDetail.tsx'
import { ItemStatus } from './ItemStatus.tsx'
import { MouseEventHandler, useRef, useState } from 'react'
import { Iitem } from '../../store/data-store/types.ts'
import { useDataStore } from '../../store/data-store/data-store.ts'
import { MapItem } from '../MapItem.tsx'
import { regExpSortTel, replaceSpecialSymbols } from '../../utils/replacelSymbols.ts'

export const Item = (props: Iitem) => {
  const {
    id,
    index,
    address,
    type,
    description,
    additional_data,
  } = props

  const [open, setOpen] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)
  const refItem = useRef<HTMLDivElement | null>(null)
  const [switchComponent, setSwitchComponent] = useState(false)
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 })
  const getCoordinates = useDataStore(state => state.getCoordinates)

  const handleOpen: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    setOpen(!open)
  }

  const handleClickItem = () => {
    if (refItem.current) {
      refItem.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getMap = async (id: number) => {
    getCoordinates(id).then((data) => {
      if (data?.lat && data?.lon) {
        setCoordinates({ lat: data.lat, lon: data.lon })
      }
      setSwitchComponent(true)
    })
  }

  if (switchComponent) {
    if (coordinates.lat && coordinates.lon) {
      return <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        <MapItem coordinates={coordinates} />
        <button onClick={() => setSwitchComponent(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               className="bi bi-arrow-return-left" viewBox="0 0 16 16">
            <path fillRule="evenodd"
                  d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5" />
          </svg>
        </button>
      </div>
    }
  }

  return (
    <>
      <div className="accordion-item box-shadow position-relative" ref={refItem}>
        <div className="accordion-header flex flex-column">
          <div
            className={!open
              ? 'accordion-button'
              : 'accordion-button btn-accordion-active'}
          >
            <div className="content-btn d-flex flex-wrap align-items-center">
              <div className="d-flex align-items-center justify-content-between w-100">
                <small className=" me-3 d-flex">#{index + 1}</small>
                <div className="btn btn-hover fs-4 d-flex"
                     onClick={() => getMap(address?.addressId)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                       className="bi bi-geo-alt-fill text-danger" viewBox="0 0 16 16">
                    <path
                      d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                </div>
                <div className="d-flex flex-wrap  align-items-center">
                  <strong
                    className="text-secondary d-flex">
                    <span className="me-1"> id:</span>
                  </strong>
                  <div className="btn btn-primary text-white d-flex box-shadow"
                       onClick={handleOpen}
                  >
                                <span
                                  className="text-white text-decoration-none"
                                >
                                {id}
                                </span>
                  </div>
                </div>
              </div>

              {address?.text && <div className="w-100">
                <hr className="w-75" />
                <strong className="me-2">Адрес:</strong>
                {address?.text}
              </div>}

              <DateTime {...props} />
              <ItemStatus {...props} />
              <div><strong className="me-2">Тип:</strong>{replaceSpecialSymbols(type?.name)}</div>
              {open ?
                <div
                  className="arrow-toggle"
                  onClick={handleOpen}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                       className="bi bi-chevron-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                  </svg>
                </div>
                : <div className="arrow-toggle"
                       onClick={handleOpen}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                       className="bi bi-chevron-down fs-3" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                  </svg>
                </div>
              }

              <div className="d-flex flex-column w-100">
                <hr className="w-75" />
                {additional_data &&
                  <button
                    className="btn btn-sm p-2 btn-outline box-shadow align-self-start mb-3 box-shadow bg-success text-light"
                    onClick={() => setOpenDetail(prevState => !prevState)}
                  >
                    {openDetail ? 'Скрыть' : 'Подробнее...'}
                  </button>}
                <div className="d-flex align-self-start flex-column world-break">
                  {openDetail && additional_data && Object.values(additional_data)
                    .flat()
                    .map(item =>
                      <div key={item.id} className="mb-2">
                        <strong>{replaceSpecialSymbols(item?.caption)}&nbsp;
                        </strong>{replaceSpecialSymbols(item?.value)}</div>)}

                  <div className="d-flex align-self-start flex-wrap gap-3">
                    {additional_data
                      && Object.values(additional_data).map(item =>
                        item?.value.match(regExpSortTel) ?
                          <a
                            key={item.id}
                            href={`tel:${item?.value.match(regExpSortTel)}`}
                          >
                            {item?.value.match(regExpSortTel)}
                          </a>
                          : '',
                      )}

                    {description?.match(regExpSortTel) &&
                      <div className="flex justify-content-center align-items-center mb-2">
                        <a href={`tel:${description?.match(regExpSortTel)}`}>
                          {description?.match(regExpSortTel)}
                        </a>
                      </div>}
                  </div>
                </div>
              </div>
              <div className="w-100 d-flex flex-wrap">
                <hr className="w-75" />
                <Employee {...props} />
                <Division {...props} />
              </div>

            </div>
          </div>
        </div>
        <ItemDetail {...props} setOpen={setOpen} open={open} handleClickItem={handleClickItem} />
      </div>
    </>
  )
}
