export const AllowStaffAndDivisionList = () => {
  return (
    <>
      <div className="d-flex justify-content-around w-100 mt-2">
          <div className="list-group d-flex flex-column gap-2 justify-content-center align-content-center">
            <button className="list-group-item">Item 1</button>
            <button className="list-group-item ">Item 2</button>
            <button className="list-group-item">Item 3</button>
            <button className="list-group-item">Item 4</button>
            <button className="list-group-item">Item 5</button>
        </div>

          <div
            className="d-flex flex-column gap-2 justify-content-center" tabIndex={0}>
            <small>Staff 1</small>
            <small>Staff 2</small>
            <small>Staff 3</small>
            <small>Staff 4</small>
            <small>Staff 5</small>
          </div>
      </div>
    </>
  )
}