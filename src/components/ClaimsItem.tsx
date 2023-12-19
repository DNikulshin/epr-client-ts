import { useState} from 'react'
import {CSSTransition} from 'react-transition-group'
import {Link} from 'react-router-dom'
import {PhoneNumber} from './PhoneNumber'

import {Iitem} from "../store/data-store/types.ts"
import {useUserStore} from "../store/user-store.ts";
import {Comments} from "./Comments.tsx";

export const ClaimsItem = (props: Iitem) => {

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
        additional_data
    } = props
    const [open, setOpen] = useState(false)

    // const getUserName = useUserStore(state => state.getUserName)

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
                            <small className=" me-3 d-flex">#{index + 1}</small>
                            <div className="d-flex flex-wrap justify-content-center"><strong
                                className="text-secondary d-flex">
                                <div className="me-1"> id:</div>
                                &nbsp;</strong>
                            </div>
                            <div className="btn btn-primary text-white"><Link to={'/detail/' + id}
                                                                              className="text-white text-decoration-none">{id}</Link>
                            </div>
                            <br/>
                            <hr className="w-100"/>
                            <div>&nbsp;Адрес:&nbsp;{address?.text}</div>
                            <div><strong>&nbsp;Назначено:&nbsp;</strong><span
                                className="text-bg-info text-danger">{date?.todo}</span></div>
                            <div>&nbsp;Статус:&nbsp;<span className="text-bg-success">{state?.name}</span></div>
                            <div>&nbsp;Тип:&nbsp;{type?.name}&nbsp;</div>
                            <hr className="w-100"/>
                            {/*<PhoneNumber phoneNumber={[]}/>*/}
                            <div>{additional_data && Object.values(additional_data).map(el => (
                                <div key={el.id}>
                                    <div>{el.id}</div>
                                    <div>{el.caption && el.caption}</div>
                                    <div>{el.value && el.value}</div>
                                    <hr/>
                                </div>
                            ))}
                            </div>
                            <Link to={'/coordinates/' + id}><i className="bi bi-geo-alt-fill margin-left"/></Link>
                            <hr className="w-100"/>
                            <small className="text-shadow">{''}</small>
                        </div>
                    </button>
                </div>
                <CSSTransition in={open} classNames="show-body" timeout={300} unmountOnExit>
                    <>
                        <div className="accordion-body mt-2">
                            <div><strong>Дата создания: </strong>{date?.create}</div>
                            <hr/>
                            <div><strong>Назначено: </strong>{date?.todo}</div>
                            <hr/>
                            <div><strong>Абонент: </strong>{customer?.fullName}</div>
                            <hr/>
                            <div><strong>Описание: </strong> <br/>{description.replace(/(<(\/?[^>]+)>)/g, '')}</div>
                            <hr/>
                           <Comments {...comments}/>
                            <hr/>
                            <div><strong>Исполнители: </strong>Исполнители</div>
                        </div>
                    </>
                </CSSTransition>
            </div>
        </>
    )
}
