import { Popover } from '@headlessui/react'
import DeleteTeamModal from './DeleteTeamModal'
import EditTeamModal from './EditTeamModal'
export default function TeamEditDelete({
  assigns,
  setAssigns,
  handleRemoveAssign,
  text,
  setText,
  setType,
  type,
  color,
  setColor,
  handleUpdateTeam,
  isDelete,
  editModal,
  isEdit,
  handleRemove,
  setError,
  error,
  deleteModal,
  myInfo,
  assignsUserInfo,
}) {
  return (
    <Popover>
      {({ open }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <Popover.Button className="focus:outline-none">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </Popover.Button>
          <div className="right-5 top-2 absolute rounded shadow-xl px-4 py-1">
            <Popover.Panel>
              <div className="text-center rounded-full mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => {
                    editModal()
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
              <div className="text-center rounded-full mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => deleteModal()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            </Popover.Panel>
          </div>
          {isEdit && (
            <EditTeamModal
              error={error}
              text={text}
              type={type}
              color={color}
              setColor={setColor}
              handleRemoveAssign={handleRemoveAssign}
              assignsUserInfo={assignsUserInfo}
              setText={setText}
              setType={setType}
              setError={setError}
              isOpen={isEdit}
              myInfo={myInfo}
              assings={assigns}
              setAssigns={setAssigns}
              handleUpdateTeam={handleUpdateTeam}
              handleModal={editModal}
              handleRemove={handleRemove}
            />
          )}
          {isDelete && (
            <DeleteTeamModal
              error={error}
              setError={setError}
              isOpen={isDelete}
              handleModal={deleteModal}
              handleRemove={handleRemove}
            />
          )}
        </>
      )}
    </Popover>
  )
}
