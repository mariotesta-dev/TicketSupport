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

}