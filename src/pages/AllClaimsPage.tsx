import { useCallback, useEffect, useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { ClaimsList } from '../components/ClaimsList'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Select from '../components/Select'

const CLAIMS_TODAY = 3
const  CLAIMS_YESTERDAY = 4
const CLAIMS_TOMORROW = 5

export const AllClaimsPage = () => {
    const auth = useContext(AuthContext)
    const [claims, setClaims] = useState([])
    const [selectValue, setSelectValue] = useState(CLAIMS_TODAY)

    const { loading, request } = useHttp()
    const fetchClaims = useCallback(async () => {
        try {
            const {login} = JSON.parse(localStorage.getItem('storageBody') || '{}') 
            const fetched = await request('/api/claim/all', 'POST', {login, dateClaims: selectValue})
            setClaims(fetched)
        } catch (e) {
        }
    }, [request, selectValue])

    const handleClick = () => {
        const countClaim = document.querySelector('.container')
        if(countClaim) {
            countClaim.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const changeHandler = (e ) => {
        setSelectValue(e.target.value)
    }


    useEffect(() => {
        fetchClaims()
    }, [fetchClaims])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
                <div className="d-flex justify-content-center text-center gap-4 align-items-center bg-secondary bg-opacity-50 flex-nowrap rounded">
                    <Link to="/all" className="btn btn-primary fs-4 my-3 mx-3 btn-hover btn-shadow" onClick={fetchClaims}>
                        <i className="bi bi-arrow-clockwise"/>
                    </Link>
                    <Link to="/" className="d-flex btn btn-sm btn-success btn-outline-success btn-hover text-white fs-5  flex-nowrap btn-shadow">Мои заявки</Link>
                    <Link
                        className="btn btn-sm btn-danger text-white btn-shadow"
                        to="/"
                        title="Выйти"
                        onClick={auth.logout}
                    >
                        Выйти
                    </Link>
                </div>
           <Select
                        label={"Выберите позицию"}
                        value={selectValue}
                        onChange={changeHandler}
                        options={[
                            {text: 'Заявки сегодня', value: CLAIMS_TODAY},
                            {text: 'Заявки завтра', value: CLAIMS_YESTERDAY},
                            {text: 'Заявки вчера', value:  CLAIMS_TOMORROW}
                        ]}
                    />
            {claims.length > 0 &&
                <div className="bg-light p-2 text-center count-claim">Всего:&nbsp;<strong
                    className="text-success">{claims.length}</strong>
                </div>
            }
            {/* a and b type any */}
            { !loading && <ClaimsList claims={claims.sort((a: any, b: any ) => a.setDate.localeCompare(b.setDate))}/> }

            { !loading && claims.length >= 3 &&
                <div className="text-center">
                    <button type="button" className="btn btn-primary my-3 btn-hover" onClick={handleClick}><i
    className="bi bi-arrow-up"/></button>
                </div>
            }
        </>
    )
}


