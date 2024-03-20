document.addEventListener("DOMContentLoaded", function () {
    const productTemplateSource = document.getElementById("product-template").innerHTML;

    const productTemplate = Handlebars.compile(productTemplateSource);

    function renderProductList(products) {
        const productListContainer = document.getElementById("product-container");
        productListContainer.innerHTML = productTemplate({ products: products });
    }

    async function fetchProductData() {
        try {
            const response = await fetch("/api/products");
            const data = await response.json();
            if (data.success) {
                renderProductList(data.products);
            } else {
                console.error("Error fetching product data:", data.message);
            }
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    }

    fetchProductData();
});