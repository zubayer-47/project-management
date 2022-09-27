import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Task from '../components/Task/Task'
import { ChevronDownIcon } from '@heroicons/react/outline'
import Header from '../components/Shared/Header'
import FormModal from '../components/modals/FormModal'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import { projectsApi } from '../features/projects/projectsApi'
import { useDispatch } from 'react-redux'
import { usersApi } from '../features/users/usersApi'
import { apiSlice } from '../features/api/apiSlice'
import { fullTaskSelected } from '../features/projects/projectsSlice'
import { fullTextSearching } from '../utils/func'
const Projects = () => {
  const dispatch = useDispatch()
  const { fullTaskSelect, selected } = useSelector((state) => state?.selectedTask)
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const myInfo = useSelector((state) => state.auth)
  const [assigns, setAssigns] = useState([myInfo?.user?.email])
  const [boardData, setBoardData] = useState([])
  const [assignsUserInfo, setAssignsUserInfo] = useState([])
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [text, setText] = useState(null)
  const [type, setType] = useState(null)
  const handleRemoveAssign = async (assign) => {
    if (Array.isArray(assigns)) {
      if (assigns.length > 0 && assigns[0].split('-')?.length > 1) {
        const removeUser = _.cloneDeep(assigns[0].split('-')).filter(
          (item) => item !== assign?.email,
        )
        setAssigns(removeUser)
      }
    }
  }
  useEffect(() => {
    if (window) {
      dispatch(projectsApi.endpoints.getProjects.initiate(myInfo?.user?.email))
        .unwrap()
        .then((res) => {
          if (Array.isArray(res) && res?.length > 0 && myInfo?.user?.email) {
            res.forEach((itemDoc, i) => {
              if (itemDoc?.id == null) {
                setTimeout(() => {
                  dispatch(
                    projectsApi.endpoints.createProjects.initiate({
                      id: uuidv4(),
                      name: itemDoc.name,
                      items: itemDoc.items,
                      by: myInfo?.user?.email,
                    }),
                  )
                    .unwrap()
                    .then((res) => {
                      if (res?.id) {
                        setBoardData((prev) => [...prev, res])
                        dispatch(
                          apiSlice.util.updateQueryData(
                            'getProjects',
                            myInfo?.user?.email,
                            (draft) => {
                              draft.unshift(res)
                            },
                          ),
                        )
                      }
                    })
                }, 1000)
              } else if (itemDoc?.id) {
                setBoardData((prev) => [...prev, itemDoc])
              } else {
                setError('internal Error 500')
              }
            })
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, myInfo?.user?.email])

  const onDragEnd = (re) => {
    if (!re.destination) return
    let newBoardData = _.cloneDeep(boardData)
    var dragItem = newBoardData[parseInt(re.source.droppableId)].items[parseInt(re.source.index)]
    newBoardData[parseInt(re.source.droppableId)].items.splice(parseInt(re.source.index), 1)
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem,
    )
    const perviousDrogItem = newBoardData[parseInt(re.source.droppableId)]
    const updatedDestinationDrog = newBoardData.find(
      (_item, i) => parseInt(i) === parseInt(re.destination.droppableId),
    )
    setBoardData(newBoardData)
    if (updatedDestinationDrog) {
      dispatch(projectsApi.endpoints.updateProject.initiate(updatedDestinationDrog)).unwrap()
      dispatch(
        apiSlice.util.updateQueryData('getProjects', myInfo?.user?.email, (draft) => {
          return (draft = newBoardData)
        }),
      )
      if (perviousDrogItem) {
        dispatch(
          apiSlice.util.updateQueryData('getProjects', myInfo?.user?.email, (draft) => {
            return (draft = newBoardData)
          }),
        )
        dispatch(projectsApi.endpoints.updateProject.initiate(perviousDrogItem)).unwrap()
      }
    }
  }

  const clearForm = () => {
    setText('')
    setType('')
    setAssigns('')
    setAssignsUserInfo([myInfo?.user])
  }
  const handleCreateIssue = (e) => {
    e.preventDefault()
    const item = {
      id: uuidv4(),
      title: text,
      type: type,
      createdAt: Date.now(),
      assigns: assigns || [],
      creator: [myInfo?.user?.email],
    }
    let newBoardData = _.cloneDeep(boardData)
    if (Array.isArray(newBoardData) && newBoardData?.length > 0) {
      if (item) {
        newBoardData[0].items.unshift(item)
        dispatch(
          projectsApi.endpoints.updateProject.initiate({
            id: newBoardData[0]?.id,
            name: newBoardData[0]?.name,
            items: [...newBoardData[0].items, item],
            by: myInfo?.user?.email,
          }),
        ).unwrap()
        dispatch(
          apiSlice.util.updateQueryData('getProjects', myInfo?.user?.email, (draft) => {
            return (draft = newBoardData)
          }),
        )
      }
      setBoardData(newBoardData)
    }

    clearForm()
    handleModal()
  }
  const handleModal = () => {
    setIsOpen(!isOpen)
  }
  const deleteModal = () => {
    setIsDelete(!isDelete)
  }
  const editModal = () => {
    setIsEdit(!isEdit)
  }
  useEffect(() => {
    if (assigns[0]) {
      dispatch(usersApi.endpoints.getAssignsUsers.initiate([assigns[0]]))
        .unwrap()
        .then((res) => {
          if (res?.length) {
            setAssignsUserInfo(res)
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assigns, dispatch])
  const handleUpdateTask = (e) => {
    e.preventDefault()
    const selectedBoard = _.cloneDeep(boardData)
    const selectedRootId = fullTaskSelect?.id
    const selectTaskId = selected?.id
    const rootIndex = _.findIndex(selectedBoard, { id: selectedRootId })

    if (rootIndex !== -1) {
      // eslint-disable-next-line eqeqeq
      const selectTask = _.findIndex(selectedBoard[rootIndex]?.items, { id: selectTaskId })
      if (selectTask !== -1) {
        selectedBoard[rootIndex].items[selectTask] = {
          ...selectedBoard[rootIndex]?.items[selectTask],
          type: type || selectedBoard[rootIndex]?.items[selectTask]?.type,
          title: text || selectedBoard[rootIndex]?.items[selectTask]?.title,
          assigns: assigns || selectedBoard[rootIndex]?.items[selectTask]?.assigns,
        }
        const updateSync = selectedBoard[rootIndex]
        dispatch(projectsApi.endpoints.updateProject.initiate(updateSync)).unwrap()
        dispatch(
          apiSlice.util.updateQueryData('getProjects', myInfo?.user?.email, (draft) => {
            return (draft = selectedBoard)
          }),
        )
      }
      setBoardData(selectedBoard)
    }
    clearForm()
    editModal()
  }
  const handleRemoveTask = () => {
    const selectedBoard = _.cloneDeep(boardData)
    const selectedRootId = fullTaskSelect?.id
    const selectTaskId = selected?.id
    const rootIndex = _.findIndex(selectedBoard, { id: selectedRootId })
    const isValidPermission =
      Array.isArray(selected?.creator) &&
      selected?.creator?.length > 0 &&
      selected.creator.includes(myInfo?.user?.email)
    if (isValidPermission) {
      if (rootIndex !== -1) {
        // eslint-disable-next-line eqeqeq
        const selectTask = _.findIndex(selectedBoard[rootIndex]?.items, { id: selectTaskId })
        if (selectTask !== -1) {
          selectedBoard[rootIndex].items = selectedBoard[rootIndex]?.items.filter(
            (_, i) => parseInt(i) !== parseInt(selectTask),
          )
          const updateSync = selectedBoard[rootIndex]
          dispatch(projectsApi.endpoints.updateProject.initiate(updateSync)).unwrap()
          dispatch(
            apiSlice.util.updateQueryData('getProjects', myInfo?.user?.email, (draft) => {
              return (draft = selectedBoard)
            }),
          )
          deleteModal()
        }
        setBoardData(selectedBoard)
      }
    } else {
      setError('Permission denied! you can perform only Task Creator Person')
    }
  }
  const handleSearch = (value) => {
    let copyBoard = _.cloneDeep(boardData)
    const result = fullTextSearching(copyBoard, value)
    setBoardData(result)
  }

  const debouncedSearch = _.debounce(handleSearch, 1000)
  return (
    <>
      <Header debouncedSearch={debouncedSearch} />

      <div className="p-10 flex flex-col w-[1920px] h-screen text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        {/* Board header */}
        <div className="flex flex-initial justify-between">
          <div className="flex items-center">
            <h4 className="text-2xl font-bold text-gray-600">Project Board</h4>
            <ChevronDownIcon
              className="w-7 h-7 text-gray-500 rounded-full
            p-1 bg-white ml-5 shadow-xl"
            />
          </div>
        </div>

        {/* Board columns */}

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-6 gap-4 gap-5 my-5">
            {boardData?.length > 0 &&
              boardData.map((board, i) => {
                return (
                  <div key={i} onClick={() => dispatch(fullTaskSelected(board))}>
                    <Droppable droppableId={i.toString()}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="w-full h-[500px] overflow-y-auto"
                        >
                          <div
                            className={`bg-gradient-to-tr from-blue-100 rounded-md shadow-md
                            ${snapshot.isDraggingOver && 'bg-green-100'}`}
                          >
                            <div className="flex items-center flex-shrink-0 h-10 px-2">
                              <span className="block text-sm font-semibold capitalize">
                                {board?.name}
                              </span>
                              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                                {board?.items?.length}
                              </span>
                              {board?.name?.toLowerCase() === 'backlog' && (
                                <button
                                  className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
                                  onClick={handleModal}
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                            <div className="overflow-y-auto w-full overflow-x-hidden h-auto">
                              {board.items.length > 0 &&
                                board.items.map((item, iIndex) => {
                                  return (
                                    <Task
                                      key={iIndex}
                                      data={item}
                                      isDelete={isDelete}
                                      isEdit={isEdit}
                                      setText={setText}
                                      text={text}
                                      type={type}
                                      setType={setType}
                                      myInfo={myInfo?.user}
                                      deleteModal={deleteModal}
                                      editModal={editModal}
                                      setError={setError}
                                      error={error}
                                      handleModal={handleModal}
                                      show={board?.name?.toLowerCase() === 'backlog'}
                                      index={iIndex}
                                      handleRemoveAssign={handleRemoveAssign}
                                      assigns={assigns}
                                      handleUpdateTask={handleUpdateTask}
                                      handleRemoveTask={handleRemoveTask}
                                      setAssigns={setAssigns}
                                      createOpen={isOpen}
                                      setAssignsUserInfo={setAssignsUserInfo}
                                      assignsUserInfo={assignsUserInfo}
                                      className="m-3 cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
                                    />
                                  )
                                })}
                              {provided.placeholder}
                            </div>
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                )
              })}
          </div>
        </DragDropContext>
        {error && (
          <div>
            <h2 className="text-xl font-bold ">{error}</h2>
          </div>
        )}
      </div>
      {isOpen && (
        <FormModal
          handleModal={handleModal}
          handleCreateIssue={handleCreateIssue}
          text={text}
          setText={setText}
          type={type}
          myInfo={myInfo?.user || {}}
          setType={setType}
          isOpen={isOpen}
          setAssignsUserInfo={setAssignsUserInfo}
          assignsUserInfo={assignsUserInfo}
          handleRemoveAssign={handleRemoveAssign}
          setAssigns={setAssigns}
          assigns={assigns}
        />
      )}
    </>
  )
}
export default Projects
