import { useState } from "react";
import { PositionCard } from "./components/PositionCard";
import { CandidateCard } from "./components/CandidateCard";
import { Button } from "./components/ui/button";
import { RadioGroup } from "./components/ui/radio-group";
import { CheckCircle2, ChevronLeft } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  photo?: string;
}

interface Position {
  id: string;
  title: string;
  description: string;
  selectionType: "single" | "multiple";
  maxSelections?: number;
  candidates: Candidate[];
}

// Mock election data
const positions: Position[] = [
  {
    id: "president",
    title: "President",
    description: "Select one candidate",
    selectionType: "single",
    candidates: [
      { id: "p1", name: "Sarah Johnson" },
      { id: "p2", name: "Michael Chen" },
      { id: "p3", name: "Emma Rodriguez" },
    ],
  },
  {
    id: "secretary",
    title: "Secretary",
    description: "Select one candidate",
    selectionType: "single",
    candidates: [
      { id: "s1", name: "David Kim" },
      { id: "s2", name: "Olivia Patel" },
      { id: "s3", name: "James Wilson" },
    ],
  },
  {
    id: "treasurer",
    title: "Treasurer",
    description: "Select one candidate",
    selectionType: "single",
    candidates: [
      { id: "t1", name: "Sophia Martinez" },
      { id: "t2", name: "Liam Anderson" },
      { id: "t3", name: "Ava Thompson" },
    ],
  },
];

type ViewState = "positions" | "voting" | "review" | "confirmed";

export default function App() {
  const [viewState, setViewState] = useState<ViewState>("positions");
  const [currentPositionId, setCurrentPositionId] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  const currentPosition = positions.find(p => p.id === currentPositionId);
  const currentSelections = currentPositionId ? (selections[currentPositionId] || []) : [];

  const handlePositionClick = (positionId: string) => {
    setCurrentPositionId(positionId);
    setViewState("voting");
  };

  const handleCandidateSelect = (candidateId: string) => {
    if (!currentPositionId || !currentPosition) return;

    if (currentPosition.selectionType === "single") {
      setSelections(prev => ({
        ...prev,
        [currentPositionId]: [candidateId],
      }));
    } else {
      setSelections(prev => {
        const current = prev[currentPositionId] || [];
        const newSelections = current.includes(candidateId)
          ? current.filter(id => id !== candidateId)
          : [...current, candidateId];
        
        return {
          ...prev,
          [currentPositionId]: newSelections,
        };
      });
    }
  };

  const handleNext = () => {
    const currentIndex = positions.findIndex(p => p.id === currentPositionId);
    if (currentIndex < positions.length - 1) {
      setCurrentPositionId(positions[currentIndex + 1].id);
    } else {
      setViewState("review");
    }
  };

  const handleBack = () => {
    if (viewState === "voting") {
      const currentIndex = positions.findIndex(p => p.id === currentPositionId);
      if (currentIndex > 0) {
        setCurrentPositionId(positions[currentIndex - 1].id);
      } else {
        setViewState("positions");
      }
    } else if (viewState === "review") {
      setCurrentPositionId(positions[positions.length - 1].id);
      setViewState("voting");
    }
  };

  const handleSubmit = () => {
    setViewState("confirmed");
  };

  const handleReturnToDashboard = () => {
    setViewState("positions");
    setSelections({});
    setCurrentPositionId(null);
  };

  const isPositionCompleted = (positionId: string) => {
    return (selections[positionId] || []).length > 0;
  };

  const allPositionsCompleted = positions.every(p => isPositionCompleted(p.id));

  // Confirmation Screen
  if (viewState === "confirmed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>
          
          <h2 className="mb-3">Vote Successfully Cast</h2>
          <p className="text-muted-foreground mb-8">
            Your vote has been successfully recorded. Thank you for participating in the election.
          </p>

          <div className="space-y-3">
            <Button 
              onClick={handleReturnToDashboard}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Return to Dashboard
            </Button>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Review Screen
  if (viewState === "review") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-8">
        {/* Header */}
        <div className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-base">UV</span>
              </div>
              <div>
                <h1 className="text-blue-900">Review Your Selections</h1>
                <p className="text-xs md:text-sm text-muted-foreground">Verify your choices before submitting</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
            <h2 className="mb-5 text-foreground">Your Selections</h2>
            
            <div className="space-y-6">
              {positions.map(position => {
                const selectedIds = selections[position.id] || [];
                const selectedCandidates = position.candidates.filter(c => 
                  selectedIds.includes(c.id)
                );

                return (
                  <div key={position.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-foreground">{position.title}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCurrentPositionId(position.id);
                          setViewState("voting");
                        }}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        Edit
                      </Button>
                    </div>
                    
                    {selectedCandidates.length > 0 ? (
                      <div className="space-y-2">
                        {selectedCandidates.map(candidate => (
                          <div key={candidate.id} className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
                                {candidate.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-foreground">{candidate.name}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No selection made</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!allPositionsCompleted}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Submit Vote
            </Button>
          </div>

          {!allPositionsCompleted && (
            <p className="text-center text-sm text-amber-600 mt-4">
              Please complete all positions before submitting
            </p>
          )}
        </div>
      </div>
    );
  }

  // Voting Screen (Individual Position)
  if (viewState === "voting" && currentPosition) {
    const currentIndex = positions.findIndex(p => p.id === currentPositionId);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-8">
        {/* Header */}
        <div className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-base">UV</span>
              </div>
              <div className="flex-1">
                <h1 className="text-blue-900">{currentPosition.title}</h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Position {currentIndex + 1} of {positions.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm md:text-base text-blue-900">
              Select your candidate for this position.
            </p>
          </div>

          {/* Ballot Section */}
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
            {currentPosition.selectionType === "single" ? (
              <RadioGroup 
                value={currentSelections[0] || ""} 
                onValueChange={(value) => handleCandidateSelect(value)}
                className="space-y-3"
              >
                {currentPosition.candidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    selectionType="single"
                    isSelected={currentSelections.includes(candidate.id)}
                    onSelect={handleCandidateSelect}
                  />
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-3">
                {currentPosition.candidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    selectionType="multiple"
                    isSelected={currentSelections.includes(candidate.id)}
                    onSelect={handleCandidateSelect}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentSelections.length === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {currentIndex < positions.length - 1 ? "Next Position" : "Review Selections"}
            </Button>
          </div>

          {currentSelections.length > 0 && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              {currentSelections.length} candidate{currentSelections.length > 1 ? "s" : ""} selected
            </p>
          )}
        </div>
      </div>
    );
  }

  // Position List Screen (Landing)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-8">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base">UV</span>
            </div>
            <div>
              <h1 className="text-blue-900">University Voting System</h1>
              <p className="text-xs md:text-sm text-muted-foreground">Student Government Election 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm md:text-base text-blue-900">
            Select a position below to cast your vote. You must vote for all positions.
          </p>
        </div>

        {/* Position List */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
          <h2 className="mb-5 text-foreground">Positions to Vote</h2>
          
          <div className="space-y-3">
            {positions.map((position) => (
              <PositionCard
                key={position.id}
                title={position.title}
                description={position.description}
                isCompleted={isPositionCompleted(position.id)}
                onClick={() => handlePositionClick(position.id)}
              />
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {Object.keys(selections).length} of {positions.length} positions completed
          </p>
          {allPositionsCompleted && (
            <Button
              onClick={() => setViewState("review")}
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Proceed to Review
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
