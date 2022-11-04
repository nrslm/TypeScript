import React, { useState } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { IRepo } from '../models/models'

function RepoCard({ repo }: { repo: IRepo }) {
    const { addFavourites, removeFavourites } = useActions()

    const { favourites } = useAppSelector(state => state.github)

    const [isFav, setIsFav] = useState(favourites.includes(repo.html_url))

    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault() 
        addFavourites(repo.html_url)
        setIsFav(true)
    }

    const removeFromFavourites = (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault()
        removeFavourites(repo.html_url)
        setIsFav(false)
    }

    return (
        <div className='border-black py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all bg-gray-300'>
            <a href={repo.html_url} target="_blank">
                <h1 className='text-lg font-bold'>
                    {repo.full_name}
                </h1>
                <p>
                    Forks: <span className='fond-bold m-2'>{repo.forks}</span>
                    Watchers: <span className='fond-bold'>{repo.watchers}</span>
                </p>
                <p className="text-sm font-thin">
                    {repo?.description}
                </p>

                {!isFav && <button
                    className='py-2 px-4 bg-yellow-400 m-2 rounded hover:shadow-md transition-all'
                    onClick={addToFavourite}
                >
                    Add +
                </button>}
                {isFav && <button
                    className='py-2 px-4 bg-red-500 text-white rounded hover:shadow-md transition-all'
                    onClick={removeFromFavourites}
                >
                    remove
                </button>}
            </a>
        </div>
    )
}

export default RepoCard