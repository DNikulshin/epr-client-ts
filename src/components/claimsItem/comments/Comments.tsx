import { CommentUser } from './Comment.tsx'
import { Comment } from '../../../store/data-store/types.ts'
import { FC, useState } from 'react'

interface PropTypes {
  comments: Comment[],
  itemId: number
}

export const Comments: FC<PropTypes> = ({
                                          comments,
                                          itemId,
                                        }) => {
  console.log(comments, 'comments')
  const [open, setOpen] = useState(false)


    const getComments = () => Object.values(comments)
      .map(commentItem =>
        <CommentUser {...commentItem}
                     key={commentItem.id}
                     itemId={itemId}

        />)

  return (
    <div className="d-flex justify-content-between flex-column">
      <hr />
      <strong className="mb-2">Комменты:</strong>
      {
        Object.keys(comments)?.length <= 3

          ? getComments()

          : <>
            <button className="btn btn-outline-secondary  align-self-end"
                    onClick={() => setOpen(prevState => !prevState)}>
                            <span>{open
                              ? <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                     className="bi bi-unlock box-shadow_svg" viewBox="0 0 16 16">
                                <path
                                  d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z" />
                              </svg>
                              : <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                     className="bi bi-lock box-shadow_svg" viewBox="0 0 16 16">
                                <path
                                  d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                              </svg>}
                            </span>
            </button>
            {open && getComments()}
            {open && <button className="btn btn-outline-secondary  align-self-end"
                             onClick={() => setOpen(prevState => !prevState)}>
                            <span>{open
                              ? <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                     className="bi bi-unlock box-shadow_svg" viewBox="0 0 16 16">
                                <path
                                  d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z" />
                              </svg>
                              : <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                     className="bi bi-lock box-shadow_svg" viewBox="0 0 16 16">
                                <path
                                  d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                              </svg>
                            }</span>
            </button>}
          </>
      }
    </div>
  )
}
