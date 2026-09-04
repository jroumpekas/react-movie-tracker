import { useState } from 'react'


interface AddMovieProps {
    onAdd: (title: string) => void
}

function AddMovie({ onAdd }: AddMovieProps) {
    const [title, setTitle] = useState('')

    const handleSubmit = () => {
        if (title.trim() === '') return
        onAdd(title)
        setTitle('')
    }

    return (
        <div className="add-movie">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add Movie Title..."
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button onClick={handleSubmit}>Add</button>
        </div>
    )
}

export default AddMovie