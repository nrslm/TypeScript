import React, { useState, useEffect } from 'react'
import RepoCard from '../components/RepoCard'
import { useDebounce } from '../hooks/debounce'
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api'

function HomePage() {
  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const debounced = useDebounce(search)
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0)
    console.log(debounced)
  }, [debounced, data])

  const clickHandler = (userName: string) => {
    fetchRepos(userName)
    setDropdown(false)
  }
  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      {
        isError && <p className={"text-center text-red-600"}>
          Something went wrong...
        </p>
      }
      <div className='relative w-[560px]'>
        <input
          type="text"
          className='border py-2 px-4 w-full h-[42px] mb-2'
          placeholder='Search for github userName...'
          onChange={(e) => setSearch(e.target.value)}
        />
        {dropdown && <ul className='list-none absolute top-[42px] right-0 left-0  shadow-md bg-white'>
          {isLoading && <p className='text-center'>Loading...</p>}
          {data?.map(user => (
            <li
              key={user.id}
              onClick={() => clickHandler(user.login)}
              className={"py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"}
            >
              {user.login}
            </li>
          ))}
        </ul>}

        <div className="constiner">
          {areReposLoading && <p className='text-center'>Repos are loading...</p>}
          {
            repos?.map(repo => <RepoCard repo={repo} key={repo.id} />)
          }
        </div>
      </div>
    </div>
  )
}

export default HomePage