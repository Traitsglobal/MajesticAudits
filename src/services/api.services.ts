import { fetchAPI } from "@/lib/fetch-api";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";
import { BlogPost } from '@/types/blog';
import { ContactFormData } from "@/types/contactform";

interface BlogResponse {
    data: BlogPost;
}

class ApiService {

    private static baseUrl: string = getStrapiURL();

    static async fetchHomepageData() {
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

            const response = await fetchAPI(url.href, { method: "GET", next: { revalidate: 7200 } });

            if (!response || !response.data) {
                console.error('Homepage data fetch failed:', response);
                // Return a minimal valid response structure instead of throwing
                return {
                    data: {
                        blocks: [],
                        metadata: {}
                    }
                };
            }

            return response;
        } catch (error) {
            console.error('Error fetching homepage data:', error);
            // Return a minimal valid response structure instead of throwing
            return {
                data: {
                    blocks: [],
                    metadata: {}
                }
            };
        }
    }

    static async fetchBlogData() {
        try {
            const query = qs.stringify({ populate: "*" }, { encodeValuesOnly: true });
            const url = new URL(`/api/blogs?${query}`, this.baseUrl);
            const response = await fetchAPI(url.href, { method: "GET" });
            return response;
        } catch (error) {
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
            throw error;
        }
    }

    static async postContactForm(data: ContactFormData) {
        try {
            const url = new URL("/api/contact-infos", this.baseUrl);

            const response = await fetchAPI(url.href, {
                method: "POST",
                body: { data }
            });

            if (!response) {
                throw new Error('Failed to submit contact form');
            }

            return response;
        } catch (error) {
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
            throw error;
        }
    }
}

export default ApiService;
