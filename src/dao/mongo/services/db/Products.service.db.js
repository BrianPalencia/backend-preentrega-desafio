export default class ProductsManager {
    constructor(dao) {
        this.dao = dao;
    }
    async createProduct(product) {
        try {
            const newProduct = await this.dao.create(product);

            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async getProducts() {
        try {
            const products = await this.dao.find().lean();

            return products;
        } catch (error) {
            throw error;
        }
    }

    async getPaginatedProducts(filter) {
        try {
            filter.options.lean = true;
            const products = await this.dao.paginate(filter.query, filter.options);
            products.status = "success";

            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await this.dao.findById(id).lean();

            return product;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductById(id) {
        try {
            const product = await this.dao.findByIdAndDelete(id).lean();

            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, productUpdates) {

        try {
            const product = await this.dao
                .findByIdAndUpdate(id, productUpdates, {
                    new: true,
                })
                .lean();

            return product;
        } catch (error) {
            throw error;
        }
    }
}