import AtroxAxios from './atrox-axios'
import { cliConst } from '@/config/cli-constant'
const ajax = new AtroxAxios({
  timeout: cliConst.timestamp.min * 30,
  baseURL: process.env.NODE_ENV === 'development' ? 'api' : process.env.VUE_APP_GATEWAY
  // baseURL: 'http://192.168.124.194:8080'
})

export { ajax }
