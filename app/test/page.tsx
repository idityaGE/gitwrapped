"use client"

import { GitHubBento, GitHubBentoProvider } from "@/packages/github-bento-stats/src";

const page = () => {
  return (
    <GitHubBentoProvider username="idityaGE" githubToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN}>
      <GitHubBento />
    </GitHubBentoProvider>
  )
}

export default page