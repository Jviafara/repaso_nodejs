import express, { json } from "express"
import { createMovieRouter } from "./routes/movies.js"
import { corsMiddleware } from "./middlewares/cors.js"

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable("x-powered-by")

  app.use("/movies", createMovieRouter({ movieModel }))

  const PORT = process.env.PORT ?? 8080

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
