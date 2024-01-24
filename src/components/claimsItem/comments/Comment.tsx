import { useEffect, useState } from 'react'
import { Comment } from '../../../store/data-store/types.ts'
import { useUserStore } from '../../../store/user-store/user-store.ts'


export const CommentUser = (commentItem: Comment) => {
  const { employee_id, comment, dateAdd, id } = commentItem
  const [userName, setUserName] = useState('')
  const getUserName = useUserStore(state => state.getUserNameById)

  useEffect(() => {
    getUserName(employee_id)
      .then((data) => {
        if (data) setUserName(prevState => prevState + data)
      })
  }, [employee_id, getUserName])

  return (
    <div key={id}>
      #{id}<br />
      {comment}<br />
      {dateAdd}<br />
      {userName}
      <hr />
    </div>
  )
}
