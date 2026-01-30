import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface Election {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'closed';
}

interface ElectionManagementProps {
  elections: Election[];
  onAddElection: (election: Omit<Election, 'id'>) => void;
  onToggleStatus: (id: string) => void;
}

export function ElectionManagement({ elections, onAddElection, onToggleStatus }: ElectionManagementProps) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && startDate && endDate) {
      onAddElection({
        title,
        startDate,
        endDate,
        status: 'closed',
      });
      setTitle('');
      setStartDate('');
      setEndDate('');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Election</CardTitle>
          <CardDescription>
            Set up a new election with title and date range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="election-title">Election Title</Label>
              <Input
                id="election-title"
                placeholder="e.g., Student Council Elections 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              <Plus className="mr-2 size-4" />
              Create Election
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Elections</CardTitle>
          <CardDescription>
            Manage election status and configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {elections.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No elections created yet. Create your first election above.
            </p>
          ) : (
            <div className="space-y-4">
              {elections.map((election) => (
                <div
                  key={election.id}
                  className="flex items-center justify-between rounded-lg border bg-white p-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{election.title}</h4>
                      <Badge
                        variant={election.status === 'active' ? 'default' : 'secondary'}
                      >
                        {election.status === 'active' ? 'Active' : 'Closed'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(election.startDate).toLocaleDateString()} -{' '}
                      {new Date(election.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant={election.status === 'active' ? 'destructive' : 'default'}
                    onClick={() => onToggleStatus(election.id)}
                  >
                    {election.status === 'active' ? 'Close Election' : 'Activate Election'}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
