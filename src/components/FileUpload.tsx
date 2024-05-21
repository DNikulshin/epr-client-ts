import { ChangeEvent, useRef, useState } from 'react';
import { useDataStore } from '../store/data-store/data-store.ts'
import { Attach } from '../store/data-store/types.ts'

interface InterfaceProptypes {
  id: number | undefined;
  attach?: Attach;
  objectType: string
  styles?: string
  // attachUrls: any[]
}

export const FileUpload = ({ id, attach, objectType, styles = ''}: InterfaceProptypes) => {
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null)
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const attachAdd = useDataStore(state => state.attachAdd)
 // const attachGet = useDataStore(state => state.attachGet)
  //const attachDelete = useDataStore(state => state.attachDelete)
  const inputRef = useRef<HTMLInputElement>(null)
  const [openAttach, setOpenAttach] = useState(false)
 // const loadingFiles = useDataStore(state => state.loadingFiles)
 // const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [loadingFiles, setLoadingFiles] = useState(false)

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

      const selectedFiles = Array.from(files)
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
      setLoadingFiles(true)
      const response = await attachAdd({ id, formData, objectType})
      if(response) {
        setLoadingFiles(false)
      }
    }

  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
      setOpenAttach(true)
    }
  }

  // const getImg =  useCallback( async (id: number) => {
  //   return await attachGet(id)
  // }, [attachGet])

/*  const handleDelete = async (id: number ,fileName: string) => {
    console.log(id);
   await attachDelete(id, fileName)
  }*/

  // useEffect(() => {
  //   attachGet(attach).then((data) => {
  //     console.log(data);
  //   })
  // }, [attach, attachGet])

  if(loadingFiles) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100">
        <span className="loader_file me-2"></span>
        <span>Загрузка файлов...</span>
      </div>
    )
  }

  return (
    <div className="d-flex flex-wrap">
      <svg xmlns="http://www.w3.org/2000/svg"
           width="30"
           height="30"
           fill="currentColor"
           className={`bi bi-paperclip btn-hover btn-attach${styles} box-shadow_svg`}
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
        <img key={index} src={url} style={{ maxWidth: 80 }} alt="img" className="me-2 mt-2" />
      ))}
      {openAttach &&
        <div className="d-flex flex-column align-items-center mt-2">
          <hr className="w-75" />
          <div className="d-flex">
            <strong className="text-center mx-3">Добавленные файлы</strong>
            <button className="btn btn-outline-secondary d-flex btn-hover mb-2"
                    onClick={() => setOpenAttach(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                   className="bi bi-arrows-collapse box-shadow_svg" viewBox="0 0 16 16">
                <path fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8m7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0m-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0z" />
              </svg>
            </button>
          </div>
<div className="d-flex flex-wrap justify-content-center align-items-center">
  {attach && Object.values(attach)
    .map(item => {
      return (
        <div key={item?.id} className="d-flex mb-1 world-break me-2">
          {/*<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"*/}
          {/*     className="bi bi-x-square me-3 btn-target_remove text-shadow"*/}
          {/*     viewBox="0 0 16 16"*/}
          {/*     onClick={() => handleDelete(item.id, item.fileName)}*/}
          {/*>*/}
          {/*  <path*/}
          {/*    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />*/}
          {/*  <path*/}
          {/*    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />*/}
          {/*</svg>*/}

          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               className="bi bi-image me-2" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            <path
              d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
          </svg>
          {/*<img src={`${import.meta.env.VITE_APP_MIDDLEWARE_API_URL}/api?key=${import.meta.env.VITE_APP_API_KEY}&cat=attach&action=get_file&id=${item.id}`}*/}
          {/*     alt={item.name}*/}
          {/*     style={{ width: 80 , height: 80}}*/}
          {/*/>*/}
          <small className="me-2">id: {item.id}</small>
          <small className="text-primary">{item?.dateAdd}</small>
          {/*{attachUrls && <img src={URL.createObjectURL(attachUrls[0])} alt="Image" />}*/}
        </div>
      )
    })}
</div>

        </div>
      }
    </div>
  );
};



