import { Projection } from "@prisma/client";
import { indexToPoints } from "../utils/constants";

interface PointsProps {
  projections: Projection[];
  numberSelectedProjections: number;
  selectedProjections: Map<string, boolean>;
  disabled: boolean;
  onProjectionClick: (projection: Projection) => void;
}

const Table = ({
  projections,
  selectedProjections,
  numberSelectedProjections,
  disabled,
  onProjectionClick,
}: PointsProps) => {
  const entryStyle = "border-b bg-gray-800 border-gray-700  cursor-pointer";
  const entryStyleSelected =
    "border-b bg-green-800 border-green-900   cursor-pointer ";

  return (
    <div className="px-4 mx-auto max-w-screen-lg lg:px-12">
      <div className="overflow-x-auto relative shadow-md rounded-lg">
        <table className="w-full text-sm text-left  text-gray-400">
          <thead className="text-xs  uppercase  bg-gradient-to-b from-green-800 to-green-700 text-gray-100">
            <tr>
              {/* <th scope="col" className="p-4">
                <div className="flex items-center">
                  {numberSelectedProjections}/25
                </div>
              </th> */}
              <th scope="col" className="py-3 px-6">
                <div className="flex items-center">
                  {numberSelectedProjections}/25
                </div>
                Ereignis
              </th>
              <th scope="col" className="py-3 px-6">
                Punkte
              </th>
            </tr>
          </thead>
          <tbody>
            {projections
              .sort(
                (a, b) =>
                  Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
              )
              .map((projection) => (
                <tr
                  key={projection.id}
                  className={
                    selectedProjections.get(projection.id)
                      ? entryStyleSelected
                      : entryStyle
                  }
                  onClick={() => onProjectionClick(projection)}
                >
                  {/* <td className="p-4 w-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        checked={selectedProjections.get(projection.id)}
                        onClick={() => onProjectionClick(projection)}
                        disabled={disabled}
                      />
                    </div>
                  </td> */}
                  <th scope="row" className="py-4 px-6 font-medium text-white">
                    {projection.text}
                  </th>
                  <td className="py-4 px-6">
                    {indexToPoints(projection.difficulty)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
