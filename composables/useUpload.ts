import type { FileUploadUploaderEvent } from 'primevue/fileupload'

export const useUpload = () => {
  const upload = async (event: FileUploadUploaderEvent) => {
    const formData = new FormData()
    if (Array.isArray(event.files)) {
      event.files.forEach((file) => {
        formData.append(file.name, file)
      })
    } else {
      formData.append(event.files.name, event.files)
    }
    const response = await fetch(APIRoutes.Upload.Post.Path, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const result: typeof APIRoutes.Upload.Post.Output = await response.json()
    return result
  }

  return { upload }
}
