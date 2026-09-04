import {Link, useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Movie } from '../App'

interface TmdbInfo {
    title: string
    overview: string
    posterPath: string | null
    releaseDate: string
    extraImages: string[]
}

const API_KEY = '8e771e90a912ea0bedb66e8d9b8acd59'
const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

function MoviesDetails({ movies }: { movies: Movie[] }) {
    const { id } = useParams<{ id: string }>()
    const movie = movies.find(m => m.id === Number(id))

    const [info, setInfo] = useState<TmdbInfo | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!movie) return

        async function fetchDetails() {
            const searchRes = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movie.title)}`
            )
            const searchData = await searchRes.json()
            const found = searchData.results?.[0]

            if (!found) {
                setLoading(false)
                return
            }

            const imagesRes = await fetch(
                `https://api.themoviedb.org/3/movie/${found.id}/images?api_key=${API_KEY}`
            )
            const imagesData = await imagesRes.json()
            const extraImages = (imagesData.backdrops || [])
                .slice(0, 5)
                .map((img: { file_path: string }) => `${IMG_BASE}${img.file_path}`)

            setInfo({
                title: found.title,
                overview: found.overview,
                posterPath: found.poster_path ? `${IMG_BASE}${found.poster_path}` : null,
                releaseDate: found.release_date,
                extraImages
            })
            setLoading(false)
        }

        fetchDetails()
    }, [movie])

    if (!movie) return <p>Η ταινία δεν βρέθηκε.</p>
    if (loading) return <p>Φόρτωση...</p>
    if (!info) return <p>Δεν βρέθηκαν πληροφορίες.</p>

    return (
        <div>

            <Link to="/">← Πίσω στη λίστα</Link>

            <h1>{info.title} ({info.releaseDate?.slice(0, 4)})</h1>
            {info.posterPath && <img src={info.posterPath} alt={info.title} width={300} />}
            <p>{info.overview}</p>

            {info.extraImages.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {info.extraImages.map((src, i) => (
                        <img key={i} src={src} alt={`${info.title} ${i}`} width={200} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default MoviesDetails