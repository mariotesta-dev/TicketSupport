package it.polito.wa2.server.products

import org.springframework.stereotype.Service

@Service
class ProductServiceImpl(private val productRepository: ProductRepository) : ProductService {
    override fun getAll(): List<ProductDTO> {
        return productRepository.findAll().map{ it.toDTO() }
    }

    override fun getProduct(ean: String): ProductDTO {
        val response = productRepository.findById(ean).orElse(null)
            ?: throw ProductExceptions.ProductNotFoundException("Product with ean $ean not found")

        return response.toDTO()
    }

    override fun createProduct(product: ProductController.NewProduct) {

        for(i in 1..product.quantity) {
            //ean is a string composed by 13 random digits
            var retry = true
            var ean = ""

            while(retry){
                // generate a ean
                ean = (1..13).map { kotlin.random.Random.nextInt(0,10) }.joinToString("")
                // check if the ean generated has already been used
                val productExists = productRepository.findById(ean).orElse(null)
                // productExists == null means that the ean generated hasn't been used yet, so we can proceed with addition
                if(productExists == null) {
                    retry = false // exit from the while loop, else try again generating a new ean
                }
            }
                val newProduct = Product()
                newProduct.ean = ean
                newProduct.name = product.name
                newProduct.brand = product.brand
                productRepository.save(newProduct)
        }
    }

}