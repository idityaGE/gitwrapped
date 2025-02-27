import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { fetchUserStats } from '../utils/fetchUser';
import { fetchUserGraph } from '../utils/fetchGraph';

// Re-export the UserStats interface
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
  cacheTime?: number; // Time in milliseconds for cache validity
}

export const GitHubBentoProvider = ({
  children,
  username: initialUsername = 'idityaGE',
  githubToken,
  cacheTime = 3600000 // Default cache time: 1 hour
}: GitHubBentoProviderProps) => {
  const [username, setUsername] = useState(initialUsername);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [graph, setGraph] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Record<string, number>>({});

  // Setup token if provided
  useEffect(() => {
    if (githubToken) {
      window.__GITHUB_BENTO_TOKEN__ = githubToken;
    }
  }, [githubToken]);

  const fetchData = async (username: string) => {
    if (!username) return;

    // Check if we have cached data that's still valid
    const now = Date.now();
    const cacheKey = `github-bento-${username}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = lastFetched[username];

    if (cachedData && cachedTime && now - cachedTime < cacheTime) {
      try {
        const { stats, graph } = JSON.parse(cachedData);
        setStats(stats);
        setGraph(graph);
        return;
      } catch (e) {
        // If parsing fails, continue with fetching new data
      }
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

      // Cache the results
      localStorage.setItem(cacheKey, JSON.stringify({
        stats: statsResult.userStats,
        graph: graphResult.graph
      }));

      setLastFetched(prev => ({
        ...prev,
        [username]: now
      }));
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