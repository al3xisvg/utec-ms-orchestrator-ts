import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import routes from './routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// CORS
app.use(cors())
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Middleware
app.use(express.json())
app.use('/api', routes)

// Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
