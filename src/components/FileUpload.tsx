import { ChangeEvent, useRef, useState } from 'react'
import { useDataStore } from '../store/data-store/data-store.ts'
import { Attach } from '../store/data-store/types.ts'

interface InterfaceProptypes {
  id: number;
  attach?: Attach;
}

export const FileUpload = ({ id, attach }: InterfaceProptypes) => {
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null)
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const attachAdd = useDataStore(state => state.attachAdd)
  const inputRef = useRef<HTMLInputElement>(null)
  const [openAttach, setOpenAttach] = useState(false)

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages(files)
      console.log(selectedImages)
      const formData = new FormData();
      [...files]
        .forEach((file) => {
        formData.append('files', file)
      })
      await attachAdd({ id, formData })
      const selectedFiles = Array.from(files);
      const readerPromises = selectedFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve(reader.result as string)
          }
          reader.readAsDataURL(file)
        })
      })
      Promise.all(readerPromises)
        .then((results) => {
          setPreviewUrls(results)
        })
    }

  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
      setOpenAttach(true)
    }
  };

  return (
    <div className="d-flex flex-wrap">
      <svg xmlns="http://www.w3.org/2000/svg"
           width="30"
           height="30"
           fill="currentColor"
           className="bi bi-paperclip btn-hover btn-attach"
           viewBox="0 0 16 16"
           onClick={handleClick}
      >
        <path
          d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
      </svg>
      <input
        ref={inputRef}
        className="hidden-input"
        type="file"
        name="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      {previewUrls && previewUrls.map((url, index) => (
        <img key={index} src={url} style={{ maxWidth: 80 }} alt="img" className="me-2" />
      ))}
      {openAttach &&
        <div className="d-flex flex-wrap align-items-center mt-2 w-100">
          <hr className="w-75" />
          <strong className="text-center mx-3">Добавленные файлы</strong>
          <button className="btn btn-outline-secondary d-flex btn-hover mb-2"
                  onClick={() => setOpenAttach(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                 className="bi bi-arrows-collapse" viewBox="0 0 16 16">
              <path fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8m7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0m-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0z" />
            </svg>
          </button>
          {attach && Object.values(attach)
            .map(item => {
              return (
                <div key={item?.id} className="mb-1">
                  <small className="me-2">{item?.fileName}</small>
                  <small className="text-primary">{item?.dateAdd}</small>
                </div>
              );
            })}
        </div>}
    </div>
  );
};



