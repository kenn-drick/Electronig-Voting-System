import { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardOverview } from './components/DashboardOverview';
import { ElectionManagement } from './components/ElectionManagement';
import { CandidateManagement, type Candidate } from './components/CandidateManagement';
import { ResultsView } from './components/ResultsView';

interface Election {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'closed';
}

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [elections, setElections] = useState<Election[]>([
    {
      id: '1',
      title: 'Student Council Elections 2026',
      startDate: '2026-02-01',
      endDate: '2026-02-15',
      status: 'closed',
    },
  ]);
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: '1', name: 'Sarah Johnson', position: 'President', votes: 245 },
    { id: '2', name: 'Michael Chen', position: 'President', votes: 189 },
    { id: '3', name: 'Emily Rodriguez', position: 'Vice President', votes: 312 },
    { id: '4', name: 'David Williams', position: 'Vice President', votes: 198 },
  ]);

  const handleLogout = () => {
    alert('Logging out...');
  };

  const handleAddElection = (election: Omit<Election, 'id'>) => {
    const newElection = {
      ...election,
      id: Date.now().toString(),
    };
    setElections([...elections, newElection]);
  };

  const handleToggleElectionStatus = (id: string) => {
    setElections(
      elections.map((election) =>
        election.id === id
          ? {
              ...election,
              status: election.status === 'active' ? 'closed' : 'active',
            }
          : election
      )
    );
  };

  const handleAddCandidate = (candidate: Omit<Candidate, 'id'>) => {
    const newCandidate = {
      ...candidate,
      id: Date.now().toString(),
      votes: Math.floor(Math.random() * 300), // Mock votes for demonstration
    };
    setCandidates([...candidates, newCandidate]);
  };

  const handleEditCandidate = (id: string, updatedCandidate: Omit<Candidate, 'id'>) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === id
          ? { ...candidate, ...updatedCandidate }
          : candidate
      )
    );
  };

  const handleDeleteCandidate = (id: string) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== id));
  };

  const activeElection = elections.find((e) => e.status === 'active');
  const totalVotes = candidates.reduce((sum, candidate) => sum + (candidate.votes || 0), 0);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <DashboardOverview
            totalElections={elections.length}
            activeElections={elections.filter((e) => e.status === 'active').length}
            totalCandidates={candidates.length}
            totalVotes={totalVotes}
          />
        );
      case 'elections':
        return (
          <ElectionManagement
            elections={elections}
            onAddElection={handleAddElection}
            onToggleStatus={handleToggleElectionStatus}
          />
        );
      case 'candidates':
        return (
          <CandidateManagement
            candidates={candidates}
            onAddCandidate={handleAddCandidate}
            onEditCandidate={handleEditCandidate}
            onDeleteCandidate={handleDeleteCandidate}
          />
        );
      case 'results':
        return (
          <ResultsView
            candidates={candidates}
            hasActiveElection={!!activeElection}
            electionTitle={elections[0]?.title}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <Header adminName="Dr. James Wilson" onLogout={handleLogout} />
      <div className="flex flex-1 overflow-hidden">
        <Navigation activeView={activeView} onNavigate={setActiveView} />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-7xl">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
