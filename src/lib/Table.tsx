import { Projection } from "@prisma/client";
import { Constants } from "../utils/points";

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
  return (
    <div className=" px-4 mx-auto max-w-screen-lg lg:px-12">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left  text-gray-400">
          <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  {numberSelectedProjections}/25
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                Ereignis
              </th>
              <th scope="col" className="py-3 px-6">
                Beschreibung
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
                  className="border-b bg-gray-800 border-gray-700  hover:bg-gray-600 cursor-pointer"
                  onClick={() => onProjectionClick(projection)}
                >
                  <td className="p-4 w-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600  rounded  focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                        checked={selectedProjections.get(projection.id)}
                        onClick={() => onProjectionClick(projection)}
                        disabled={disabled}
                      />
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium  whitespace-nowrap text-white"
                  >
                    {projection.text}
                  </th>
                  <td className="py-4 px-6">{projection.description}</td>
                  <td className="py-4 px-6">
                    {Constants.PointsPerCorrectEntry}
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
