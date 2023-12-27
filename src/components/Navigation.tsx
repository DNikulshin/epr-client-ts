import {Link, useLocation} from 'react-router-dom'
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
        dateDoTo?: number | string | undefined
    }
}

const options: IOptions[] = [
    {
        label: 'Заявки сегодня',
        value: {
            dateDoFrom: moment().format('DD.MM.YYYY'),
            dateDoTo: moment().format('DD.MM.YYYY')
        }
    },
    {
        label: 'Заявки завтра',
        value: {
            dateDoFrom: moment().add(1, 'days').format('DD.MM.YYYY'),
            dateDoTo: moment().add(1, 'days').format('DD.MM.YYYY')
        }
    },
    {
        label: 'Заявки вчера',
        value: {
            dateDoFrom: moment().subtract(1, 'days').format('DD.MM.YYYY'),
            dateDoTo: moment().subtract(1, 'days').format('DD.MM.YYYY')
        }
    },
    {
        label: 'Заявки в этом месяце',
        value: {
            dateDoFrom: moment().startOf('month').format('DD.MM.YYYY'),
            dateDoTo:  moment().endOf('month').format('DD.MM.YYYY')
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
            getItems({dateDoTo: selectedOption?.value?.dateDoTo, dateDoFrom: selectedOption?.value?.dateDoFrom})
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
                className={"d-flex flex-column justify-content-around align-items-center bg-secondary bg-opacity-50 flex-nowrap rounded position-sticky top-0 p-2 mb-2" + " " + cls}
                style={{
                    zIndex: 9999
                }}
            >
                <div className='d-flex align-items-center gap-5 mb-3'>
                    <button className="btn btn-primary fs-5 btn-hover btn-shadow"
                            onClick={() => getItems({dateDoTo: selectedOption?.value?.dateDoTo, dateDoFrom: selectedOption?.value?.dateDoFrom})}>
                        <i className="bi bi-arrow-clockwise"/>
                    </button>
                    <Link to="/"
                          className="d-flex btn btn-sm bg-primary-subtle btn-hover btn-outline-success fs-4 flex-nowrap btn-shadow"
                    ><i className="bi bi-house"></i>
                    </Link>
                    <Link to="/user" className="btn btn-sm  fs-4 btn-shadow bg-success btn-hover"><i className="bi bi-person-bounding-box"></i></Link>
                    <Link
                        className="btn btn-sm btn-danger text-white btn-shadow btn-hover"
                        to='/login'
                        title="Выйти"
                        onClick={logout}
                    >
                        <i className="bi bi-power"></i>
                    </Link>
                </div>

                {location.pathname === '/'
                    && <Select
                    defaultValue={selectedOption}
                    onChange={(newValue) => setSelectedOption(newValue ?? {})}
                    options={options}
                    className="d=flex w-100"
                />}

            </header>
        </>
    )
}
