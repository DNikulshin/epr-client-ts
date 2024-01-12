import {CommentUser} from "./Comment.tsx";
import {Comment} from "../store/data-store/types.ts";
import {useState} from "react";


export const Comments = (comments: Comment[]) => {
    const [open, setOpen] = useState(false)
    const getComments = () => Object.values(comments).map(commentItem => <CommentUser {...commentItem}
                                                                                      key={commentItem.id}/>)
    return (
        <div className='d-flex justify-content-between flex-column'>
            <strong className='mb-2'>Комменты: <br/></strong>
            {
                Object.keys(comments)?.length <= 3

                    ?  getComments()

                    : <>
                        <button className="btn btn-outline-secondary  align-self-end"
                                onClick={() => setOpen(prevState => !prevState)}><span>{open ? 'close' : 'open'}</span>
                        </button>
                        {open && getComments()}
                        {open && <button className="btn btn-outline-secondary  align-self-end"
                                 onClick={() => setOpen(prevState => !prevState)}><span>{open ? 'close' : 'open'}</span>
                        </button>}
                    </>

            }
        </div>
    )
}
