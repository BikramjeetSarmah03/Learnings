import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World')
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log('Server Working...')
})
