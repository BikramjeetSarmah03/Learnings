import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { trpcExpress } from '@libs/trpc-server'

const app = express()

app.use(cors())

app.get('/', (_, res) => {
  res.send('Hello World')
})

app.use('/trpc', trpcExpress)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log('Server Working...')
})
