import type { APIMethod } from '.'
import type { APIUploadPostOutput } from '~/server/api/file/upload.post'

const File = {
  Upload: {
    Path: '/api/file/upload',
    Method: 'POST' as APIMethod,
    Output: {} as APIUploadPostOutput,
  },
}

export default File
