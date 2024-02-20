import { toast, ToastContainer } from 'react-toastify'
import noInternet from '../assets/images/no-intetnet.jpg'

export const OfflineFeedback = () => {
  toast('Нет интернет соединения!')
  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100 flex-column text-center">
      <ToastContainer position='top-center' />
      <img src={noInternet} alt="No Internet" className="mb-5" style={{
        maxWidth: '150px'
      }} />
      <button onClick={() => window.location.reload()} className="btn btn-outline-primary">Обновить</button>
    </div>
  )
}