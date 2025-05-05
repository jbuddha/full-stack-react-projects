// test-server.js
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = process.env.PORT || 5173

// Serve static files
app.use(express.static(path.join(__dirname, 'dist/client')))

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK')
})

// Serve index.html for all routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/client/index.html'))
})

app.listen(port, () => {
  console.log(`Test server running at http://localhost:${port}`)
})
