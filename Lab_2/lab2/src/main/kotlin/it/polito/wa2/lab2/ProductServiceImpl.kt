package it.polito.wa2.productApp.products

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class ProductServiceImpl(private val productRepository: ProductRepository): ProductService {
    override fun getAll(): List<ProductDTO> {
        /*
        * We have DTOs. We don't want to let other see that the eam is the PK,
        * to let others know that this is a Product which stands in a table called "products",
        * these informations are private. They are conceiled. They exist only in the private part of the service,
        * we want to expose smth which is clean, as a pure Kotlin class without any annotation.
        * So I decorate the ProductDTO class with an extension method toDTO().
        *
        * findAll() returns a List<Product!>
        * */
        return productRepository.findAll().map {it.toDTO()}
    }

    override fun getProduct(ean: String): ProductDTO? {
        // findById is not good because we can't deal with Optional<Product>.
        // In Kotlin this is mapped to the idea of nullability (Product?)
        // If it finds a product, it returns a Product, so we need to write .toDTO()
        return productRepository
            .findByIdOrNull(ean)
            ?.toDTO()
    }
}