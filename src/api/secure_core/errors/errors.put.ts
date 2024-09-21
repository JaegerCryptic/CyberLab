import { z } from 'zod'

import authenticatedAxios from '../../../common/utils/authenticatedRequest'
import { getApiUrl } from '../../../common/utils/urls'

const Body = z.object({
  url: z.string().optional(),
  userAgent: z.string().optional(),
  message: z.string().optional(),
  stack: z.string().optional(), // Needs to be any because it can be any object
  minifiedFileName: z.string().optional(),
})

export const putError = async (props: z.infer<typeof Body>) => {
  return await authenticatedAxios.put(`${getApiUrl()}/errors`, {
    ...props,
  })
}
