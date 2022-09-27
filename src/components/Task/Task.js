/* eslint-disable eqeqeq */
import gravatarUrl from 'gravatar-url'
import React, { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import _moment from 'moment'
import { useDispatch } from 'react-redux'
import { selectedTask } from '../../features/projects/projectsSlice'
import EditAndDeletePopOver from '../modals/EditAndDeletePopOver'
import { teamsApi } from '../../features/teams/teamsApi'
function Task({
  data,
  index,
  assigns,
  myInfo,
  text,
  type,
  setType,
  setError,
  error,
  setAssigns,
  setAssignsUserInfo,
  assignsUserInfo,
  setText,
  handleUpdateTask,
  handleRemoveTask,
  handleRemoveAssign,
  isDelete,
  show,
  deleteModal,
}) {
  const dispatch = useDispatch()
  const [teamsData, setTeamsData] = useState([])
  useEffect(() => {
    dispatch(teamsApi.endpoints.getTeamsAll.initiate())
      .unwrap()
      .then((res) => {
        setTeamsData(res)
      })
  }, [dispatch, teamsData])
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-md p-3 m-3 mt-0 last:mb-0 ${
            data?.matched ? 'border-yellow-400 bg-sky-200 border-2 animate-bounce' : ''
          }`}
          onClick={() => {
            setAssigns(data?.assigns)
            dispatch(selectedTask(data))
          }}
        >
          <div className={`flex items-center justify-between relative`}>
            <div>
              {!data?.color && data.type.toLowerCase() === 'dev' && (
                <span className="py-1 h-6 px-3 text-xs font-semibold text-green-500 bg-green-100 rounded-full capitalize font-medium">
                  {data.type}
                </span>
              )}
              {!data?.color && data.type.toLowerCase() === 'design' && (
                <span className=" py-1 h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full capitalize font-medium">
                  {data.type}
                </span>
              )}
              {!data?.color && data.type.toLowerCase() === 'copyright' && (
                <span className="py-1 h-6 px-3 text-xs font-semibold text-yellow-500 bg-yellow-100 rounded-full capitalize font-medium">
                  {data.type}
                </span>
              )}
              {data?.color && (
                <span
                  className={`px-2 py-1 h-6 px-3 text-xs font-semibold text-${data.color}-500 bg-${data.color}-100 rounded-full capitalize font-medium`}
                >
                  {data?.type}
                </span>
              )}
            </div>
            <div className="basis-[9%]">
              {show && (
                <EditAndDeletePopOver
                  show={show}
                  teamsData={teamsData}
                  deleteModal={deleteModal}
                  setType={setType}
                  type={type}
                  isDelete={isDelete}
                  setError={setError}
                  error={error}
                  handleUpdateTask={handleUpdateTask}
                  text={text}
                  setText={setText}
                  setAssigns={setAssigns}
                  setAssignsUserInfo={setAssignsUserInfo}
                  assigns={assigns}
                  assignsUserInfo={assignsUserInfo}
                  handleRemoveAssign={handleRemoveAssign}
                  handleRemoveTask={handleRemoveTask}
                  myInfo={myInfo}
                />
              )}
            </div>
          </div>
          <h5 className="my-4 leading-6 text-sm font-medium capitalize">{data.title}</h5>
          <div className="flex justify-between">
            <div className="flex space-x-2 items-center">
              <span className="flex space-x-1 items-center font-medium text-gray-400">
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
                <span className="ml-1 leading-none text-sm">
                  {_moment(data.createdAt).format('MMM YY')}
                </span>
              </span>
            </div>

            <ul className="flex space-x-3">
              <div className="flex items-center justify-center flex-wrap gap-x-2">
                {(data?.assigns?.length > 0 &&
                data?.assigns[0] &&
                data?.assigns[0].split('-')?.length > 1
                  ? data?.assigns[0].split('-')
                  : [data?.assigns]
                ).map((assign, i) => (
                  <div
                    key={i}
                    className="flex items-center shadow-lg p-[2px] rounded relative z-[299]"
                    title={assign}
                  >
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src={
                        assign?.avt
                          ? assign.avt
                          : gravatarUrl('abc', {
                              size: 80,
                            })
                      }
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </ul>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Task
