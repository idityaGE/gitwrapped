import { useEffect, useState } from 'react';
import fetchUser from '../utils/fetchUser';
import fetchGraph from '../utils/fetchGraph';
import { UserStats } from '../types/type';

interface UseGitHubStatsOptions {
  username: string;
  githubToken: string;
}

export const useGitHubStats = (options: UseGitHubStatsOptions) => {
  const {
    username = 'idityaGE',
    githubToken
  } = options;

  const [stats, setStats] = useState<UserStats | null>(null);
  const [graph, setGraph] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUsername, setCurrentUsername] = useState(username);

  // Setup token if provided
  // useEffect(() => {
  //   if (githubToken && typeof window !== 'undefined') {
  //     window.__GITHUB_BENTO_TOKEN__ = githubToken;
  //   }
  // }, [githubToken]);

  const fetchData = async (username: string) => {
    if (!username) {
      setError("Username is not provided");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [statsResult, graphResult] = await Promise.all([
        fetchUser(username),
        fetchGraph(username)
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
    fetchData(currentUsername);
  }, [currentUsername, githubToken]);

  const setUsername = (newUsername: string) => {
    setCurrentUsername(newUsername);
  };

  const refetch = async () => {
    await fetchData(currentUsername);
  };

  return {
    stats,
    graph,
    loading,
    error,
    username: currentUsername,
    setUsername,
    refetch
  };
};