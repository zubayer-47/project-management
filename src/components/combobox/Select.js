/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { teamsApi } from '../../features/teams/teamsApi'
import _ from 'lodash'
export default function Select({ type, setType }) {
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(data[0])
  useEffect(() => {
    dispatch(teamsApi.endpoints.getTeamsAll.initiate())
      .unwrap()
      .then((res) => {
        setData(
          _.uniqBy(
            [
              ...res,
              ...[
                { type: 'design', color: 'purple' },
                { title: 'dev', color: 'blue' },
                { type: 'tech', color: 'green' },
                { type: 'news', color: 'red' },
              ],
            ],
            function (e) {
              // eslint-disable-next-line eqeqeq
              return e.type == '' || e.type
            },
          ),
        )
      })
  }, [dispatch])
  return (
    <div className="w-full">
      Select Your Teams
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1 z z-[200] overflow-auto h-[80px]">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{type}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data?.length > 0 &&
                data.map((item, itemIdx) => (
                  <Listbox.Option
                    key={itemIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={item}
                    onClick={() => setType(item?.type)}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {item?.type}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
