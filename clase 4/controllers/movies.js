import { MovieModel } from "../models/movie.js"
import { validateMovie, validatepartialMovie } from "../schemas/movies.js"

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById(req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (!movie) return res.status(404).json({ message: "Movie not found" })
    res.json(movie)
  }

  static async create(req, res) {
    const result = validateMovie(req.body)

    if (result.error)
      return res.status(400).json({ message: result.error.message })

    const newMovie = await MovieModel.create({ data: result.data })

    res.status(201).json(newMovie)
  }

  static async update(req, res) {
    const result = validatepartialMovie(req.body)

    if (!result.success)
      return res.status(400).json({ message: result.error.message })

    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, data: result.data })

    if (!updatedMovie)
      return res.status(404).json({ message: "Movie not found" })

    return res.json(updatedMovie)
  }

  static async delete(req, res) {
    const { id } = req.params
    const movie = await MovieModel.delete({ id })
    if (!movie) return res.status(404).json({ message: "Movie not found" })
    return res.json({ message: "Movie deleted" })
  }
}
