import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeamModal, setCardModal } from "../../features/modal/modalSlice";
import {
    useGetMembersByIdQuery,
    useGetProjectQuery,
    useGetUserByEmailQuery
} from "../../features/projects/projectsApi";
import debounce from "../../utils/debounce";

export default function AddUserToProjectModal() {
  const [email, setEmail] = useState("");
  const [skip, setSkip] = useState(true);
  const { project } = useSelector((state) => state.project);

  const { data, isLoading, isSuccess } = useGetProjectQuery(project?.id);
  const {
    data: assigns,
    isLoading: memberIsLoading,
    isSuccess: memberIsSuccess,
  } = useGetMembersByIdQuery(data?.members || []);
  const {
    data: users,
    isLoading: usersIsLoading,
    isSuccess: usersIsSuccess,
  } = useGetUserByEmailQuery(email, { skip });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addTeamModal(false));
  }, [dispatch]);

  const handleCheck = debounce((e) => {
    setEmail(e.target.value);
  });

  //   useEffect(() => {
  //     if (!isLoading && isSuccess) {
  //       (async () => {
  //         try {
  //           const response = await dispatch(
  //             projectApi.endpoints.getMembersById.initiate(data.members)
  //           );

  //           setAssigns(response.data);
  //         } catch (error) {}
  //       })();
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [isSuccess]);

  useEffect(() => {
    if (email?.length > 0) {
      setSkip((prev) => !prev);
    }
  }, [email]);

  const control = (e) => {
    dispatch(setCardModal());
  };

  let assignMembersContent = null;

  if (memberIsLoading || isLoading) {
    assignMembersContent = <p>Loading...</p>;
  } else if (memberIsSuccess && assigns?.length === 0) {
    assignMembersContent = <p>Member Not Assign Yet.</p>;
  } else if (memberIsSuccess && assigns?.length > 0) {
    assignMembersContent = assigns.map((member) => (
      <p className="px-2 py-1 border my-2" key={member.id}>
        {member?.email}
      </p>
    ));
  }

  let userContent = null;

  if (usersIsLoading) {
    userContent = <p>Loading...</p>;
  } else if (usersIsSuccess && users?.length === 0) {
    userContent = <p>User Not Matched</p>;
  } else if (usersIsSuccess && users?.length > 0) {
    userContent = (
      <div className="h-20 overflow-auto inline">
        {users.map((user) => {
          if (!data?.members?.includes(user.id)) {
            return (
              <p
                key={user?.id}
                className="text-sm border-b p-2"
                onClick={(e) => {
                  //   addUser({
                  //     teamId: project?.id,
                  //     users: [...project?.users, user?.id],
                  //   });
                  //   addTeamToUser({
                  //     userId: user?.id,
                  //     teams: [...user?.teams, project?.id],
                  //   });
                  //   dispatch(setCardModal());
                }}
              >
                {user?.email}
              </p>
            );
          }
        })}
      </div>
    );
  }

  return (
    <>
      <div
        onClick={control}
        className="fixed w-full h-full inset-0 z-10 bg-black/10 cursor-pointer"
      ></div>
      <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <input
          className="focus:ring ring-purple-400 border-2 border-purple-100 outline-none w-full rounded px-2 py-1 mb-2"
          type="text"
          placeholder="test@gmail.com"
          onChange={handleCheck}
        />

        {userContent}

        <div className="inline">
          <p className="text-lg border-b-2 w-20 border-purple-400">Members</p>
          <div className="h-28 overflow-auto">{assignMembersContent}</div>
        </div>
      </div>
    </>
  );
}
