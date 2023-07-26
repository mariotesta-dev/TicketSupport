package it.polito.wa2.server.products

import org.springframework.http.ResponseEntity

interface ProductService {
    fun getAll() : List<ProductDTO>
    fun getProduct(ean: String) : ProductDTO
    fun createProduct(product: ProductController.NewProduct) : ResponseEntity<Any>
}