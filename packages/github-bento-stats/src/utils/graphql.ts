declare global {
    interface Window {
        __GITHUB_BENTO_TOKEN__?: string;
    }
}

export const graphQL = async ({
    query,
    variables
}: {
    query: string;
    variables: Record<string, any>;
}) => {
    try {
        // Try to get token from window if it was set by GitHubBentoProvider
        const token = typeof window !== 'undefined' ? window.__GITHUB_BENTO_TOKEN__ : undefined;

        // If no token is found, try to get it from environment variable
        const authToken = token || process.env.NEXT_PUBLIC_GITHUB_TOKEN || '';

        if (!authToken) {
            console.warn('GitHub token not found. Set it via GitHubBentoProvider or NEXT_PUBLIC_GITHUB_TOKEN');
        }

        const response = await fetch('https://api.github.com/graphql', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authToken}`,
                Accept: 'application/vnd.github+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query, variables })
        });

        if (!response.ok) {
            throw new Error(`Request failed ${response.status}`);
        }

        const data = await response.json();

        if (data.errors) {
            throw new Error(data.errors[0].message);
        }

        return data.data;
    } catch (error) {
        console.error("GraphQL request error:", error);
        throw error;
    }
};
