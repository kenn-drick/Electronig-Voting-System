import { CheckCircle2, Users, Vote, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface DashboardOverviewProps {
  totalElections: number;
  activeElections: number;
  totalCandidates: number;
  totalVotes: number;
}

export function DashboardOverview({
  totalElections,
  activeElections,
  totalCandidates,
  totalVotes,
}: DashboardOverviewProps) {
  const stats = [
    {
      title: 'Total Elections',
      value: totalElections,
      description: `${activeElections} active`,
      icon: Vote,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Total Candidates',
      value: totalCandidates,
      description: 'Registered candidates',
      icon: Users,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Total Votes',
      value: totalVotes,
      description: 'Votes cast',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'System Status',
      value: 'Active',
      description: 'All systems operational',
      icon: CheckCircle2,
      color: 'bg-emerald-100 text-emerald-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">
          Monitor your electronic voting system at a glance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`flex size-10 items-center justify-center rounded-lg ${stat.color}`}>
                  <Icon className="size-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button className="flex items-start gap-3 rounded-lg border bg-white p-4 text-left transition-colors hover:bg-gray-50">
              <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100">
                <Vote className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Create Election</p>
                <p className="text-sm text-gray-600">Set up a new election</p>
              </div>
            </button>
            <button className="flex items-start gap-3 rounded-lg border bg-white p-4 text-left transition-colors hover:bg-gray-50">
              <div className="flex size-10 items-center justify-center rounded-lg bg-green-100">
                <Users className="size-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Add Candidate</p>
                <p className="text-sm text-gray-600">Register new candidate</p>
              </div>
            </button>
            <button className="flex items-start gap-3 rounded-lg border bg-white p-4 text-left transition-colors hover:bg-gray-50">
              <div className="flex size-10 items-center justify-center rounded-lg bg-purple-100">
                <TrendingUp className="size-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">View Results</p>
                <p className="text-sm text-gray-600">Check election results</p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
