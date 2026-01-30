import { Trophy, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import type { Candidate } from './CandidateManagement';

interface ResultsViewProps {
  candidates: Candidate[];
  hasActiveElection: boolean;
  electionTitle?: string;
}

export function ResultsView({ candidates, hasActiveElection, electionTitle }: ResultsViewProps) {
  if (hasActiveElection) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Election Results</CardTitle>
            <CardDescription>Results are hidden while election is active</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <TrendingUp className="size-4" />
              <AlertDescription>
                Results will be available after the election is closed. Close the active election
                from the "Manage Elections" page to view results.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Election Results</CardTitle>
            <CardDescription>No results available</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 py-8">
              No candidates have been added yet. Add candidates to view results.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalVotes = candidates.reduce((sum, candidate) => sum + (candidate.votes || 0), 0);
  const sortedCandidates = [...candidates].sort((a, b) => (b.votes || 0) - (a.votes || 0));
  const winner = sortedCandidates[0];

  return (
    <div className="space-y-6">
      {electionTitle && (
        <div className="rounded-lg border bg-white p-4">
          <h3 className="font-semibold text-gray-900">{electionTitle}</h3>
          <p className="text-sm text-gray-600">Total Votes Cast: {totalVotes}</p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Results Summary</CardTitle>
          <CardDescription>Vote distribution across all candidates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {sortedCandidates.map((candidate, index) => {
            const votes = candidate.votes || 0;
            const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
            const isWinner = index === 0 && votes > 0;

            return (
              <div key={candidate.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isWinner && <Trophy className="size-5 text-yellow-500" />}
                    <div>
                      <p className="font-semibold">{candidate.name}</p>
                      <p className="text-sm text-gray-600">{candidate.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{votes} votes</p>
                    <p className="text-sm text-gray-600">{percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <Progress value={percentage} className="h-3" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {winner && winner.votes && winner.votes > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-yellow-100">
                <Trophy className="size-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-800">Election Winner</p>
                <p className="text-lg font-semibold text-yellow-900">
                  {winner.name} - {winner.position}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
