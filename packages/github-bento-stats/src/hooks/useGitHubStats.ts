import { useEffect, useState } from 'react';
import { useGitHubStatsContext, UserStats } from '../context/GitHubStatsContext';
import { fetchUserStats } from '../utils/fetchUser';
import { fetchUserGraph } from '../utils/fetchGraph';

interface UseGitHubStatsOptions {
  username?: string;
  skipContext?: boolean;
  cacheTime?: number;
}

export const useGitHubStats = (options: UseGitHubStatsOptions = {}) => {
  const {
    username: contextUsername,
    skipContext = false,
    cacheTime = 3600000 // Default: 1 hour
  } = options;

  const context = useGitHubStatsContext();
  const [individualStats, setIndividualStats] = useState<UserStats | null>(null);
  const [individualGraph, setIndividualGraph] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Record<string, number>>({});

  // Use context if available and not skipping it
  const useContextData = !skipContext && context;
  const username = options.username || (useContextData ? context.username : '');

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
        setIndividualStats(stats);
        setIndividualGraph(graph);
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

      setIndividualStats(statsResult.userStats);
      setIndividualGraph(graphResult.graph);

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
    if (useContextData) {
      // Use data from context
      return;
    } else if (username) {
      // Fetch data individually
      fetchData(username);
    }
  }, [username, useContextData]);

  const refetch = async () => {
    if (username) {
      await fetchData(username);
    }
  };

  // Return context data if using context, otherwise return individual data
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