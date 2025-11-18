type Props = {
  subject: string;
  chapter: string;
};

const ContinueHistoryCard = (props: Props) => {
  const { subject, chapter } = props;

  return (
    <div className="flex flex-col w-full h-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 whitespace-nowrap hover:bg-zinc-800 transition-colors">
      <span className="text-xl font-heading font-medium text-white">{subject}</span>
      <span className="text-base text-gray-400">{chapter}</span>
    </div>
  );
};

export default ContinueHistoryCard;
