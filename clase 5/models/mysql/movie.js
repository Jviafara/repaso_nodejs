import mysql from "mysql2/promise"
import { randomUUID } from "node:crypto"

const config = {
  host: "localhost",
  user: "root",
  password: "admin",
  port: 3306,
  database: "moviesdb",
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const loweCaseGenre = genre.toLowerCase()

      const [genres] = await connection.execute(
        "SELECT id, name FROM genre WHERE LOWER(name) = ?;",
        [loweCaseGenre]
      )

      if (genres.length === 0) return []

      const [{ id }] = genres

      const [moviesByGenreId] = await connection.execute(
        `SELECT BIN_TO_UUID(movie_id) id, movie.title, movie.year, movie.director, movie.duration, movie.poster, movie.rate 
         FROM movie_genre 
         JOIN movie ON movie_genre.movie_id = movie.id 
         WHERE movie_genre.genre_id = ?;`,
        [id]
      )
      return moviesByGenreId
    }

    const [movies] = await connection.execute(
      "SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;"
    )
    return movies
  }

  static async getById({ id }) {
    const [movie] = await connection.execute(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )
    if (movie.length === 0) return null
    return movie
  }

  static async create({ data }) {
    const genres = data.genre
    const { title, year, director, duration, rate, poster } = data
    const id = randomUUID()
    const newMovie = { id, title, year, director, duration, rate, poster }

    try {
      await connection.execute(
        "INSERT INTO movie (id,title, year, director, duration, rate, poster) VALUES ( UUID_TO_BIN(?) , ?, ?, ?, ?, ?, ?);",
        Object.values(newMovie)
      )

      genres.map(async genre => {
        const [genreId] = await connection.execute(
          "SELECT id, name FROM genre WHERE LOWER(name) = ?;",
          [genre.toLowerCase()]
        )

        await connection.execute(
          "INSERT INTO movie_genre (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?);",
          [newMovie.id, genreId[0].id]
        )
      })
    } catch (error) {
      return { message: error.message }
    }

    return newMovie
  }

  static async delete({ id }) {
    await connection.execute(
      `DELETE FROM movie_genre where movie_id = UUID_TO_BIN(?);`,
      [id]
    )

    await connection.execute(`DELETE FROM movie where id = UUID_TO_BIN(?);`, [
      id,
    ])

    return true
  }

  static async update({ id, data }) {
    const [movies] = await connection.execute(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )
    const movie = {
      ...movies[0],
      ...data,
    }
    delete movie.id
    console.log()

    await connection.execute(
      `UPDATE movie SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? WHERE id = UUID_TO_BIN(?);`,
      [
        movie.title,
        movie.year,
        movie.director,
        movie.duration,
        movie.poster,
        movie.rate,
        id,
      ]
    )
  }
}
