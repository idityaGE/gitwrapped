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