import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import TeamModal from '../components/modals/TeamModal'
import Header from '../components/Shared/Header'
import Team from '../components/Team/Team'
import _ from 'lodash'
import { usersApi } from '../features/users/usersApi'
import { teamsApi } from '../features/teams/teamsApi'
import { v4 as uuidv4 } from 'uuid'
const Teams = () => {
  const dispatch = useDispatch()
  const { teams: team } = useSelector((state) => state)
  const [teams, setTeams] = useState([])
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const myInfo = useSelector((state) => state.auth)
  const [error, setError] = useState('')
  const [color, setColor] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('')
  const [type, setType] = useState('')
  const [assigns, setAssigns] = useState([myInfo?.user?.email])
  const [assignsUserInfo, setAssignsUserInfo] = useState([])
  const clearForm = () => {
    setText('')
    setType('')
    setAssigns('')
    setAssignsUserInfo('')
  }
  const handleModal = () => {
    setIsOpen(!isOpen)
  }
  const handleCreateTeams = (e) => {
    e.preventDefault()
    // eslint-disable-next-line eqeqeq
    if (type == '') {
      setError('Please Type your Teams Name')
    }
    if (error) {
      return
    }
    const item = {
      id: uuidv4(),
      type: type,
      title: text,
      color: color || '',
      assigns: assigns || [myInfo?.user?.email],
      creatorBy: [myInfo?.user?.email],
      createdAt: Date.now(),
    }
    dispatch(teamsApi.endpoints.createTeam.initiate(item))
      .unwrap()
      .then((res) => {
        if (res?.id) {
          setTeams((prev) => [res, ...prev])
        }
      })
    clearForm()
    handleModal()
  }
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
    dispatch(teamsApi.endpoints.getTeams.initiate(myInfo?.user?.email))
      .unwrap()
      .then((res) => {
        setTeams(res)
      })
  }, [dispatch, myInfo?.user?.email])
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
  const handleExistCheck = (value) => {
    dispatch(teamsApi.endpoints.teamExistChecker.initiate(value))
      .unwrap()
      .then((res) => {
        if (res.length === 0) {
          setError('')
        } else {
          setError('Teams already exists!')
        }
      })
  }
  const handleDebounce = _.debounce(handleExistCheck, 1000)
  const deleteModal = () => {
    setIsDelete(!isDelete)
  }
  const editModal = () => {
    setIsEdit(!isEdit)
  }
  const handleRemove = () => {
    const teamId = team?.team?.id
    if (!teamId) return setError('wrong team selected')
    if (teamId) {
      const docs = teams.filter((item) => item.id !== teamId)
      setTeams(docs)
      dispatch(teamsApi.endpoints.deleteTeam.initiate(teamId))
      deleteModal()
    }
  }
  const handleUpdateTeam = (e) => {
    e.preventDefault()
    const teamDoc = team?.team
    // eslint-disable-next-line eqeqeq
    if (type == '') {
      setError('Please Type your Teams Name')
    }

    if (teamDoc?.creatorBy?.includes(myInfo?.user?.email)) {
      const copyArr = _.cloneDeep(teams)
      const index = _.findIndex(copyArr, { id: teamDoc?.id })
      if (index !== -1) {
        copyArr[index] = {
          id: copyArr[index]?.id,
          type: type || copyArr[index]?.type,
          title: text || copyArr[index]?.title,
          color: color || copyArr[index]?.color,
          assigns: assigns || copyArr[index]?.assigns,
          creatorBy: [myInfo?.user?.email],
          createdAt: Date.now(),
        }
        const item = {
          id: copyArr[index]?.id,
          type: type || copyArr[index]?.type,
          title: text || copyArr[index]?.title,
          color: color || copyArr[index]?.color,
          assigns: assigns || copyArr[index]?.assigns,
          creatorBy: [myInfo?.user?.email],
          createdAt: Date.now(),
        }
        dispatch(teamsApi.endpoints.updateTeam.initiate(item)).unwrap()
        setTeams(copyArr)
        clearForm()
        editModal()
      }
    } else {
      setError('You can only perform Team Creator')
    }
  }
  return (
    <>
      {/* Component Start */}
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Header show={false} />
        <div className="px-10 mt-6 flex justify-between">
          <h1 className="text-2xl font-bold">Teams</h1>
          <button
            className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
            onClick={() => handleModal()}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
          {teams?.length > 0 &&
            teams.map((team, i) => (
              <Team
                key={i}
                team={team}
                setError={setError}
                color={color}
                type={type}
                text={text}
                setText={setText}
                setColor={setColor}
                setType={setType}
                myInfo={myInfo?.user}
                error={error}
                setAssigns={setAssigns}
                handleUpdateTeam={handleUpdateTeam}
                assignsUserInfo={assignsUserInfo}
                isDelete={isDelete}
                isEdit={isEdit}
                handleRemove={handleRemove}
                deleteModal={deleteModal}
                editModal={editModal}
              />
            ))}
        </div>
      </div>
      {/* Component End */}
      <a
        className="fixed bottom-0 right-0 flex items-center justify-center h-8 pl-1 pr-2 mb-6 mr-4 text-blue-100 bg-indigo-600 rounded-full shadow-lg hover:bg-blue-600"
        href="https://learnwithsumit.com"
        target="_top"
      >
        <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
          <img src="./images/logo.png" alt="LWS Logo" />
        </div>
        <span className="ml-1 text-sm leading-none">Learn with Sumit</span>
      </a>
      {isOpen && (
        <TeamModal
          isOpen={isOpen}
          handleModal={handleModal}
          handleCreateTeams={handleCreateTeams}
          text={text}
          setText={setText}
          type={type}
          setType={setType}
          assigns={assigns}
          handleDebounce={handleDebounce}
          color={color}
          setError={setError}
          error={error}
          setColor={setColor}
          setAssigns={setAssigns}
          assignsUserInfo={assignsUserInfo}
          handleRemoveAssign={handleRemoveAssign}
          myInfo={myInfo?.user}
        />
      )}
    </>
  )
}

export default Teams
