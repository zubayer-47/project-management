import gravatarUrl from 'gravatar-url'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { userLoggedOut } from '../../features/auth/authSlice'
function Header({ debouncedSearch, show = true }) {
  const myInfo = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const logOut = () => {
    localStorage.clear()
    dispatch(userLoggedOut)
    setTimeout(() => {
      window.location.replace('/login')
    }, 300)
  }
  return (
    <>
      <div className="flex items-center w-full h-16 px-10 bg-white bg-opacity-75">
        <Link to="/projects">
          <img alt="" src="./images/logo.png" className="h-10 w-10" />
        </Link>
        {show && (
          <input
            className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
            type="search"
            onKeyUp={(event) => debouncedSearch(event.target.value)}
            placeholder="Search for anything…"
          />
        )}
        <div className="ml-10">
          <NavLink
            to="/projects"
            className={(active) =>
              active.isActive
                ? 'text-indigo-700 mx-2 text-sm font-semibold'
                : 'text-gray-600 mx-2 text-sm font-semibold'
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/teams"
            className={(active) =>
              active.isActive
                ? 'text-indigo-700 mx-2 text-sm font-semibold'
                : 'text-gray-600 mx-2 text-sm font-semibold'
            }
          >
            Team
          </NavLink>
        </div>
        <button className="flex mr-2 items-center  shadow-sm justify-center w-58 h-10 ml-auto overflow-hidden rounded-full cursor-pointer hover:text-blue-500">
          <p>{myInfo?.user?.name}</p>
          <img
            className="object-cover w-10 h-10 ml-2 rounded-full"
            src={
              myInfo?.user?.avt
                ? myInfo?.user.avt
                : gravatarUrl(myInfo?.user?.email, {
                    size: 100,
                  })
            }
            alt=""
          />
        </button>

        <button
          className="border rounded px-4 py-1 hover:bg-red-500 bg-blue-500 text-white hover:text-white"
          onClick={logOut}
        >
          Log Out
        </button>
      </div>
    </>
  )
}

export default Header
