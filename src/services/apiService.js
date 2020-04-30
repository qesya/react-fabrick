import axios from 'axios'
import { env } from '../environment'

export const getAccountsList = async () => {
  try {
    const res = await axios.get(`${env.baseUrl}api/gbs/banking/v4.0/accounts`, {
      headers: {
        'Content-Type': 'application/json',
        'Auth-Schema': env.authSchema,
        apiKey: env.apiKey
      }
    })
    if (res.status === 200) {
      return res.data.payload.list
    }
    return undefined
  } catch (e) {
    console.log(e)
  }
}

export const getBalance = async (id) => {
  try {
    const res = await axios.get(`${env.baseUrl}api/gbs/banking/v4.0/accounts/${id}/balance`, {
      headers: {
        'Content-Type': 'application/json',
        'Auth-Schema': env.authSchema,
        apiKey: env.apiKey
      }
    })
    if (res.data.status === 'OK') {
      return res.data.payload.availableBalance
    }
    return undefined
  } catch (e) {
    console.log(e)
  }
}
