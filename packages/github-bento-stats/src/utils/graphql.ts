import dotenv from 'dotenv';
dotenv.config();

export const graphQL = async ({
    query,
    variables,
    token
}: {
    query: string;
    variables: Record<string, any>;
    token?: string;
}) => {
    try {
        // Use the passed token, fallback to environment variable
        const authToken = token || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

        if (!authToken) {
            console.warn('No GitHub token provided');
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
            const errorData = await response.json();
            throw new Error(`Request failed with status ${response.status}: ${errorData.message}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('GraphQL request error:', error);
        throw error;
    }
}