import { fetchAPI } from "@/lib/fetch-api";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";
import { BlogPost } from '@/types/blog';
import { ContactFormData } from "@/types/contactform";

interface BlogResponse {
    data: BlogPost;
}

const cache = new Map();

class ApiService {

    private static baseUrl: string = getStrapiURL()

    static async fetchHomepageData() {
        // Skip caching in development environment
        if (true) {
            try {
                const url = new URL("/api/home-page", this.baseUrl);
                const homePageQuery = qs.stringify({
                    populate: {
                        blocks: {
                            on: {
                                "layout.topbar": { populate: { DigitalPlatforms: { populate: "*" } } },
                                "layout.header": { populate: "*" },
                                "layout.hero": { populate: { Carosel: { populate: "*" } } },
                            }
                        },
                        metadata: true
                    }
                }, { encode: false })
                url.search = homePageQuery;
                console.log('url', url.href);
                const response = await fetchAPI(url.href, { method: "GET" });

                if (!response || !response.data) {
                    throw new Error('Failed to fetch homepage data');
                }

                return response;
            } catch (error) {
                console.error('Error fetching homepage data:', error);
                throw error;
            }
        }

        // Use caching only in production
        const cacheKey = 'homepage';
        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }

        // Rest of the production caching logic...
        try {
            const url = new URL("/api/home-page", this.baseUrl);
            const homePageQuery = qs.stringify({
                populate: {
                    blocks: {
                        on: {
                            "layout.topbar": { populate: { DigitalPlatforms: { populate: "*" } } },
                            "layout.header": { populate: "*" },
                            "layout.hero": { populate: { Carosel: { populate: "*" } } },
                        }
                    }
                }
            }, { encode: false })
            url.search = homePageQuery;
            const response = await fetchAPI(url.href, { method: "GET" });

            if (!response || !response.data) {
                throw new Error('Failed to fetch homepage data');
            }

            cache.set(cacheKey, response);
            return response;
        } catch (error) {
            console.error('Error fetching homepage data:', error);
            throw error;
        }
    }

    static async fetchBlogData() {
        try {
            const query = qs.stringify({ populate: "*" }, { encodeValuesOnly: true });
            const url = new URL(`/api/blogs?${query}`, this.baseUrl);
            const response = await fetchAPI(url.href, { method: "GET" });
            return response;
        } catch (error) {
            console.error('Error in fetchBlogData:', error);
            throw error;
        }
    }

    static async fetchBlogPost(id: string): Promise<BlogResponse> {
        try {
            const query = qs.stringify({ populate: "*" }, { encodeValuesOnly: true });
            const url = new URL(`/api/blogs/${id}?${query}`, this.baseUrl);
            const response = await fetchAPI(url.href, { method: "GET" });
            return response;
        } catch (error) {
            console.error('Error fetching blog post:', error);
            throw error;
        }
    }

    static async fetchServiceData() {
        try {
            const query = qs.stringify({ populate: "*" }, { encodeValuesOnly: true });
            const url = new URL(`/api/services?${query}`, this.baseUrl);
            const response = await fetchAPI(url.href, { method: "GET" });
            return response;
        } catch (error) {
            console.error('Error fetching services:', error);
            throw error;
        }
    }

    static async fetchAboutPageData() {
        try {
            const aboutQuery = qs.stringify({
                populate: {
                    blocks: {
                        on: {
                            "layout.ourstory": { populate: "*" },
                            "layout.vision-and-mission": { populate: "*" },
                            "layout.corevalues": { populate: { cards: { populate: "*" } } },
                        }
                    },
                    metadata: { populate: "*" }
                }
            }, { encode: false })
            const url = new URL(`/api/about-page?${aboutQuery}`, this.baseUrl);
            const response = await fetchAPI(url.href, { method: "GET" });
            return response;
        } catch (error) {
            console.error('Error fetching about page data:', error);
            throw error;
        }
    }

    static async postContactForm(data: ContactFormData) {
        try {
            const url = new URL("/api/contact-infos", this.baseUrl);

            if (!data.name || !data.email || !data.service || !data.message) {
                throw new Error('Missing required fields');
            }

            const response = await fetchAPI(url.href, {
                method: "POST",
                body: { data }
            });

            if (!response) {
                throw new Error('Failed to submit contact form');
            }

            return response;
        } catch (error) {
            console.error('Error posting contact form:', error);
            throw error;
        }
    }

    static async fetchBlogPageData() {
        try {
            const query = qs.stringify({ populate: "*" }, { encodeValuesOnly: true });
            const url = new URL(`/api/blog-page?${query}`, this.baseUrl);
            const response = await fetchAPI(url.href, { method: "GET" });
            return response;
        } catch (error) {
            console.error('Error fetching blog page data:', error);
            throw error;
        }
    }

    static async fetchContactusPageData() {
        try {
            const query = qs.stringify({
                populate: {
                    metadata: '*',
                    contactdetails: { populate: ['icon'] }
                }
            }, { encodeValuesOnly: true });

            const url = new URL(`/api/contact-us-page?${query}`, this.baseUrl);
            const response = await fetchAPI(url.href, { method: "GET" });
            return response;
        } catch (error) {
            console.error('Error fetching contactus page data:', error);
            throw error;
        }
    }
}

export default ApiService;
