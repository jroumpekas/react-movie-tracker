import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AddMovie from './components/AddMovie'
import MovieList from './components/MovieList'
import MoviesDetails from './components/MoviesDetails'
import './App.css'
import backgroundImage from './assets/background.png'

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
        { id: 4, title: "Obsession", watched: true },
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
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                width: '100vw', // Καλύπτει όλο το πλάτος
                margin: 0,
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Το κεντρικό κουτί που προστατεύει το περιεχόμενο */}
            <div
                style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px',
                    padding: '32px',
                    maxWidth: '550px',
                    width: '90%', // Προσαρμόζεται ωραία σε μικρές οθόνες
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                }}
            >
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Τίτλος */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '2.2rem' }}>🎬</span>
                                    <h1
                                        style={{
                                            fontSize: '1.8rem',
                                            fontWeight: 'bold',
                                            margin: 0,
                                            color: '#ffffff',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        My Movie Watchlist
                                    </h1>
                                </div>

                                {/* Φόρμα προσθήκης */}
                                <AddMovie onAdd={addMovie} />

                                {/* Λίστα ταινιών */}
                                <MovieList
                                    movies={movies}
                                    onDelete={deleteMovie}
                                    onToggle={toggleWatched}
                                />
                            </div>
                        }
                    />
                    <Route
                        path="/movie/:id"
                        element={<MoviesDetails movies={movies} />}
                    />
                </Routes>
            </div>
        </div>
    )
} // Έκλεισε η συνάρτηση App

export default App