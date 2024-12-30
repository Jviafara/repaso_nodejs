import cors from "cors"

export const corsMiddleware = () =>
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = ["http://localhost:64125", "https://my-app.com"]

      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        return callback(null, true)
      }
    },
  })
