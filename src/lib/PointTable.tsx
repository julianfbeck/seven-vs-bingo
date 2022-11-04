import { Score } from "@prisma/client";

interface PointsProps {
  score: Score[];
}

const PointTable = ({ score }: PointsProps) => {
  const entryStyle = "border-b bg-gray-800 border-gray-700  cursor-pointer";
  return (
    <div className="px-4 mx-auto max-w-screen-lg lg:px-12">
      <div className="overflow-x-auto relative shadow-md rounded-lg">
        <table className="w-full text-sm text-left  text-gray-400">
          <thead className="text-xs  uppercase  bg-gradient-to-b from-green-800 to-green-700 text-gray-100">
            <tr>
              <th scope="col" className="p-4">
                Platz
              </th>
              <th scope="col" className="py-3 px-6">
                Benutzer
              </th>
              <th scope="col" className="py-3 px-6">
                Punkte
              </th>
            </tr>
          </thead>
          <tbody>
            {score.map((user, index) => (
              <tr key={user.id} className={entryStyle}>
                <th scope="row" className="py-4 px-6 font-medium text-white">
                  {index + 1}
                </th>
                <td className="py-4 px-6">{user.userName}</td>
                <td className="py-4 px-6">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PointTable;
