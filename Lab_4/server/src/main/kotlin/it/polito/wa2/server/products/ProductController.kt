package it.polito.wa2.server.products

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class ProductController(private val productService: ProductService) {

    @GetMapping("/API/products")
    fun getAll() : List<ProductDTO> {
        return productService.getAll()
    }

    @GetMapping("/API/products/{ean}")
    fun getProduct(@PathVariable ean: String) : ProductDTO? {
        return productService.getProduct(ean)
    }
}