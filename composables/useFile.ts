import type { FileUploadUploaderEvent } from 'primevue/fileupload'
import type { FetchError } from 'ofetch'
import type { SuperJSONResult } from 'superjson'
import type { ToastMessageOptions } from 'primevue/toast'

type FileOpts = {
  onSuccess?: (data?: typeof APIRoutes.File.Upload.Output) => void
  onError?: (error?: FetchError) => void
  successToast?: ToastMessageOptions
  errorToast?: boolean
}
export const useFile = (opts?: FileOpts) => {
  if (!opts) opts = {}
  if (opts.errorToast === undefined) opts.errorToast = true
  const files = ref<typeof APIRoutes.File.Upload.Output>([])
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
      const response = await fetch(APIRoutes.File.Upload.Path, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const responseError = { name: 'FetchError', message: response.statusText, status: response.status, statusText: response.statusText }
        if (opts?.onError) opts.onError(responseError)
        if (opts?.errorToast) nuxtApp.hooks.callHook('api:error' as any, responseError)
      }

      const result = ((await response.json()) as SuperJSONResult).json as typeof APIRoutes.File.Upload.Output
      files.value.push(...result)
      if (opts?.successToast) nuxtApp.hooks.callHook('api:success' as any, opts.successToast)
      if (opts?.onSuccess) opts.onSuccess(result)
    } catch (error) {
      if (opts?.onError) opts.onError(error as any)
    }
  }

  return { upload, files }
}
