// import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react';
// import Select from 'react-select';
// import { useDataStore } from '../../store/data-store/data-store.ts';
// import { Iitem } from '../../store/data-store/types.ts';
// import { useUserStore } from '../../store/user-store/user-store.ts';
// import { MapItem } from '../MapItem.tsx';
// import { customSelectStyles } from './customSelectStyles.ts';
// import { optionsChangeItem } from './optionsStateChangeItem.ts';
// import { regExpSortTel, replaceSpecialSymbols } from './replacelSymbols.ts';
// import { IOptionsStateChangeItem } from './types.ts';
//
// export const ClaimItemHeader = (props }) => {
//   const {
//     id,
//     index,
//     address,
//     date,
//     type,
//     description,
//     state,
//     additional_data,
//     staff,
//   } = props
//
//   const [open, setOpen] = useState(false)
//   const [openDetail, setOpenDetail] = useState(false)
//   const [employee, setEmployee] = useState('')
//   const [division, setDivision] = useState('')
//   const getCoordinates = useDataStore(state => state.getCoordinates)
//   const getUserName = useUserStore(state => state.getUserName)
//   const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 })
//   const [switchComponent, setSwitchComponent] = useState(false)
//   const getDivision = useUserStore(state => state.getDivision)
//   const changeStateItem = useDataStore(state => state.changeStateItem)
//   const currentStatusStateItem = useDataStore(state => state.currentStatusStateItem)
//   const [selectedOption, setSelectedOption] = useState<IOptionsStateChangeItem[]>([{
//     label: state?.name,
//     value: state?.id,
//     color: currentStatusStateItem?.color,
//   }])
//
//   const getMap = async (id: number) => {
//     getCoordinates(id).then((data) => {
//       if (data?.lat && data?.lon) {
//         setCoordinates({ lat: data.lat, lon: data.lon })
//       }
//       setSwitchComponent(true)
//     })
//   }
//
//   const handleOpen: MouseEventHandler<HTMLDivElement> = (e) => {
//     e.stopPropagation()
//     setOpen(!open)
//   }
//
//   const changeStateItemSelect = useCallback(async (id: number, current: IOptionsStateChangeItem) => {
//     const data = await changeStateItem({ id, state_id: current?.value })
//     setSelectedOption([{ label: state?.name, value: current?.value, color: data?.color }])
//   }, [changeStateItem, state?.name])
//
//   useEffect(() => {
//     if (staff?.employee || staff?.division) {
//       const employeeIdS = Object.keys(staff?.employee || {})
//       const divisionIdS = Object.keys(staff?.division || {})
//
//       for (const id of employeeIdS) {
//         getUserName(id)
//           .then((data) => {
//             setEmployee(prevState => `${prevState} ${data}`)
//           })
//       }
//
//       for (const id of divisionIdS) {
//         getDivision(id)
//           .then((data) => {
//             setDivision(prevState => `${prevState} ${data}`)
//           })
//       }
//     }
//   }, [getDivision, getUserName, staff])
//
//   if (switchComponent) {
//     if (coordinates.lat && coordinates.lon) {
//       return <div style={{
//         width: '100%',
//         display: 'flex',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//       }}>
//         <MapItem coordinates={coordinates} />
//         <button onClick={() => setSwitchComponent(false)}>
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//                className="bi bi-arrow-return-left" viewBox="0 0 16 16">
//             <path fillRule="evenodd"
//                   d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5" />
//           </svg>
//         </button>
//       </div>
//     }
//
//   }
//
//   return (
//     <div className="accordion-header flex flex-column" style={{
//       display: 'flex',
//       alignItems: 'center',
//     }}>
//       <div
//         className={!open
//           ? 'accordion-button btn-accordion'
//           : 'accordion-button btn-accordion collapsed btn-accordion-active'}
//       >
//         <div className="content-btn d-flex flex-wrap align-items-center position-relative pe-4">
//           <div className="d-flex align-items-center justify-content-between w-100">
//             <small className=" me-3 d-flex">#{index + 1}</small>
//             <div className="btn btn-hover fs-4 d-flex"
//                  onClick={() => getMap(address?.addressId)}>
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
//                    className="bi bi-geo-alt-fill text-danger" viewBox="0 0 16 16">
//                 <path
//                   d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
//               </svg>
//             </div>
//             <div className="d-flex flex-wrap  align-items-center">
//               <strong
//                 className="text-secondary d-flex">
//                 <div className="me-1"> id:</div>
//                 &nbsp;</strong>
//               <div className="btn btn-primary text-white d-flex box-shadow"
//                    onClick={handleOpen}
//               >
//                                 <span
//                                   className="text-white text-decoration-none"
//                                 >
//                                 {id}
//                                 </span>
//               </div>
//             </div>
//           </div>
//           <br />
//           <hr className="w-75" />
//           <div>&nbsp;Адрес:&nbsp;{address?.text}</div>
//           <div className="my-2 box-shadow p-1 bg-light"><strong>&nbsp;Назначено:&nbsp;</strong>
//             <span
//               className="text-primary fw-bold p-2">
//                                     {date?.todo.split(' ')[0]}
//                             </span>
//             <span
//               className="text-danger fw-bold p-1">
//                                     {date?.todo.split(' ')[1]}
//                             </span>
//           </div>
//           <div className="d-flex justify-content-center align-items-center">&nbsp;Статус:&nbsp;
//             <Select
//               defaultValue={selectedOption}
//               onChange={(value: any) => changeStateItemSelect(id, value)}
//               options={optionsChangeItem}
//               autoFocus={false}
//               isSearchable={false}
//               classNamePrefix="custom-select"
//               styles={customSelectStyles(selectedOption)}
//             />
//
//           </div>
//           <div>&nbsp;Тип:&nbsp;{replaceSpecialSymbols(type?.name)}&nbsp;</div>
//           {open ?
//             <div
//               className="arrow-toggle"
//               onClick={handleOpen}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
//                    className="bi bi-chevron-up" viewBox="0 0 16 16">
//                 <path fillRule="evenodd"
//                       d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
//               </svg>
//             </div>
//             : <div className="arrow-toggle"
//                    onClick={handleOpen}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
//                    className="bi bi-chevron-down fs-3" viewBox="0 0 16 16">
//                 <path fillRule="evenodd"
//                       d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
//               </svg>
//             </div>
//           }
//           <hr className="w-75" />
//           <div className="d-flex flex-column w-100">
//             {additional_data && <button
//               className="btn btn-sm p-2 btn-outline box-shadow align-self-start mb-3 box-shadow bg-success text-light"
//               onClick={() => setOpenDetail(prevState => !prevState)}
//             >
//               {openDetail ? 'Скрыть' : 'Подробнее...'}
//             </button>}
//             <div className="d-flex align-self-start flex-column world-break">
//               {openDetail && additional_data && Object.values(additional_data)
//                 .flat()
//                 .map(item =>
//                   <div key={item.id} className="mb-2">
//                     <strong>{replaceSpecialSymbols(item?.caption)}&nbsp;
//                     </strong>{replaceSpecialSymbols(item?.value)}</div>)}
//
//               <div className="d-flex align-self-start flex-wrap gap-3">
//                 {additional_data
//                   && Object.values(additional_data).map(item =>
//                     item?.value.match(regExpSortTel) ?
//                       <a
//                         key={item.id}
//                         href={`tel:${item?.value.match(regExpSortTel)}`}
//                       >
//                         {item?.value.match(regExpSortTel)}
//                       </a>
//                       : '',
//                   )}
//
//                 {description?.match(regExpSortTel) &&
//                   <div className="flex justify-content-center align-items-center mb-2">
//                     <a href={`tel:${description?.match(regExpSortTel)}`}>
//                       {description?.match(regExpSortTel)}
//                     </a>
//                   </div>}
//               </div>
//             </div>
//           </div>
//
//           <hr className="w-75" />
//           <small
//             className="text-shadow"
//           >
//             {employee && employee}
//           </small>
//           <small
//             className="text-shadow"
//           >
//             {division && division}
//           </small>
//         </div>
//       </div>
//     </div>
//   )
// }
