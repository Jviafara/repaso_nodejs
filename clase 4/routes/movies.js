import { Router } from "express"
import { randomUUID } from "node:crypto"
import { validateMovie, validatepartialMovie } from "../schemas/movies.js"
import { readJSON } from "../utils.js"
import { MovieModel } from "../models/movie.js"

const movies = readJSON("./movies.json")

export const moviesRouter = Router()

// Fetch all movies
moviesRouter.get("/", async (req, res) => {
  const { genre } = req.query
  const movies = await MovieModel.getAll({ genre })
  res.json(movies)
})

// Fetch a movie by id
moviesRouter.get("/:id", async (req, res) => {
  //path to regexp
  const { id } = req.params
  const movie = await MovieModel.getById({ id })

  if (!movie) return res.status(404).json({ message: "Movie not found" })
  res.status(200).json(movie)
})

// Create a new movie
moviesRouter.post("/", async (req, res) => {
  const result = validateMovie(req.body)

  if (result.error)
    return res.status(400).json({ message: result.error.message })

  const newMovie = await MovieModel.create({ data: result.data })

  res.status(201).json(newMovie)
})

// Update a movie using PATCH
moviesRouter.patch("/:id", async (req, res) => {
  const result = validatepartialMovie(req.body)

  if (!result.success)
    return res.status(400).json({ message: result.error.message })

  const { id } = req.params
  const updatedMovie = await MovieModel.update({ id, data: result.data })

  if (!updatedMovie) return res.status(404).json({ message: "Movie not found" })

  return res.json(updatedMovie)
})

//Delete a movie by ID
moviesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params
  const movie = await MovieModel.delete({ id })
  if (!movie) return res.status(404).json({ message: "Movie not found" })
  return res.json({ message: "Movie deleted" })
})
