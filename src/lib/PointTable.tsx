import { Score } from "@prisma/client";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

interface PointsProps {
  score: Score[];
}

const PointTable = ({ score }: PointsProps) => {
  const { data: session } = useSession();
  const entryStyle = "border-b bg-gray-800 border-gray-700  cursor-pointer";
  const getUserId = trpc.useMutation("auth.pointsOpen");
  return (
    <div className="px-2 mx-auto max-w-screen-lg lg:px-12">
      {/* show current position of user */}
      {session?.user && (
        <div className="text-center text-gray-200 my-3">
          Du bist aktuell auf Platz <br />
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-500 to-lime-500 text-3xl first-letter:">
            #{score.findIndex((user) => user.userId == session?.user?.id) + 1}
          </span>
        </div>
      )}
      <div className="overflow-hidden relative shadow-md rounded-lg">
        <table className="table-auto w-full text-sm text-left  text-gray-400">
          <thead className="text-xs  uppercase  bg-gradient-to-b from-green-800 to-green-700 text-gray-100">
            <tr>
              <th scope="col" className="p-4">
                Platz
              </th>
              <th scope="col" className="py-3 px-6">
                Benutzer (klick für Board)
              </th>
              <th scope="col" className="px-6 text-right">
                Punkte
              </th>
            </tr>
          </thead>
          <tbody>
            {score.map((user, index) => (
              <tr
                key={user.id}
                className={entryStyle}
                onClick={async () => {
                  const bordId = await getUserId.mutateAsync({
                    userId: user.userId,
                  });
                  window.location.assign(`/board/${bordId}`);
                }}
              >
                <th scope="row" className="py-4 px-6 font-medium text-white">
                  {index + 1}
                </th>
                <td
                  className={
                    session?.user?.id == user.userId
                      ? "py-3 px-6 font-bold text-green-700"
                      : "py-3 px-6 max-w-0 w-full whitespace-nowrap overflow-hidden overflow-ellipsis"
                  }
                >
                  {user.userName}
                </td>
                <td className="px-6 text-right">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PointTable;
