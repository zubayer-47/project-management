/* eslint-disable eqeqeq */
import { Dialog, Transition } from '@headlessui/react'
import gravatarUrl from 'gravatar-url'
import { Fragment,  } from 'react'
import { useSelector } from 'react-redux'
import SuggestPeople from '../combobox/SuggestPeople'
export default function EditModal({
  data,
  isOpen,
  handleModal,
  handleUpdateTask,
  setText,
  setType,
  type,
  text,
  assigns,
  setAssigns,
  handleRemoveAssign,
  setAssignsUserInfo,
  assignsUserInfo,
  myInfo,
}) {
  const { selectedTask } = useSelector((state) => state)
  const title = (text === null && selectedTask?.selected?.title) || text || ''
  const typeT = (type === null && selectedTask?.selected?.type) || type || ''

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[500]" onClose={handleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Update Task
                    <div className="mb-20">
                      <SuggestPeople assigns={assigns} setAssigns={setAssigns} />
                    </div>
                  </Dialog.Title>
                  <div className="flex mt-2 items-center justify-center flex-wrap gap-x-2">
                    <span>assigns:</span>
                    {assignsUserInfo?.length > 0 &&
                      assignsUserInfo.map((assign, i) => (
                        <div
                          key={i}
                          className="flex items-center shadow-lg p-[2px] rounded relative z-[299]"
                        >
                          <img
                            className="object-cover w-10 h-10 rounded-full"
                            src={
                              assign?.avt
                                ? assign.avt
                                : gravatarUrl(assign.email, {
                                    size: 80,
                                  })
                            }
                            alt=""
                          />
                          <span className={`px-2`}>{assign.name} </span>
                          {assign.email == myInfo?.email ? (
                            ''
                          ) : (
                            <div
                              className="border-2 text-red-500 px-2 rounded !cursor-pointer"
                              onClick={() => handleRemoveAssign(assign)}
                            >
                              x
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                  <div className="mt-2 py-4">
                    <form className="mt-8 space-y-6" action="#" onSubmit={handleUpdateTask}>
                      <input type="hidden" name="remember" defaultValue="true" />
                      <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                          <p className="sr-only">
                            Issue
                          </p>
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setText(e.target.value)}
                            autoComplete="text"
                            required
                            maxLength={200}
                            className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-md"
                            placeholder="write issue Title"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="type issue" className="sr-only">
                            Type
                          </label>
                          <input
                            type="text"
                            value={typeT}
                            onChange={(e) => setType(e.target.value)}
                            autoComplete="text"
                            maxLength={10}
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-md"
                            placeholder="Write issue type ex: dev, design, copyright, etc"
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        >
                          Issue Update
                        </button>
                        <button
                          onClick={handleModal}
                          className="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        >
                          Canceled
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
