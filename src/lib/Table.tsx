import { Projection } from "@prisma/client";
import { Constants } from "../utils/points";

interface PointsProps {
  projections: Projection[];
  selectedProjections: Map<string, boolean>;
  onProjectionClick: (projection: Projection) => void;
}

const Table = ({ projections, selectedProjections, onProjectionClick}: PointsProps) => {
  return (
    <>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center"></div>
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
            {projections.map((projection) => (
              <tr
                key={projection.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => onProjectionClick(projection)}
              >
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={selectedProjections.get(projection.id)}
                      onClick={() => onProjectionClick(projection)}
                    />
                  </div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {projection.text}
                </th>
                <td className="py-4 px-6">{projection.description}</td>
                <td className="py-4 px-6">{Constants.PointsPerCorrectEntry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
