import { useEffect, useState } from 'react'
//import { useDebounce } from '../../../hooks/useDebounce.ts'
//import { useDataStore } from '../../../store/data-store/data-store.ts'
import { Comment } from '../../../store/data-store/types.ts'
import { useUserStore } from '../../../store/user-store/user-store.ts'

// interface PropTypes{
//   comment: Comment
//   itemId: number | undefined
// }

export const CommentUser: (commentItem: Comment) => JSX.Element = (commentItem: Comment) => {
  // itemId
  const { employee_id, comment, dateAdd, id  } = commentItem
  const [userName, setUserName] = useState('')
  // const [commentText, setCommentText] = useState(comment)
  const getEmployeeNameById = useUserStore(state => state.getEmployeeNameById)
  //const commentEdit = useDataStore(state => state.commentEdit)
 // const debounceText = useDebounce(commentText, 300)

  // //const handleCommentText = (event: { target: { value: SetStateAction<string | undefined>; }; }) => {
  //   if(event.target.value) {
  //     setCommentText(event.target.value)
  //   }
  // }

  useEffect(() => {
    getEmployeeNameById(employee_id)
      .then((data) => {
        if (data) setUserName(prevState => prevState + data)
      })
  }, [employee_id, getEmployeeNameById])

  return (
    <div key={id}>
      #{id}<br />
      {/*<textarea*/}
      {/*  value={commentText}*/}
      {/*  onChange={handleCommentText}*/}
      {/*  rows={1}*/}
      {/*  // onBlur={() => commentEdit({  id ,itemId, commentText})}*/}
      {/*/>*/}
      {comment}
      <br />
      {dateAdd}<br />
      {userName}
      <hr />
    </div>
  )
}
