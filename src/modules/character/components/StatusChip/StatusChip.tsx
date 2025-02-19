type Props = {
  status: string;
};

export const StatusChip = ({ status }: Props) => {
  return (
    <div>
      <h2 className="text-sm flex items-center font-semibold">
        <span
          className={`inline-block w-2 h-2 mr-2 rounded-full ${
            status.toLowerCase() === "alive"
              ? "bg-green-500"
              : status.toLowerCase() === "dead"
                ? "bg-red-500"
                : "bg-gray-500"
          }`}
        ></span>
        {status}
      </h2>
    </div>
  );
};
