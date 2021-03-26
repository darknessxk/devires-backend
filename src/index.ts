import express from 'express'
import {} from './types'

/**
 * Application entrypoint
 */
const main = async () => {
  const app = express()
  const { PORT } = process.env

  app.listen(PORT || 1030, () => {})
}

main()
