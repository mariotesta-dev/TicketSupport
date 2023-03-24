package it.polito.wa2.productApp.products

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

// Web layer
@RestController
class ProductController(
    private val productService: ProductService // I provide the interface ProductService (which is general, not ProductServiceImpl)
) {
    @GetMapping("/products/")
    fun getAll(): List<ProductDTO> {
        return productService.getAll()
    }
    @GetMapping("/products/{ean}")
    fun getProduct(@PathVariable ean: String): ProductDTO? {
        return productService.getProduct(ean)
    }
}