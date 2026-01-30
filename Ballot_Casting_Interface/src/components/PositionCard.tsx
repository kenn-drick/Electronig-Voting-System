import { Card } from "./ui/card";
import { CheckCircle2, ChevronRight, Circle } from "lucide-react";

interface PositionCardProps {
  title: string;
  description?: string;
  isCompleted: boolean;
  onClick: () => void;
}

export function PositionCard({ 
  title, 
  description, 
  isCompleted,
  onClick 
}: PositionCardProps) {
  return (
    <Card 
      className="p-4 md:p-5 transition-all cursor-pointer hover:shadow-md hover:border-blue-300 active:scale-[0.98]"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {/* Status Icon */}
        <div className="flex-shrink-0">
          {isCompleted ? (
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            </div>
          ) : (
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 flex items-center justify-center border-2 border-blue-200">
              <Circle className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
            </div>
          )}
        </div>

        {/* Position Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {description}
            </p>
          )}
          {isCompleted && (
            <p className="text-xs text-green-600 mt-1">
              Vote recorded
            </p>
          )}
        </div>

        {/* Arrow Icon */}
        <div className="flex-shrink-0">
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
}
