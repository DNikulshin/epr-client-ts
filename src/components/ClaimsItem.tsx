import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Link } from 'react-router-dom'
import { PhoneNumber } from './PhoneNumber'

export const ClaimsItem = ({ item, idx }) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <>
            <div className="accordion-item">
                <div className="accordion-header">
                    <button className={!open
                        ? 'accordion-button btn-accordion'
                        : 'accordion-button btn-accordion collapsed btn-accordion-active'}
                            type="button"
                            onClick={handleOpen}
                    >
                        <div className="content-btn d-flex flex-wrap align-items-center">
                            <small className=" me-3 d-flex">#{idx + 1}</small>
                            <div className="d-flex flex-wrap justify-content-center"><strong
                                className="text-secondary d-flex">
                                <div className="me-1"> id:</div>&nbsp;</strong>
                            </div>
                            <div className="btn btn-primary text-white"><Link to={'/detail/' + item.itemId} className="text-white text-decoration-none">{item.itemId}</Link></div>
                            <br/>
                            <hr className="w-100"/>
                            <div>&nbsp;Адрес:&nbsp;{item.address}</div>
                            <div><strong>&nbsp;Назначено:&nbsp;</strong><span
                                className="text-bg-info text-danger">{item.setDate.replaceAll('\n', ' ').split(' ').slice(0, -1).join(' ')}</span></div>
                            <div>&nbsp;Статус:&nbsp;<span className="text-bg-success">{item.setDate.replaceAll('\n', ' ').split(' ').slice(-1)}</span></div>
                            <div>&nbsp;Тип:&nbsp;{item.type}&nbsp;</div>
                            <hr className="w-100"/>
                            <PhoneNumber phoneNumber={[item.phoneNumber, item.phoneNumberDescription]} />
                            <Link to={'/coordinates/' + item.itemId}><i className="bi bi-geo-alt-fill margin-left"/></Link>
                            <hr className="w-100"/>
                            <small className="text-shadow">{item.executors}</small>
                        </div>
                    </button>
                </div>
                <CSSTransition in={open} classNames="show-body" timeout={300} unmountOnExit>
                    <>
                            <div className="accordion-body mt-2">
                                <div><strong>Дата создания: </strong>{item.createDate}</div>
                                <hr/>
                                <div><strong>Назначено: </strong>{item.setDate}</div>
                                <hr/>
                                <div><strong>Абонент: </strong>{item.itemObject}</div>
                                <hr/>
                                <div><strong>Описание: </strong>{item.description}</div>
                                <hr/>
                                <div><strong>Комменты: </strong>{item.comments}</div>
                                <hr/>
                                <div><strong>Исполнители: </strong>{item.executors}</div>
                            </div>
                    </>
                </CSSTransition>
            </div>
        </>
    )
}
