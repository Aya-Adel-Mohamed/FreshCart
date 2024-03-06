import axios from "axios";

export const getProducts = async (signal, slug, brandSlug,page) => {
    try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`, {
            signal: signal
        });
        if (slug) {
            return data.data.filter((ele) => ele.category.slug === slug)
        } else if (brandSlug) {
            return data.data.filter((ele) => ele.brand.slug === brandSlug)
        } else {
            return data.data
        }
    } catch (error) {
    }
}

