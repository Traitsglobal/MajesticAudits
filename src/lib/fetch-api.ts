type NextFetchRequestConfig = {
    revalidate?: number | false;
    tags?: string[];
};

interface FetchAPIOptions {
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, unknown>;
    next?: NextFetchRequestConfig;
}

export async function fetchAPI(url: string, options: FetchAPIOptions) {
    const { method, body, next } = options;

    const headers: RequestInit & { next?: NextFetchRequestConfig } = {
        method,
        headers: { "Content-Type": "application/json" },
        ...(body && { body: JSON.stringify(body) }),
        ...(next && { next }),
    };

    try {
        const response = await fetch(url, headers);
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json") && response.ok) {
            return await response.json();
        } else {
            return { status: response.status, statusText: response.statusText };
        }
    } catch (error) {
        console.error(`Error ${method} data:`, error);
        throw error;
    }
}