import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeamModal, setCardModal } from "../../features/modal/modalSlice";
import {
  teamsApi,
  useAddTeamToUserMutation,
  useAddUserMutation
} from "../../features/teams/teamsApi";
import debounce from "../../utils/debounce";

export default function AddUserModal() {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const { team } = useSelector((state) => state.team);
  const [addUser] = useAddUserMutation();
  const [addTeamToUser] = useAddTeamToUserMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTeamModal(false));
  }, [dispatch]);

  const handleCheck = debounce((e) => setEmail(e.target.value));

  useEffect(() => {
    (async () => {
      if (email) {
        const response = await dispatch(
          teamsApi.endpoints.checkUserExist.initiate(email)
        );

        const data = response?.data?.filter(
          (user) => team?.users?.includes(user?.id) === false
        );

        setUsers(data);
      }
    })();
  }, [email, dispatch, team]);

  const control = (e) => {
    dispatch(setCardModal());
  };

  return (
    <>
      <div
        onClick={control}
        className="fixed w-full h-full inset-0 z-10 bg-black/10 cursor-pointer"
      ></div>
      <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <input
          className="ring outline-none w-full rounded px-2 py-1"
          type="text"
          onChange={handleCheck}
        />

        <div className="h-10 overflow-y-scroll" hidden={users.length === 0}>
          {users?.length > 0 &&
            users.map((user) => (
              <p
                key={user?.id}
                className="text-sm border-b p-2"
                onClick={(e) => {
                  addUser({
                    teamId: team?.id,
                    users: [...team?.users, user?.id],
                  });
                  addTeamToUser({
                    userId: user?.id,
                    teams: [...user?.teams, team?.id],
                  });
                  dispatch(setCardModal());
                }}
              >
                {user?.email}
              </p>
            ))}
        </div>
      </div>
    </>
  );
}
