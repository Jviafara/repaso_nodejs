const z = require('zod')

const movieSchema = z.object({
  title: z.string().nonempty(),
  year: z.number().int().positive(),
  director: z.string().nonempty(),
  duration: z.number().int().positive(),
  poster: z.string().url(),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Crime',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Thriller',
      'Sci-Fi'
    ]),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  ),
  rate: z.number().min(0).max(10).default(0)
})

function validateMovie(object) {
  return movieSchema.safeParse(object)
}

function validatepartialMovie(object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = { validateMovie, validatepartialMovie }
