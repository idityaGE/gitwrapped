"use client"

import { GitHubBento } from "@/packages/github-bento-stats/src";
// import GitHubBento from '@/packages/github-bento-stats'

const page = () => {
  const gittoken = process.env.NEXT_PUBLIC_GITHUB_TOKEN
  if (!gittoken) {
    console.error("Git Token is not provided")
  }

  return (
    <>
      <GitHubBento
        username="idityaGE"
        githubToken={gittoken || ""}
        showGraph={false}
      />
    </>
  )
}

export default page