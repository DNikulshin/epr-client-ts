import { FC } from 'react';
import { CSSTransition } from 'react-transition-group'
import { IItem } from '../../store/data-store/types.ts'
import { AddComment } from './comments/AddComment.tsx';
import { Comments } from './comments/Comments.tsx';
import { replaceSpecialSymbols } from '../../utils/replacelSymbols.ts'

interface PropTypes extends IItem {
  itemId: number
}

export const ItemDetail: FC<PropTypes> = ({
id,
date,
customer,
comments,
description,
setOpen,
open,
handleClickItem,
itemId
}) => {

  return (
    <CSSTransition in={open} classNames="show-body" timeout={300} unmountOnExit>
      <>
        <div className="accordion-body mt-2 text-wrap world-break d-flex flex-column">
          <div className="mb-1"><strong>id: </strong>{id}</div>
          <hr />
          <div><strong>Дата создания: </strong>{date?.create}</div>
          <hr />
          <div><strong>Назначено: </strong>{date?.todo}</div>

          {customer?.fullName &&
            <div>
              <hr />
              <strong>Абонент: </strong>{customer?.fullName}
            </div>}

          {customer?.login && <div>
            <hr />
            <strong>Логин: </strong>{customer?.login}
          </div>
          }
          {description &&
            <div className="text-wrap d-flex flex-column">
              <hr />
              <strong>Описание: </strong>
              {replaceSpecialSymbols(description)}
            </div>}
          {comments &&  <Comments comments={comments} itemId={itemId}/>}
         <div>
           <hr/>
           <AddComment itemId={itemId}/>
         </div>
          <button className="btn btn-outline-secondary d-flex align-self-end btn-hover"
                  onClick={() => {
                    if (setOpen) setOpen(false)
                    if (handleClickItem) handleClickItem()
                  }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                 className="bi bi-arrows-collapse box-shadow_svg" viewBox="0 0 16 16">
              <path fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8m7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0m-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0z" />
            </svg>
          </button>

        </div>
      </>
    </CSSTransition>
  )
}
