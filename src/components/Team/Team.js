/* eslint-disable eqeqeq */
import React from 'react'
import _moment from 'moment'
import gravatarUrl from 'gravatar-url'
import TeamEditDelete from '../modals/TeamEditDelete'
import { useDispatch } from 'react-redux'
import { selectedTeam } from '../../features/teams/teamsSlice'
const Team = ({
  team,
  setType,
  type,
  text,
  setError,
  error,
  setText,
  assigns,
  myInfo,
  setAssigns,
  color,
  setColor,
  assignsUserInfo,
  handleUpdateTeam,
  handleRemoveAssign,
  isEdit,
  isDelete,
  editModal,
  handleRemove,
  deleteModal,
}) => {
  const dispatch = useDispatch()
  return (
    <>
      <div
        className="relative p-4 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
        draggable="true"
      >
        <div
          className={`flex justify-between items-center`}
          onClick={() => {
            setAssigns(team?.assigns)
            dispatch(selectedTeam(team))
          }}
        >
          <div>
            {!team?.color&& team.type.toLowerCase() === 'dev' && (
              <span className="py-1 h-6 px-3 text-xs font-semibold text-green-500 bg-green-100 rounded-full capitalize font-medium">
                {team.type}
              </span>
            )}
            {!team?.color && team.type.toLowerCase() === 'design' && (
              <span className=" py-1 h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full capitalize font-medium">
                {team.type}
              </span>
            )}
            {!team?.color && team.type.toLowerCase() === 'copyright' && (
              <span className="py-1 h-6 px-3 text-xs font-semibold text-yellow-500 bg-yellow-100 rounded-full capitalize font-medium">
                {team.type}
              </span>
            )}
             {team?.color && (
                <span
                  className={`px-2 py-1 h-6 px-3 text-xs font-semibold text-${team.color}-500 bg-${team.color}-100 rounded-full capitalize font-medium`}
                >
                  {team?.type}
                </span>
              )}
          </div>
          <div>
            <TeamEditDelete
              isDelete={isDelete}
              isEdit={isEdit}
              text={text}
              type={type}
              color={color}
              setColor={setColor}
              error={error}
              setText={setText}
              myInfo={myInfo}
              setType={setType}
              assignsUserInfo={assignsUserInfo}
              handleRemoveAssign={handleRemoveAssign}
              editModal={editModal}
              assigns={assigns}
              setAssigns={setAssigns}
              handleUpdateTeam={handleUpdateTeam}
              handleRemove={handleRemove}
              setError={setError}
              deleteModal={deleteModal}
            />
          </div>
        </div>
        <div className="pt-2">
          <p> {team.title}</p>
        </div>
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400 justify-between">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none"> {_moment(team.createdAt).format('MMM YY')}</span>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-x-2">
            {(team?.assigns?.length > 0 &&
            team?.assigns[0] &&
            team?.assigns[0].split('-')?.length > 1
              ? team?.assigns[0].split('-')
              : [team?.assigns]
            ).map((assign, i) => (
              <div key={i} className="flex items-center shadow-lg p-[2px] rounded relative z-[299]"title={assign}>
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src={
                    assign?.avt
                      ? assign.avt
                      : gravatarUrl(assign, {
                          size: 75,
                        })
                  }
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Team
