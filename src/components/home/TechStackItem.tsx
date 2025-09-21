interface TechStackItemProps {
  name: string;
  shortName: string;
  bgColor: string;
  textColor?: string;
}

export function TechStackItem({
  name,
  shortName,
  bgColor,
  textColor = "text-white",
}: TechStackItemProps) {
  return (
    <div className="text-center">
      <div
        className={`mb-2 flex h-16 w-16 items-center justify-center rounded-lg ${bgColor}`}
      >
        <span className={`text-sm font-bold ${textColor}`}>{shortName}</span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{name}</p>
    </div>
  );
}
