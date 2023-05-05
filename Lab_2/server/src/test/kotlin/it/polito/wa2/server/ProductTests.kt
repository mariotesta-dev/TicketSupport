package it.polito.wa2.server

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.customers.CustomerDTO
import it.polito.wa2.server.products.Product
import it.polito.wa2.server.products.ProductDTO
import it.polito.wa2.server.products.ProductRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus

class ProductTests : DbT1ApplicationTests() {

    @Autowired
    lateinit var productRepository: ProductRepository

    @Test
    fun `Get product by ean`() {
        // Create a sample product
        val product = Product().apply {
            ean = "1234567890123"
            name = "Sample product"
            brand = "Sample brand"
        }
        productRepository.save(product)

        // Make an HTTP GET request to /API/products/{ean}
        val response = restTemplate.getForEntity<ProductDTO>("/API/products/${product.ean}", ProductDTO::class.java)

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.OK, response.statusCode)
        Assertions.assertEquals(product.ean, response.body?.ean)
        Assertions.assertEquals(product.name, response.body?.name)
        Assertions.assertEquals(product.brand, response.body?.brand)
    }

    @Test
    fun `Get non-existent product by ean`() {
        // Non-existent product ean
        val nonExistentEan = "1234567890125"

        // Make an HTTP GET request to /API/products/{ean}
        val response = restTemplate.getForEntity<String>("/API/products/${nonExistentEan}", String::class.java)

        // Verify the response status and content
        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertTrue(response.body?.contains("Product with ean $nonExistentEan not found") == true)
    }

}
