import { Card } from "./ui/card";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

interface Candidate {
  id: string;
  name: string;
  photo?: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  selectionType: "single" | "multiple";
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function CandidateCard({ 
  candidate, 
  selectionType, 
  isSelected,
  onSelect 
}: CandidateCardProps) {
  return (
    <Card 
      className={`p-4 md:p-5 transition-all cursor-pointer hover:shadow-md active:scale-[0.98] ${
        isSelected ? 'ring-2 ring-primary bg-blue-50/50' : ''
      }`}
      onClick={() => onSelect(candidate.id)}
    >
      <div className="flex items-center gap-3 md:gap-4">
        {/* Candidate Photo/Avatar */}
        <div className="flex-shrink-0">
          {candidate.photo ? (
            <img 
              src={candidate.photo} 
              alt={candidate.name}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-lg md:text-xl font-medium">
                {candidate.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Candidate Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground">
            {candidate.name}
          </h3>
        </div>

        {/* Selection Control */}
        <div className="flex-shrink-0 ml-2">
          {selectionType === "single" ? (
            <RadioGroupItem 
              value={candidate.id} 
              id={candidate.id}
              onClick={(e) => e.stopPropagation()}
              className="w-5 h-5 md:w-4 md:h-4"
            />
          ) : (
            <Checkbox 
              checked={isSelected}
              onCheckedChange={() => onSelect(candidate.id)}
              onClick={(e) => e.stopPropagation()}
              className="w-5 h-5 md:w-4 md:h-4"
            />
          )}
        </div>
      </div>
    </Card>
  );
}