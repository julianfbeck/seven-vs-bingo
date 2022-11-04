import { Feedback } from "@prisma/client";

interface AdminProposalProps {
  feedback: Feedback;
  onHasBeenDeleted: () => void;
}

export const FeedbackEntry: React.FC<AdminProposalProps> = ({
  feedback,
  onHasBeenDeleted,
}) => {
  return (
    <div
      key={feedback.id}
      className={
        "p-6 max-w-md  rounded-lg border  shadow-md bg-gray-800 border-gray-700 mb-4"
      }
    >
      <div>
        <h5 className="mb-2 text-xl font-bold tracking-tight  text-white">
          {feedback.text}
        </h5>
      </div>
      <button
        className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 mr-3 disabled:bg-red-900 disabled:opacity-50"
        onClick={() => onHasBeenDeleted()}
      >
        Löschen
      </button>
    </div>
  );
};
