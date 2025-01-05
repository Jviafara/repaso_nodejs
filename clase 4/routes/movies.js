import { Router } from "express"
import { MovieController } from "../controllers/movies.js"

export const moviesRouter = Router()

// Fetch all movies
moviesRouter.get("/", MovieController.getAll)

// Fetch a movie by id
moviesRouter.get("/:id", MovieController.getById)

// Create a new movie
moviesRouter.post("/", MovieController.create)

// Update a movie using PATCH
moviesRouter.patch("/:id", MovieController.update)

//Delete a movie by ID
moviesRouter.delete("/:id", MovieController.delete)
