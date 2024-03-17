import type { APIMethod } from '.'
import type { APIUploadPostOutput } from '~/server/api/upload/index.post'

const Upload = {
  Post: {
    Path: '/api/upload',
    Method: 'POST' as APIMethod,
    Output: {} as APIUploadPostOutput,
  },
}

export default Upload
