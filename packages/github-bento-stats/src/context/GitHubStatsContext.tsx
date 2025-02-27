import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { fetchUserStats } from '../utils/fetchUser';
import { fetchUserGraph } from '../utils/fetchGraph';

export interface UserStats {
  Followers: number;
  Repositories: number;
  'Pull Requests': number;
  Issues: number;
  Commits: number;
  'Contributed To': number;
  'Star Earned': number;
  'Total Contributions': number;
  'Total Contibutions'?: number;
  'Longest Streak': number;
  'Longest Streak Start': string | null;
  'Longest Streak End': string | null;
  'Current Streak': number;
  'Current Streak Start': string | null;
  'Current Streak End': string | null;
  AvatarUrl: string;
  Failure?: any;
}

interface GitHubStatsContextType {
  stats: UserStats | null;
  graph: string | null;
  loading: boolean;
  error: string | null;
  username: string;
  setUsername: (username: string) => void;
  refetch: () => Promise<void>;
}

const GitHubStatsContext = createContext<GitHubStatsContextType | undefined>(undefined);

interface GitHubBentoProviderProps {
  children: ReactNode;
  username?: string;
  githubToken?: string;
}

export const GitHubBentoProvider = ({
  children,
  username: initialUsername = 'idityaGE',
  githubToken,
}: GitHubBentoProviderProps) => {
  const [username, setUsername] = useState(initialUsername);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [graph, setGraph] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Setup token if provided
  useEffect(() => {
    if (githubToken) {
      window.__GITHUB_BENTO_TOKEN__ = githubToken;
    }
  }, [githubToken]);

  const fetchData = async (username: string) => {
    if (!username) {
      setError("username is not provided")
    }

    setLoading(true);
    setError(null);

    try {
      const [statsResult, graphResult] = await Promise.all([
        fetchUserStats(username),
        fetchUserGraph(username)
      ]);

      setStats(statsResult.userStats);
      setGraph(graphResult.graph);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchData(username);
    }
  }, [username]);

  const refetch = async () => {
    if (username) {
      await fetchData(username);
    }
  };

  return (
    <GitHubStatsContext.Provider value={{
      stats,
      graph,
      loading,
      error,
      username,
      setUsername,
      refetch
    }}>
      {children}
    </GitHubStatsContext.Provider>
  );
};

export const useGitHubStatsContext = () => {
  const context = useContext(GitHubStatsContext);
  if (context === undefined) {
    throw new Error('useGitHubStatsContext must be used within a GitHubBentoProvider');
  }
  return context;
};