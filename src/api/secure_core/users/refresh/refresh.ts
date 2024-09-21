import { z } from 'zod'

import { getApiUrl } from '../../../../common/utils/urls'
import axios from 'axios'
import { getAccessToken } from '../../../../common/utils/tokens'

export const RefreshTokenProps = z.object({
  userId: z.string().uuid(),
  refreshToken: z.string(),
})

const SuccessResponse = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export const refreshTokens = async (props: z.infer<typeof RefreshTokenProps>) =>
  axios.post<z.infer<typeof SuccessResponse>>(
    `${getApiUrl()}/users/${props.userId}/refresh`,
    {
      refreshToken: props.refreshToken,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  )
