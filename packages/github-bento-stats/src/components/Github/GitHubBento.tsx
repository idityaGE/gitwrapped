import { useEffect, useState } from 'react';
import fetchUser from '../../utils/fetchUser';
import fetchGraph from '../../utils/fetchGraph';
import { UserStats } from '../../types/type';

interface UseGitHubStatsOptions {
  username: string;
  githubToken: string;
}

// Default stats for initial render or error states
const defaultStats: UserStats = {
  Followers: 0,
  Repositories: 0,
  'Pull Requests': 0,
  Issues: 0,
  Commits: 0,
  'Contributed To': 0,
  'Star Earned': 0,
  'Total Contibutions': 0,
  'Longest Streak': 0,
  'Longest Streak Start': null,
  'Longest Streak End': null,
  'Current Streak': 0,
  'Current Streak Start': null,
  'Current Streak End': null,
  AvatarUrl: '',
};

export const useGitHubStats = (options: UseGitHubStatsOptions) => {
  const {
    username = 'idityaGE',
    githubToken
  } = options;

  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [graph, setGraph] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUsername, setCurrentUsername] = useState(username);

  const fetchData = async (username: string, token: string) => {
    if (!username) {
      setError("Username is not provided");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [statsResult, graphResult] = await Promise.all([
        fetchUser(username, token),
        fetchGraph(username, token)
      ]);

      // Check if we have valid data from the API
      if (statsResult.userStats && Object.keys(statsResult.userStats).length > 0 &&
        statsResult.userStats.Repositories !== undefined) {
        setStats(statsResult.userStats);
      } else {
        // Keep the default stats but set error
        setError("Could not fetch user data");
      }

      if (graphResult.graph) {
        setGraph(graphResult.graph);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Even if token is missing, we'll attempt to fetch with whatever we have
    // The component will render with default stats
    fetchData(currentUsername, githubToken);
  }, [currentUsername, githubToken]);

  const setUsername = (newUsername: string) => {
    setCurrentUsername(newUsername);
  };

  const refetch = async () => {
    await fetchData(currentUsername, githubToken);
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