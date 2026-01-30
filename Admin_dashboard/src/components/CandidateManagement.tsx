import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';

export interface Candidate {
  id: string;
  name: string;
  position: string;
  votes?: number;
}

interface CandidateManagementProps {
  candidates: Candidate[];
  onAddCandidate: (candidate: Omit<Candidate, 'id'>) => void;
  onEditCandidate: (id: string, candidate: Omit<Candidate, 'id'>) => void;
  onDeleteCandidate: (id: string) => void;
}

export function CandidateManagement({
  candidates,
  onAddCandidate,
  onEditCandidate,
  onDeleteCandidate,
}: CandidateManagementProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && position) {
      if (editingId) {
        onEditCandidate(editingId, { name, position });
      } else {
        onAddCandidate({ name, position });
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setName('');
    setPosition('');
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (candidate: Candidate) => {
    setEditingId(candidate.id);
    setName(candidate.name);
    setPosition(candidate.position);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Candidate Management</CardTitle>
              <CardDescription>
                Add and manage candidates for elections
              </CardDescription>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 size-4" />
              Add Candidate
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {candidates.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No candidates added yet. Click "Add Candidate" to get started.
            </p>
          ) : (
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell className="font-medium">{candidate.name}</TableCell>
                      <TableCell>{candidate.position}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(candidate)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDeleteCandidate(candidate.id)}
                          >
                            <Trash2 className="size-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? 'Edit Candidate' : 'Add New Candidate'}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? 'Update the candidate information below.'
                : 'Enter the candidate details below.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="candidate-name">Candidate Name</Label>
                <Input
                  id="candidate-name"
                  placeholder="e.g., John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  placeholder="e.g., President"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit">
                {editingId ? 'Update Candidate' : 'Add Candidate'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
