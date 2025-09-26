type Props = {
  subject: string;
  chapter: string;
};

const ContinueHistoryCard = (props: Props) => {
  const { subject, chapter } = props;

  return (
    <div className="flex flex-col w-full h-full bg-[#f6f6f6] rounded-lg p-4 whitespace-nowrap">
      <span className="text-xl font-afacad font-medium">{subject}</span>
      <span className="text-base font-afacad">{chapter}</span>
    </div>
  );
};

export default ContinueHistoryCard;
