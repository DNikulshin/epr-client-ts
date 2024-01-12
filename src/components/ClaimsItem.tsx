import {MouseEventHandler, useEffect, useRef, useState} from 'react'
import {CSSTransition} from 'react-transition-group'
import {Iitem} from "../store/data-store/types.ts"
import {Comments} from "./Comments.tsx";
import {useDataStore} from "../store/data-store/data-store.ts"
import {MapItem} from "./MapItem.tsx";
import {useUserStore} from "../store/user-store/user-store.ts"

export const ClaimsItem = (props: Iitem) => {
    const [open, setOpen] = useState(false)
    const refItem = useRef<HTMLDivElement | null>(null)
    const [employee, setEmployee] = useState('')
    const [division, setDivision] = useState('')
    const [switchComponent, setSwitchComponent] = useState(false)
    const [coordinates, setCoordinates] = useState({lat: 0, lon: 0})
    const getCoordinates = useDataStore(state => state.getCoordinates)
    const getUserName = useUserStore(state => state.getUserName)
    const getDivision = useUserStore(state => state.getDivision)
    const regExpSortTel = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g
    const {
        id,
        index,
        address,
        date,
        customer,
        type,
        comments,
        description,
        state,
        additional_data,
        staff
    } = props


    const handleOpen: MouseEventHandler<HTMLDivElement> = (e)=> {
        e.stopPropagation()
        setOpen(!open)
    }

    const handleClickItem  = () => {
       if (refItem.current) {
          refItem.current?.scrollIntoView({behavior: 'smooth'})
        }
    }

    const getMap = async (id: number) => {
        getCoordinates(id).then((data) => {
            setCoordinates({lat: data.lat, lon: data.lon})
            setSwitchComponent(true)
        })
    }

    useEffect(() => {
        if (staff?.employee || staff?.division) {
            const employeeIdS = Object.keys(staff?.employee || {})
            const divisionIdS = Object.keys(staff?.division || {})

            for (const id of employeeIdS) {
                getUserName(id).then((data) => {
                    setEmployee(prevState => prevState + ' ' + data)
                })
            }

            for (const id of divisionIdS) {
                getDivision(id).then((data) => {
                    setDivision(prevState => prevState + ' ' + data)
                })
            }
        }
    }, [getDivision,getUserName, staff])


    if (switchComponent) {
        if (coordinates.lat && coordinates.lon) {
            return <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <MapItem coordinates={coordinates}/>
                <button onClick={() => setSwitchComponent(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
            </div>
        }

    }

    return (
        <>
            <div className="accordion-item" ref={refItem}>
                <div className="accordion-header flex flex-column" style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <button
                        className={!open
                            ? 'accordion-button btn-accordion'
                        : 'accordion-button btn-accordion collapsed btn-accordion-active'}
                            type="button"
                    >
                        <div className="content-btn d-flex flex-wrap align-items-center position-relative pe-4">
                            <div className="d-flex align-items-center justify-content-between w-100">
                                <small className=" me-3 d-flex">#{index + 1}</small>
                                <div className="btn btn-hover fs-4 d-flex"
                                     onClick={() => getMap(address?.addressId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                         className="bi bi-geo-alt-fill text-danger" viewBox="0 0 16 16">
                                        <path
                                            d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                    </svg>
                                </div>
                                <div className="d-flex flex-wrap  align-items-center">
                                    <strong
                                        className="text-secondary d-flex">
                                        <div className="me-1"> id:</div>
                                        &nbsp;</strong>
                                    <div className="btn btn-primary text-white d-flex"
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
                            <br/>
                            <hr className="w-75"/>
                            <div>&nbsp;Адрес:&nbsp;{address?.text}</div>
                            <div><strong>&nbsp;Назначено:&nbsp;</strong><span
                                className="text-bg-info text-danger">{date?.todo}</span></div>
                            <div>&nbsp;Статус:&nbsp;<span
                                className={state?.id === 1 ? "text-bg-danger" : "text-bg-success"}>{state?.name}</span>
                            </div>
                            <div>&nbsp;Тип:&nbsp;{type?.name}&nbsp;</div>
                            {open ?
                                <div
                                    className="arrow-toggle"
                                    onClick={handleOpen}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                         className="bi bi-chevron-up" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                                    </svg>
                                </div>
                                : <div className="arrow-toggle"
                                       onClick={handleOpen}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                         className="bi bi-chevron-down fs-3" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </div>
                            }
                            <hr className="w-75"/>
                            <div onClick={(e => e.stopPropagation())}>
                                {additional_data && Object.values(additional_data).map(el => (

                                    el.value.match(regExpSortTel) || description?.match(regExpSortTel) ?
                                        <div className="flex justify-content-center align-items-center" key={el.id}>
                                            {<a className="mb-2 p-2 flex"
                                                href={'tel:' + el.value.match(regExpSortTel)}
                                            >
                                                {el.value.match(regExpSortTel)}
                                            </a>}<br/><br/>
                                            {<a className="flex" href={'tel:' + description?.match(regExpSortTel)}>
                                                {description?.match(regExpSortTel)}
                                            </a>}
                                        </div> : false
                                ))}
                            </div>
                            <hr className="w-75"/>
                            <small className="text-shadow">{employee && employee}</small>
                            <small className="text-shadow">{division && division}</small>
                        </div>
                    </button>
                </div>
                <CSSTransition in={open} classNames="show-body" timeout={300} unmountOnExit>
                    <>
                        <div className="accordion-body mt-2 text-wrap world-break d-flex flex-column">
                            <div className="mb-1"><strong>id: </strong>{id}</div>
                            <hr/>
                            <div><strong>Дата создания: </strong>{date?.create}</div>
                            <hr/>
                            <div><strong>Назначено: </strong>{date?.todo}</div>
                            <hr/>
                            <div><strong>Абонент: </strong>{customer?.fullName}</div>
                            <hr/>
                            <div className="text-wrap"><strong>Описание: </strong>
                                <br/>{description?.replace(/(<(\/?[^>]+)>)/g, '')}</div>
                            <hr/>
                            {comments && <Comments {...comments}/>}
                            <hr/>
                            <div><strong>Исполнители: </strong>{employee}</div>
                            <button className="btn btn-outline-secondary d-flex align-self-end"
                                    onClick={() => {
                                        setOpen(false)
                                        handleClickItem()
                                    }}>
                                close
                            </button>

                        </div>
                    </>
                </CSSTransition>
            </div>
        </>
    )
}
