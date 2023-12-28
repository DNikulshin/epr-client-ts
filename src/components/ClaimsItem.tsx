import {MouseEventHandler, useEffect, useState} from 'react'
import {CSSTransition} from 'react-transition-group'
import {Iitem} from "../store/data-store/types.ts"
import {Comments} from "./Comments.tsx";
import {useDataStore} from "../store/data-store/data-store.ts"
import {MapItem} from "./MapItem.tsx";
import {useUserStore} from "../store/user-store/user-store.ts"

export const ClaimsItem = (props: Iitem) => {
    const [employee, setEmployee] = useState('')
    const [switchComponent, setSwitchComponent] = useState(false)
    const [coordinates, setCoordinates] = useState({lat: 0, lon: 0})
    const getCoordinates = useDataStore(state => state.getCoordinates)
    const getUserName = useUserStore(state => state.getUserName)
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
    const [open, setOpen] = useState(false)

    const handleOpen: MouseEventHandler<HTMLDivElement> = (e)=> {
        e.stopPropagation()
        setOpen(!open)
    }

    const getMap = async (id: number) => {
        getCoordinates(id).then((data) => {
            setCoordinates({lat: data.lat, lon: data.lon})
            setSwitchComponent(true)
        })
    }

    useEffect(() => {
        if (staff?.employee) {
            const employeeIdS = Object.keys(staff?.employee)

            for (const id of employeeIdS) {
                getUserName(id).then((data) => {
                    setEmployee(data)
                })
            }
        }
    }, [getUserName, staff])


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
                    <i className="bi bi-arrow-return-left"></i>
                </button>
            </div>
        }

    }
    return (
        <>
            <div className="accordion-item">
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
                                    <i className="bi bi-geo-alt-fill fs-5"></i>
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
                            <div>&nbsp;Статус:&nbsp;<span className={state?.id === 1 ? "text-bg-danger opacity-75": "text-bg-success"}>{state?.name}</span></div>
                            <div>&nbsp;Тип:&nbsp;{type?.name}&nbsp;</div>
                            {open ?
                                <div
                                    className="arrow-toggle"
                                    onClick={handleOpen}
                                >
                                    <i className="bi bi-chevron-up fs-3 "></i>
                                </div>
                                : <div className="arrow-toggle"
                                       onClick={handleOpen}
                                >
                                    <i className="bi bi-chevron-down fs-3"></i>
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

                        </div>
                    </button>
                </div>
                <CSSTransition in={open} classNames="show-body" timeout={300} unmountOnExit>
                    <>
                        <div className="accordion-body mt-2 text-wrap world-break">
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
                        </div>
                    </>
                </CSSTransition>
            </div>
        </>
    )
}
