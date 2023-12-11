import React, { useCallback,  useState }  from 'react'
import { Link } from 'react-router-dom'
import { ClaimsItem } from './ClaimsItem'
import { useHttp } from '../hooks/http.hook'

export const ClaimsList = ({ claims }) => {
    const [claimsState, setClaims] = useState([])
    const { request } = useHttp()
    const fetchCookie = useCallback(async () => {
        try {
            const data = JSON.parse(localStorage.getItem('storageBody')) || {}
            const fetched = await request('/api/claim/clear-cookies', 'POST', data)
            setClaims(fetched)
        } catch (e) {
        }
    }, [request])

    if (!claims.length) {

        return <>
  
            <h3 className="text-danger text-center mt-5">
            <Link 
            to="/" 
            title="Очистить куки!">
                <i 
                className="fas fa-cookie-bite text-warning fs-1 ms-3 opacity-50 text-sh text-center" 
                onClick={fetchCookie}
                />
         </Link>
         <br/>
                Заявок нет!
                </h3>
        </>
    }

    return (
        <>
            { claims?.length &&
                claims.map((item, idx) => {
                return (
                    <div className="accordion d-flex flex-column my-2" key={item.itemId}>
                        <ClaimsItem item={item} idx={idx}/>
                    </div>
                )
            })}
        </>
    )
}


