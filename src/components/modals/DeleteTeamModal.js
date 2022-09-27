/* eslint-disable eqeqeq */
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function DeleteTeamModal({
  isOpen,
  setError,
  error,
  handleModal,
  handleRemove,
}) {
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Delete This Team?
                  </Dialog.Title>
                  <div className="flex mt-2 items-center justify-center text-gray-400 flex-wrap gap-x-2 mb-5">
                    <p>Team will only be removed from this Teams</p>
                  </div>
                  <button
                    className="border bg-red-500 hover:bg-red-600 rounded text-white px-4 py-1 mr-3 focus:outline-none"
                    onClick={() => handleRemove()}
                  >
                    Delete
                  </button>
                  <button
                    className="border bg-green-700 hover:bg-green-600 rounded text-white px-4 py-1 focus:outline-none"
                    onClick={handleModal}
                  >
                    Cancel
                  </button>
                  {error && (
                    <div className="py-4 text-red-500 capitalize">
                      <p> {error}</p>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
