import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AddMovie from './components/AddMovie'
import MovieList from './components/MovieList'
import MoviesDetails from './components/MoviesDetails.tsx'
import './App.css'

export interface Movie {
    id: number
    title: string
    watched: boolean
}

function App() {
    const [movies, setMovies] = useState<Movie[]>([
        { id: 1, title: 'Inception', watched: false },
        { id: 2, title: 'The Matrix', watched: true },
        { id: 3, title: 'Interstellar', watched: false },
        { id: 4, title: "Obsession", watched: true},
    ])

    const addMovie = (title: string): void => {
        const newMovie = {
            id: Date.now(),
            title: title,
            watched: false,
        }
        setMovies([...movies, newMovie])
    }

    const deleteMovie = (id: number) => {
        setMovies(movies.filter((m) => m.id !== id))
    }

    const toggleWatched = (id: number) => {
        setMovies(
            movies.map((m) =>
                m.id === id ? { ...m, watched: !m.watched } : m
            )
        )
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="flex items-center gap-3">
                        <span>🎬</span>
                        <h1 className="text-2xl font-bold bg-blue-400">My Movie Watchlist</h1>
                        <AddMovie onAdd={addMovie} />
                        <MovieList
                            movies={movies}
                            onDelete={deleteMovie}
                            onToggle={toggleWatched}
                        />
                    </div>
                }
            />
            <Route path="/movie/:id" element={<MoviesDetails movies={movies} />} />
        </Routes>
    )
}

export default App