import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { usersApi } from '../../features/users/usersApi'
import { validateEmail } from '../../utils/func'
import gravatarUrl from 'gravatar-url'
export default function SuggestPeople({ setAssigns }) {
  const [findUser, setFindUser] = useState('')
  const [error, setError] = useState({})
  const dispatch = useDispatch()
  const [selected, setSelected] = useState('')
  const [query, setQuery] = useState('')
  const handleSearch = (value) => {
    if (validateEmail(value))
      dispatch(usersApi.endpoints.getUser.initiate(value))
        .unwrap()
        .then((res) => {
          if (res.data.statusCode === 200) {
            setError({})
            setFindUser(res.data.data)
          } else {
            setFindUser('')
            setError(res.data.error)
          }
        })
  }
  const debounce = (fn, delay) => {
    let timeOut
    return (...arg) => {
      clearTimeout(timeOut)
      timeOut = setTimeout(() => {
        fn(...arg)
      }, delay)
    }
  }
  const callBack = debounce(handleSearch, 600)
  useEffect(() => {
    if (selected.email) {
      setAssigns((acc) => [
        Array.isArray(acc) ? acc[0] + '-' + selected?.email : acc + '-' + selected?.email,
      ])
    }
  }, [selected, setAssigns])
  return (
    <div className="fixed right-6 top-5 w-61 z-40 h-40 overflow-y-auto overflow-x-hidden">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-0 focus-visible:ring-whitefocus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm flex items-center ">
            <Combobox.Input
              placeholder="search"
              displayValue={(user) => user?.email}
              className="w-full outline-blue-500 border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              onChange={(event) => callBack(event.target.value)}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 right-0 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {error?.message && (
                <div className="relative cursor-default select-none py-2 px-4 text-red-700">
                  {error.message}
                </div>
              )}
              {!findUser && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700 ">
                  Nothing found.
                </div>
              ) : (
                <Combobox.Option
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-200 text-black' : 'text-gray-900'
                    }`
                  }
                  value={findUser}
                >
                  {({ selected, active }) => (
                    <div className="flex items-center">
                      {findUser.email && (
                        <img
                          className="object-cover w-10 h-10 rounded-full mr-2"
                          src={gravatarUrl(findUser.email, {
                            size: 80,
                          })}
                          alt=""
                        />
                      )}
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {findUser.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        ></span>
                      ) : null}
                    </div>
                  )}
                </Combobox.Option>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
