import React from "react";
import { useGitHubStats } from "@/hooks/useGitHubStats";
import Image from "next/image";
import {
  Followers,
  LongestStreak,
  Stars,
  CurrentStreak,
  Repos,
  Commit,
  PRs,
  Issues,
  ContributedTo
} from './StatComponents';

interface GitHubBentoProps {
  username?: string;
  className?: string;
  showGraph?: boolean;
  skipContextProvider?: boolean;
}

export const GitHubBento: React.FC<GitHubBentoProps> = ({
  username,
  className = "",
  showGraph = true,
  skipContextProvider = false
}) => {
  const { stats, graph, loading, error } = useGitHubStats({
    username,
    skipContext: skipContextProvider
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !stats || !stats.Repositories) {
    return (
      <div className="flex items-center justify-center flex-col p-10">
        <p className="text-lg font-medium text-red-500">
          {error || `GitHub user ${username} not found`}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div id="github-ss" className="relative w-full flex items-center justify-center bg-transparent">
        <div
          className="text-white z-10 w-full lg:w-[100%] max-w-6xl mx-auto flex items-start justify-start flex-col p-3 relative pt-[3.5rem] "
        >
          <div className="flex items-center justify-center gap-4 sm:px-10 px-3  mb-2">
            <div className="">
              <Image
                src={stats.AvatarUrl || "/assets/user.svg"}
                alt="User Avatar"
                width={100}
                height={100}
                className="rounded-full size-12 -translate-y-1 object-cover"
              />
            </div>
            <h1 className="font-modernbold leading-tight text-3xl max-w-2xl py-1">
              {stats.Repositories ? username : "User not found"}{" "}
              {stats.Repositories && "'s Github."}
            </h1>
          </div>
          <div className="grid grid-cols-4 grid-rows-4 md:grid-cols-8 md:grid-rows-4 gap-2 w-full md:h-[600px] max-sm:min-h-[100vh]">
            <LongestStreak
              streak={stats["Longest Streak"] || 0}
              start={stats["Longest Streak Start"] || ""}
              end={stats["Longest Streak End"] || ""}
              classname="p-2 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3 col-start-3 col-end-5 "
            />
            <CurrentStreak
              streak={stats["Current Streak"] || 0}
              start={stats["Current Streak Start"] || ""}
              end={stats["Current Streak End"] || ""}
              classname="p-2 md:col-start-3 md:col-end-5 md:row-start-1 md:row-end-4 col-start-2 col-end-5"
            />
            <Followers
              followers={stats.Followers || 0}
              classname="p-2 md:col-start-7 md:col-end-9 md:row-start-4 md:row-end-5 row-start-4 row-end-4 col-start-2 col-end-3"
            />
            <Repos
              repos={stats.Repositories || 0}
              classname="p-2 md:col-start-5 md:col-end-9 md:row-start-1 md:row-end-2 col-start-4 col-end-5 row-start-3 row-end-5"
            />
            <Commit
              commits={stats["Total Contibutions"] || 0}
              classname="p-2 md:col-start-5 md:col-end-7 md:row-start-2 md:row-end-5 col-start-1 col-end-4 row-start-3"
            />
            <PRs
              pr={stats["Pull Requests"] || 0}
              classname="p-2 md:col-start-7 md:col-end-8 md:row-start-2 md:row-end-4 col-start-1 col-end-2 row-start-2"
            />
            <ContributedTo
              contros={stats["Contributed To"] || 0}
              classname="p-2 md:col-start-3 md:col-end-5 md:row-start-4 md:row-end-5"
            />
            <Issues
              issues={stats.Issues || 0}
              classname="p-2 md:col-start-8 md:col-end-9 md:row-start-2 md:row-end-4 col-start-1 row-start-4"
            />
            <Stars
              stars={stats["Star Earned"] || 0}
              classname="p-2 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-5 col-start-1 col-end-3 row-start-1"
            />
          </div>
          <div className="max-sm:px-5 mt-2 w-full max-w-2xl flex  mx-auto">
            <h1 className="max-w-2xl w-full  font-modernbold text-2xl mb-2">
              Contribution Graph:
            </h1>
          </div>
          <div className="px-5 rounded-2xl w-full mx-auto flex flex-col relative overflow-auto">
            <div className="relative max-w-2xl mx-auto">
              <div
                className="bg-zinc-800/20 backdrop-blur-2xl border border-zinc-200/10 backdrop-saturate-200 p-3 rounded-2xl mx-auto overflow-auto max-w-2xl opacity-95 hover:opacity-100 z-[9999] cursor-pointer"
                dangerouslySetInnerHTML={{
                  __html: graph || "",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubBento;
