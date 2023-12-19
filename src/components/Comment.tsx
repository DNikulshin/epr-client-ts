import {Comment} from "../store/data-store/types.ts";
import {useUserStore} from "../store/user-store.ts";
import {useEffect, useState} from "react";

export const CommentUser = (commentItem : Comment) => {
   const {employee_id, comment, dateAdd, id} = commentItem

    const getUserName = useUserStore(state => state.getUserName)
const [userName, setUserName] = useState('')

    useEffect(() => {
        getUserName(employee_id)
            .then( (data) => {
                setUserName(data)
        })
    }, [employee_id, getUserName])

    return (
        <div key={id}><br/>
            #{id}<br/>
            {comment}<br/>
            {dateAdd}<br/>
            {userName}
            <hr/>
        </div>
    )
}
