import { useEffect, useState } from 'react';
import { useGitHubStatsContext, UserStats } from '../context/GitHubStatsContext';
import { fetchUserStats } from '../utils/fetchUser';
import { fetchUserGraph } from '../utils/fetchGraph';

interface UseGitHubStatsOptions {
  username?: string;
  skipContext?: boolean;
}

export const useGitHubStats = (options: UseGitHubStatsOptions = {}) => {
  const {
    username: contextUsername,
    skipContext = false,
  } = options;

  const context = useGitHubStatsContext();
  const [individualStats, setIndividualStats] = useState<UserStats | null>(null);
  const [individualGraph, setIndividualGraph] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const useContextData = !skipContext && context;
  const username = options.username || (useContextData ? context.username : 'idityaGE');

  const fetchData = async (username: string) => {
    if (!username) {
      setError("username is not provided")
    };

    setLoading(true);
    setError(null);

    try {
      const [statsResult, graphResult] = await Promise.all([
        fetchUserStats(username),
        fetchUserGraph(username)
      ]);

      setIndividualStats(statsResult.userStats);
      setIndividualGraph(graphResult.graph);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (useContextData) {
      return;
    } else if (username) {
      fetchData(username);
    }
  }, [username, useContextData]);

  const refetch = async () => {
    if (username) {
      await fetchData(username);
    }
  };

  return {
    stats: useContextData ? context.stats : individualStats,
    graph: useContextData ? context.graph : individualGraph,
    loading: useContextData ? context.loading : loading,
    error: useContextData ? context.error : error,
    username: useContextData ? context.username : username,
    setUsername: useContextData ? context.setUsername : (name: string) => {
      options.username = name;
      fetchData(name);
    },
    refetch: useContextData ? context.refetch : refetch
  };
};