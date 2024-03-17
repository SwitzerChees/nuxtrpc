import type { FileUploadUploaderEvent } from 'primevue/fileupload'
import type { FetchError } from 'ofetch'

type FileOpts = {
  onSuccess?: (data?: typeof APIRoutes.Upload.Post.Output) => void
  onError?: (error?: FetchError) => void
  errorToast?: boolean
}
export const useFile = (opts?: FileOpts) => {
  if (!opts) opts = {}
  if (opts.errorToast === undefined) opts.errorToast = true
  const files = ref<File[]>([])
  const nuxtApp = useNuxtApp()

  const upload = async (event: FileUploadUploaderEvent) => {
    const formData = new FormData()
    if (Array.isArray(event.files)) {
      event.files.forEach((file) => {
        formData.append(file.name, file)
      })
    } else {
      formData.append(event.files.name, event.files)
    }

    try {
      const response = await fetch(APIRoutes.Upload.Post.Path, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const responseError = { name: 'FetchError', message: response.statusText, status: response.status, statusText: response.statusText }
        if (opts?.onError) opts.onError(responseError)
        if (opts?.errorToast) nuxtApp.hooks.callHook('api:error' as any, responseError)
      }
    } catch (error) {
      if (opts?.onError) opts.onError(error as any)
    }

    // const result: typeof APIRoutes.Upload.Post.Output = await response.json()
    // return result
  }

  return { upload, files }
}
