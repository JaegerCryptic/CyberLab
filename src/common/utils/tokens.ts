import { addMinutes, isAfter, toDate } from 'date-fns'
import { jwtDecode } from 'jwt-decode'
import { z } from 'zod'

export const JwtPayload = z.object({
  id: z.string(),
  exp: z.number(),
})

export const getAccessToken = () => localStorage.getItem('token')
export const getRefreshToken = () => localStorage.getItem('refreshToken')
export const setAccessToken = (token: string) =>
  localStorage.setItem('token', token)
export const setRefreshToken = (token: string) =>
  localStorage.setItem('refreshToken', token)
export const clearTokens = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
}
export const getAccessTokenExpiry = () => {
  const token = getAccessToken()
  if (!token) return null
  const decoded = jwtDecode(token)
  if (!JwtPayload.safeParse(decoded)) return null

  return toDate(JwtPayload.parse(decoded).exp * 1000)
}
export const getAccessTokenId = () => {
  const token = getAccessToken()
  if (!token) return null
  const decoded = jwtDecode(token)
  if (!JwtPayload.safeParse(decoded)) return null

  return JwtPayload.parse(decoded).id
}
export const isAccessTokenExpired = () => {
  const expiry = getAccessTokenExpiry()
  if (!expiry) return true

  // 1 minute buffer to prevent accidently using an expired token
  return !isAfter(expiry, addMinutes(new Date(), 1))
}
