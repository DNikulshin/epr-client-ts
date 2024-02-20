// import { ChangeEventHandler, RefObject, useEffect } from 'react'
//
// interface PropTypes {
//   value : string
//   onChange: ChangeEventHandler
//   ref: RefObject<HTMLTextAreaElement>
// }
// export const TextAreaAutoResize = ({value, onChange, ref}: PropTypes) => {
//
//   const resizeTextArea = () => {
//     if(ref.current) {
//       ref.current.style.height = 'auto'
//       ref.current.style.height = ref.current.scrollHeight + 'px'
//     }
//   }
//   useEffect(resizeTextArea, [ref])
//
//   return (
//     <textarea
//       className="textarea-resize"
//       ref={ref}
//       value={value}
//       onChange={onChange}
//       rows={1}
//     />
//   )
// }
