import { MouseEventHandler } from 'react'

type oenProps = {
  handleOpen: MouseEventHandler
  open: boolean
}
export const DetailArrow = ({handleOpen, open}: oenProps) => {
  return (
    <>
      {open ?
        <div
          className="arrow-toggle"
          onClick={handleOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
               className="bi bi-chevron-up" viewBox="0 0 16 16">
            <path fillRule="evenodd"
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
          </svg>
        </div>
        : <div className="arrow-toggle"
               onClick={handleOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
               className="bi bi-chevron-down fs-3" viewBox="0 0 16 16">
            <path fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
      }
    </>
  )
}