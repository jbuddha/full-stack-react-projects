import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'

const app = express()
app.use(bodyParser.json())
app.use(cors())
postsRoutes(app)
userRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express!!!')
})

export { app }
