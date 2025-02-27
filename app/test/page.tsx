"use client"

import { GitHubBento, GitHubBentoProvider } from "@/packages/github-bento-stats/src";

const page = () => {
  return (
    <GitHubBentoProvider username="idityaGE" githubToken="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">
      <GitHubBento />
    </GitHubBentoProvider>
  )
}

export default page