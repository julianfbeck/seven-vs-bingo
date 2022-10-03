import { Projection } from "@prisma/client";

interface ProjectionListProps {
  projections: Projection[];

}

export const ProjectionList = ({projections}:ProjectionListProps) => {
  return (
    <div className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-10 lg:px-12">
        <h1 className="mt-9 text-2xl font-extrabold tracking-tight leading-none md:text-3xl lg:text-3xl text-white">
          Aktuelle Bingo Karten
        </h1>
      </div>
        {projections.map((entry) => (
          <div
            key={entry.id}
            className="p-6 max-w-md  rounded-lg border  shadow-md bg-gray-800 border-gray-700 mb-4 "
          >
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">
                {entry.text}
              </h5>
            </div>
            <p className="mb-3 font-normal  text-gray-400">
              {entry.description}
            </p>
          </div>
        ))}
    </div>
  );
};
