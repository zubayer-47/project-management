import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCardModal } from "../features/modal/modalSlice";
import { teamsApi, useAddTeamToUserMutation, useAddUserMutation } from "../features/teams/teamsApi";
import debounce from "../utils/debounce";

export default function AddUserModal() {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const { team } = useSelector((state) => state.team);
  const [addUser] = useAddUserMutation();
  const [addTeamToUser] = useAddTeamToUserMutation();

  const dispatch = useDispatch();

  const handleCheck = debounce((e) => setEmail(e.target.value));

  useEffect(() => {
    (async () => {
      if (email) {
        const response = await dispatch(
          teamsApi.endpoints.checkUserExist.initiate(email)
        );
        setUsers(response?.data);
        console.log(response);
      }
    })();
  }, [email, dispatch]);

  const control = (e) => {
    console.log("control");
  };

  return (
    <div
      onClick={control}
      className="fixed w-full h-full inset-0 z-10 bg-black/10 cursor-pointer"
    >
      <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <input
          className="ring outline-none w-full rounded px-2 py-1"
          type="text"
          onChange={handleCheck}
        />

        <div className="h-10 overflow-y-scroll" hidden={!users?.length}>
          {users?.length > 0 &&
            users.map(
              (user) =>
                team?.users?.includes(user?.id) === false && (
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
                        teams: [...user?.teams, team?.id]
                      })
                      dispatch(setCardModal());
                    }}
                  >
                    {user?.email}
                  </p>
                )
            )}
        </div>
      </div>
    </div>
  );
}
