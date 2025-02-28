"use client"

import { GitHubBento } from "@/packages/github-bento-stats/src";

const page = () => {
  return (
    <>
      <GitHubBento
        username="idityaGE"
        githubToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN}
        showGraph={false}
      />
    </>
  )
}

export default page