import { ChangeEventHandler, FC, useCallback, useEffect, useRef, useState } from 'react'
import { useDataStore } from '../../../store/data-store/data-store.ts'

interface PropTypes {
  itemId: number  | undefined
}
export const AddComment: FC<PropTypes> = ({itemId}) => {
  const [open, setOpen] = useState(false)
  const [commentText, setCommentText] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const commentAdd = useDataStore(state => state.commentAdd)
  //const debounceText = useDebounce(commentText, 300)


  const resizeTextArea = () => {
    if(textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    }
  }
  useEffect(resizeTextArea, [commentText])
  const commentTextHandler: ChangeEventHandler<HTMLTextAreaElement>  = (event) => {
      setCommentText(event.target.value)
  }

  const commentAddHandler = useCallback(async () => {
    if(commentText) {
        const data =  await commentAdd({ itemId, commentText })
       if(data === 'OK') {
         setOpen(false)
         setCommentText('')
       }

    }
  }, [commentAdd, commentText, itemId])

  return (
    <div className="d-flex flex-column gap-2 align-items-center">
      {open &&
        <textarea
          className="textarea-resize w-100"
          ref={textAreaRef}
          value={commentText}
          onChange={commentTextHandler}
          autoFocus={true}
          placeholder="Текст..."
        />
      }
      <div className="d-flex justify-content-around align-items-center">
        {!open ?

          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
               className="bi bi-chat-left mx-5 btn-hover box-shadow_svg"
               viewBox="0 0 16 16"
               onClick={() => setOpen(prevState => !prevState)}
          >
            <path
              d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          </svg>
          :
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                 className="bi bi-x-square me-3 btn-target_remove box-shadow_svg"
                 viewBox="0 0 16 16"
                 onClick={() => {
                   setOpen(false)
                   setCommentText('')
                 }}
            >
              <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                 className="bi bi-send-fill me-2 btn-hover text-primary box-shadow_svg" viewBox="0 0 16 16"
                 onClick={commentAddHandler}
            >
              <path
                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
            </svg>
          </>
        }
      </div>

    </div>
  )
}