"use client"

import { GitHubBento } from "@/packages/github-bento-stats/src";

const page = () => {
  const gittoken = process.env.NEXT_PUBLIC_GITHUB_TOKEN
  if (!gittoken) {
    console.error("Git Token is not provided")
  }

  return (
    <>
      <GitHubBento
        username="NitinDarker"
        githubToken={gittoken || ""}
        showGraph
      />
    </>
  )
}

export default page