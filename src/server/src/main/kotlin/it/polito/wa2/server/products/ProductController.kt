package it.polito.wa2.server.products

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate

@RestController
class ProductController(private val productService: ProductService) {

    // This must be accessible only if authenticated
    @GetMapping("/API/products")
    fun getAll() : List<ProductDTO> {
        return productService.getAll()
    }

    // This must be accessible only if authenticated
    @GetMapping("/API/products/{ean}")
    fun getProduct(@PathVariable ean: String) : ProductDTO? {
        return productService.getProduct(ean)
    }

    data class NewProduct(
        var name: String,
        var brand: String,
        var quantity: Long,
    )

    @PostMapping("/API/products")
    fun createProduct(@RequestBody product: NewProduct) : ResponseEntity<Any> {
        return productService.createProduct(product)
    }
}