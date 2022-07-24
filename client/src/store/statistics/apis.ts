import {
  httpClient
} from '@/middlewares/httpClient'

export const URL_PATH = 'localhost:3000'


const SubmitStatistics = (data: any) => httpClient
  .post('/statistics', { data })

const SubmitSelectedBitrate = (data: any) => httpClient
  .post('/selectedbitrate', {data})

export {
  SubmitStatistics,
  SubmitSelectedBitrate
}
