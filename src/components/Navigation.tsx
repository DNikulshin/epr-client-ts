import {Link, NavLink, useLocation} from 'react-router-dom'
import {useEffect, useState} from "react";
import moment from "moment/moment";
import {useDataStore} from "../store/data-store/data-store.ts";
import Select from "react-select";

interface navigationProps {
    logout: () => void
}
export interface IOptions {
    label?: string
    value?: {
        dateDoFrom?: number | string | undefined,
        dateDoTo?: number | string | undefined,
        typeRequest?: string,
        stateId?: number
    }
}

const options: IOptions[] = [
    {
        label: 'Мои заявки сегодня',
        value: {
            dateDoFrom: moment().format('DD.MM.YYYY'),
            dateDoTo: moment().format('DD.MM.YYYY'),
            typeRequest: 'employee'
        }
    },
    {
        label: 'Заявки подраздел. сегодня',
        value: {
            dateDoFrom: moment().format('DD.MM.YYYY'),
            dateDoTo: moment().format('DD.MM.YYYY'),
            typeRequest: 'division',
        }
    },
    {
        label: 'Заявки подраздел. завтра',
        value: {
            dateDoFrom: moment().add(1, 'days').format('DD.MM.YYYY'),
            dateDoTo: moment().add(1, 'days').format('DD.MM.YYYY'),
            typeRequest: 'division'
        }
    },
    {
        label: 'Заявки подраздел. вчера',
        value: {
            dateDoFrom: moment().subtract(1, 'days').format('DD.MM.YYYY'),
            dateDoTo: moment().subtract(1, 'days').format('DD.MM.YYYY'),
            typeRequest: 'division'
        }
    },
    {
        label: 'Заявки подраздел. в этом месяце',
        value: {
            dateDoFrom: moment().startOf('month').format('DD.MM.YYYY'),
            dateDoTo:  moment().endOf('month').format('DD.MM.YYYY'),
            typeRequest: 'division'
        }
    }

]



export const Navigation = ({logout}: navigationProps) => {
    const [position, setPosition] = useState(window?.scrollY)
    const [visible, setVisible] = useState(true)
    const [selectedOption, setSelectedOption] = useState<IOptions>(options[0])
    const getItems = useDataStore(state => state.getItems)
    const location = useLocation()

    useEffect(() => {
        if(selectedOption.value) {
            getItems({dateDoTo: selectedOption?.value?.dateDoTo, dateDoFrom: selectedOption?.value?.dateDoFrom, typeRequest: selectedOption?.value?.typeRequest})
        }

    }, [getItems, selectedOption])

    useEffect(()=> {
        const handleScroll = () => {
            const moving = window?.scrollY

            setVisible(position > moving);
            setPosition(moving)
        };
        window.addEventListener("scroll", handleScroll)
        return(() => {
            window.removeEventListener("scroll", handleScroll)
        })
    })

    const cls = visible ? "visible-header" : "hidden-header"

    return (
        <>
            <header
                className={"d-flex flex-column justify-content-around align-items-center bg-secondary bg-opacity-75 flex-nowrap rounded position-sticky w-100 top-0 p-3 mb-2 flex-shrink-0" + " " + cls}
                style={{
                    zIndex: 9999
                }}
            >
                <div className='d-flex mb-3 justify-content-center align-items-center w-100'>
                    <div className='d-flex align-items-center gap-4 justify-content-center mx-auto'>
                        {location.pathname === '/' ? <button className="d-flex align-items-center btn btn-sm text-bg-primary text-light box-shadow_svg"
                                                             onClick={() => getItems({
                                                                 dateDoTo: selectedOption?.value?.dateDoTo,
                                                                 dateDoFrom: selectedOption?.value?.dateDoFrom,
                                                                 typeRequest: selectedOption?.value?.typeRequest,
                                                             })}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                   className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                  <path fillRule="evenodd"
                                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                                  <path
                                    d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                              </svg>
                          </button>
                          : <button className="d-flex btn btn-sm text-bg-primary text-light box-shadow_svg"
                                    onClick={() => window?.location?.reload()}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                   className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                  <path fillRule="evenodd"
                                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                                  <path
                                    d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                              </svg>
                          </button>
                        }
                        <NavLink to="/"
                                 className="d-flex btn btn-sm text-bg-light text-secondary box-shadow_svg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                 className="bi bi-house" viewBox="0 0 16 16">
                                <path
                                  d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                            </svg>
                        </NavLink>
                        <NavLink to="/user" className="d-flex btn btn-sm text-bg-light text-secondary box-shadow_svg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                 className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                                <path
                                  d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/>
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            </svg>
                        </NavLink>
                        <NavLink
                          className="d-flex btn btn-sm text-bg-light text-secondary box-shadow_svg"
                          to="/info"
                          title="info"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                 className="bi bi-search" viewBox="0 0 16 16">
                                <path
                                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </NavLink>
                    </div>

                    <div className="logout">
                        <Link
                          className="d-flex btn btn-sm text-bg-danger text-light box-shadow_svg"
                          to="/login"
                          title="Выйти"
                          onClick={logout}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                 className="bi bi-power" viewBox="0 0 16 16">
                         <path d="M7.5 1v7h1V1z"/>
                         <path
                             d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
                     </svg>
                 </Link>
             </div>
                </div>

                {location.pathname === '/'
                    && <Select
                        defaultValue={selectedOption}
                        onChange={(newValue) => setSelectedOption(newValue ?? {})}
                        options={options}
                        className="d=flex w-100 bg-dark-subtle"
                        autoFocus={false}
                        isSearchable={false}
                />}

            </header>
        </>
    )
}
