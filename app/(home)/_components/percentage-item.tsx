import { ReactNode } from "react";

interface PercentageItemProps {
  icone: ReactNode;
  title: string;
  value: number;
}

const PercentageItem = ({ icone, title, value }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      {/* Icone */}
      <div className="flex items-center gap-2">
        {icone}
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="text-sm font-bold">{value ? value : 0}%</p>
    </div>
  );
};

export default PercentageItem;
