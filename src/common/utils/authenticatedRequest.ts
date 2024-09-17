import axios from 'axios'

import { refreshTokens } from '../../api/nitroGen/users/refresh/refresh'
import {
  getAccessToken,
  getAccessTokenId,
  getRefreshToken,
  isAccessTokenExpired,
  setAccessToken,
  setRefreshToken,
} from './tokens'
import { useRefreshTokenStatus } from './useRefreshTokenStatus'
import { useAccessTokenBlockStatus } from './useBlockStatus'

let refreshPromise: null | Promise<string> = null

const authenticatedAxios = axios.create()

authenticatedAxios.interceptors.request.use(
  async (config) => {
    let accessToken = getAccessToken()
    const tokenExpired = isAccessTokenExpired()

    if (tokenExpired) {
      const refreshToken = getRefreshToken()
      const userId = getAccessTokenId()

      if (!refreshToken || !userId) {
        useRefreshTokenStatus.getState().setInvalid()
        return Promise.reject(new Error('No refresh token'))
      }

      if (!refreshPromise) {
        console.info('REFRESHING TOKENS')
        refreshPromise = refreshTokens({ refreshToken, userId })
          .then((response) => {
            console.info('REFRESHED TOKENS')
            setAccessToken(response.data.accessToken)
            setRefreshToken(response.data.refreshToken)
            return response.data.accessToken
          })
          .catch((error) => {
            useRefreshTokenStatus.getState().setInvalid()
            return Promise.reject(error)
          })
          .finally(() => {
            refreshPromise = null
          })
      }
    }
    if (refreshPromise) {
      accessToken = await refreshPromise
    }

    // Check if the user has any blocks for us to handle elsewhere
    const adminBlock = hasAdminBlock()
    const paymentBlock = hasPaymentBlock()
    useAccessTokenBlockStatus.getState().setAdminBlock(!!adminBlock)
    useAccessTokenBlockStatus.getState().setPaymentBlock(!!paymentBlock)

    // After refreshing the token, we need to add the new token to the request
    const token = accessToken
    config.headers.Authorization = `Bearer ${token}`
    config.headers['Content-Type'] =
      config.headers['Content-Type'] || 'application/json'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default authenticatedAxios
