import { useState } from 'react'
import { IItem } from '../../store/data-store/types.ts'
import { regExpSortTel, replaceSpecialSymbols } from '../../utils/replacelSymbols.ts'

export const AdditionalData = (props: IItem) => {const {
  description,
  additional_data,
} = props

  const [openDetail, setOpenDetail] = useState(false)

  return (
    <>
    {additional_data && <div className="d-flex flex-column w-100">
      <hr className="w-75" />
      <button
        className="btn btn-sm p-2 btn-outline box-shadow align-self-start mb-3 box-shadow bg-success text-light"
        onClick={() => setOpenDetail(prevState => !prevState)}
      >
        {openDetail ? 'Скрыть' : 'Подробнее...'}
      </button>
      <div className="d-flex align-self-start flex-column world-break">
        {openDetail && additional_data && Object.values(additional_data)
          .flat()
          .map(item =>
            <div key={item.id} className="mb-2">
              <strong>{replaceSpecialSymbols(item?.caption)}&nbsp;
              </strong>{replaceSpecialSymbols(item?.value)}</div>)}

        <div className="d-flex align-self-start flex-wrap gap-3">
          {Object.values(additional_data).map(item =>
            item?.value.match(regExpSortTel) ?
              <a
                key={item.id}
                href={`tel:${item?.value.match(regExpSortTel)}`}
              >
                {item?.value.match(regExpSortTel)}
              </a>
              : ''
          )}

          {description?.match(regExpSortTel) &&
            <div className="flex justify-content-center align-items-center mb-2">
              <a href={`tel:${description?.match(regExpSortTel)}`}>
                {description?.match(regExpSortTel)}
              </a>
            </div>}
        </div>
      </div>
    </div>}
    </>
  )
}