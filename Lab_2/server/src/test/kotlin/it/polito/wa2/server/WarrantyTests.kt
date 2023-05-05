package it.polito.wa2.server

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.customers.CustomerRepository
import it.polito.wa2.server.customers.toDTOWithoutWarrantiesAndTickets
import it.polito.wa2.server.products.Product
import it.polito.wa2.server.products.ProductRepository
import it.polito.wa2.server.warranties.*
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.*
import org.springframework.test.annotation.DirtiesContext
import java.time.LocalDate
import kotlin.reflect.full.createInstance

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class WarrantyTests : DbT1ApplicationTests() {

    @Autowired
    lateinit var customerRepository: CustomerRepository
    @Autowired
    lateinit var productRepository: ProductRepository
    @Autowired
    lateinit var warrantyRepository: WarrantyRepository

    @Test
    fun `Get warranty by id`() {

        val sampleCustomer = Customer().apply {
            email = "john.smith@example.com"
            name = "John"
            surname = "Smith"
        }
        customerRepository.save(sampleCustomer)

        val sampleProduct = Product().apply {
            ean = "1234567890123"
            name = "Sample product"
            brand = "Sample brand"
        }
        productRepository.save(sampleProduct)

        val sampleWarranty = Warranty::class.createInstance().apply {
            product = sampleProduct
            customer = sampleCustomer
            dateOfPurchase = LocalDate.now()
            endOfWarranty = LocalDate.now().plusYears(2)
        }.also { warrantyRepository.save(it) }

        // Make an HTTP GET request to /API/warranties/{warrantyId}
        val response = restTemplate.getForEntity(
            "/API/warranties/${sampleWarranty.id}",
            WarrantyDTO::class.java
        )

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.OK, response.statusCode)
        Assertions.assertEquals(sampleWarranty.product?.ean, response.body?.product?.ean)
        Assertions.assertEquals(sampleWarranty.customer?.id, response.body?.customer?.id)
        Assertions.assertEquals(sampleWarranty.dateOfPurchase, response.body?.dateOfPurchase)
        Assertions.assertEquals(sampleWarranty.endOfWarranty, response.body?.endOfWarranty)

    }

    @Test
    fun `Get non-existing warranty by id`() {

        val nonExistingId = -1

        // Make an HTTP GET request to /API/warranties/{warrantyId}
        val response = restTemplate.getForEntity(
            "/API/warranties/${nonExistingId}",
            String::class.java
        )

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        Assertions.assertTrue(response.body?.contains("Warranty with id $nonExistingId not found") == true)
    }

    @Test
    fun `Get warranty by product`() {

        val sampleCustomer = Customer().apply {
            email = "john.smith@example.com"
            name = "John"
            surname = "Smith"
        }
        customerRepository.save(sampleCustomer)

        val sampleProduct = Product().apply {
            ean = "1234567890123"
            name = "Sample product"
            brand = "Sample brand"
        }
        productRepository.save(sampleProduct)

        val sampleWarranty = Warranty::class.createInstance().apply {
            product = sampleProduct
            customer = sampleCustomer
            dateOfPurchase = LocalDate.now()
            endOfWarranty = LocalDate.now().plusYears(2)
        }.also { warrantyRepository.save(it) }

        // Make an HTTP GET request to /API/warranties/{warrantyId}
        val response = warrantyRepository.getWarrantyByProductEan(sampleProduct.ean)

        // Verify the response status and content
        Assertions.assertEquals(sampleWarranty.product?.ean, response?.product?.ean)
        Assertions.assertEquals(sampleWarranty.customer?.id, response?.customer?.id)
        Assertions.assertEquals(sampleWarranty.dateOfPurchase, response?.dateOfPurchase)
        Assertions.assertEquals(sampleWarranty.endOfWarranty, response?.endOfWarranty)

    }

    @Test
    fun `Create warranty`() {

        val sampleProduct = Product::class.createInstance().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }.also { productRepository.save(it) }

        val sampleWarranty = Warranty().apply {
            product = sampleProduct
            dateOfPurchase = LocalDate.now()
            endOfWarranty = LocalDate.now().plusYears(2)
        }

        // Make an HTTP POST request to /API/warranties
        val headers : HttpHeaders = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
        }
        val request = HttpEntity(sampleWarranty, headers)
        val response = restTemplate.postForEntity(
            "/API/warranties",
            request,
            WarrantyDTO::class.java
        )

        Assertions.assertEquals(HttpStatus.OK, response.statusCode)
        Assertions.assertNotNull(response?.body?.id)
        Assertions.assertEquals(sampleWarranty.product?.ean, response?.body?.product?.ean)
        Assertions.assertEquals(null, response?.body?.customer)
        Assertions.assertEquals(sampleWarranty.dateOfPurchase, response?.body?.dateOfPurchase)
        Assertions.assertEquals(sampleWarranty.endOfWarranty, response?.body?.endOfWarranty)

    }

    @Test
    fun `Create warranty with non-existing product`() {

        val sampleProduct = Product::class.createInstance().apply {
            ean = "11111111111"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }

        val sampleWarranty = Warranty().apply {
            product = sampleProduct
            dateOfPurchase = LocalDate.now()
            endOfWarranty = LocalDate.now().plusYears(2)
        }

        // Make an HTTP POST request to /API/warranties
        val headers : HttpHeaders = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
        }
        val request = HttpEntity(sampleWarranty, headers)
        val response = restTemplate.postForEntity(
            "/API/warranties",
            request,
            String::class.java
        )

        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        Assertions.assertTrue(response.body?.contains("Product with ean ${sampleProduct.ean} not found") == true)
    }

    @Test
    fun `Extend warranty`() {

        val sampleProduct = Product().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }
        productRepository.save(sampleProduct)

        val sampleWarranty = Warranty().apply {
            product = sampleProduct
            dateOfPurchase = LocalDate.now()
            endOfWarranty = LocalDate.now().plusYears(2)
        }.also { warrantyRepository.save(it) }

        var newEndOfWarranty = LocalDate.now().plusYears(4)

        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON

        val extension = WarrantyController.Extension(
            newEndOfWarranty = newEndOfWarranty
        )

        val response = restTemplate.exchange(
            "/API/warranties/${sampleWarranty.id}/extend",
            HttpMethod.PUT,
            HttpEntity(extension,headers),
            WarrantyDTO::class.java
        )

        Assertions.assertEquals(HttpStatus.OK, response.statusCode)
        Assertions.assertEquals(newEndOfWarranty,response.body?.endOfWarranty)

    }

    @Test
    fun `Extend non-existing warranty`() {

        val nonExistingId = -1

        var newEndOfWarranty = LocalDate.now().plusYears(4)

        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON

        val extension = WarrantyController.Extension(
            newEndOfWarranty = newEndOfWarranty
        )

        val response = restTemplate.exchange(
            "/API/warranties/${nonExistingId}/extend",
            HttpMethod.PUT,
            HttpEntity(extension,headers),
            String::class.java
        )

        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        Assertions.assertTrue(response.body?.contains("Warranty with id $nonExistingId not found") == true)

    }

    @Test
    fun `Extend warranty with invalid date`() {

        val sampleProduct = Product().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }
        productRepository.save(sampleProduct)

        val sampleWarranty = Warranty().apply {
            product = sampleProduct
            dateOfPurchase = LocalDate.now()
            endOfWarranty = LocalDate.now().plusYears(2)
        }.also { warrantyRepository.save(it) }

        // Invalid date, new end of warranty MUST BE after current one
        var newEndOfWarranty = LocalDate.now().minusYears(1)

        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON

        val extension = WarrantyController.Extension(
            newEndOfWarranty = newEndOfWarranty
        )

        val response = restTemplate.exchange(
            "/API/warranties/${sampleWarranty.id}/extend",
            HttpMethod.PUT,
            HttpEntity(extension,headers),
            String::class.java
        )

        Assertions.assertEquals(HttpStatus.NOT_ACCEPTABLE, response.statusCode)
        Assertions.assertTrue(response.body?.contains("New end of warranty date has to be after current one") == true)

    }

    @Test
    fun `Subscribe product`() {

        val sampleProduct = Product().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }
        productRepository.save(sampleProduct)

        val sampleWarranty = Warranty().apply {
            product = sampleProduct
            dateOfPurchase = LocalDate.now()
            endOfWarranty = LocalDate.now().plusYears(2)
        }
        warrantyRepository.save(sampleWarranty)

        val sampleCustomer = Customer().apply {
            email = "john.smith@example.com"
            name = "John"
            surname = "Smith"
        }
        customerRepository.save(sampleCustomer)

        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON

        val response = restTemplate.exchange(
            "/API/warranties/${sampleWarranty.id}/customer",
            HttpMethod.PUT,
            HttpEntity(sampleCustomer,headers),
            WarrantyDTO::class.java
        )

        Assertions.assertEquals(HttpStatus.OK, response.statusCode)
        Assertions.assertEquals(sampleCustomer.toDTOWithoutWarrantiesAndTickets(), response?.body?.customer)
    }

    @Test
    fun `Subscribe product to non-existing warranty`() {

        val nonExistingWarranty = -1

        val sampleCustomer = Customer().apply {
            email = "john.smith@example.com"
            name = "John"
            surname = "Smith"
        }
        customerRepository.save(sampleCustomer)

        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON

        val response = restTemplate.exchange(
            "/API/warranties/${nonExistingWarranty}/customer",
            HttpMethod.PUT,
            HttpEntity(sampleCustomer,headers),
            String::class.java
        )

        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        Assertions.assertTrue(response.body?.contains("Warranty with id $nonExistingWarranty not found") == true)
    }

    @Test
    fun `Subscribe product to non-existing customer`() {

        val sampleCustomer = Customer().apply {
            email = "nonexistingcustomer@mail.com"
            name = "Non"
            surname = "Existing"
        }
        sampleCustomer?.id = -1

        val sampleProduct = Product().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }
        productRepository.save(sampleProduct)

        val sampleWarranty = Warranty().apply {
            product = sampleProduct
            dateOfPurchase = LocalDate.now()
            endOfWarranty = LocalDate.now().plusYears(2)
        }
        warrantyRepository.save(sampleWarranty)

        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON

        val response = restTemplate.exchange(
            "/API/warranties/${sampleWarranty.id}/customer",
            HttpMethod.PUT,
            HttpEntity(sampleCustomer,headers),
            String::class.java
        )

        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        Assertions.assertTrue(response.body?.contains("Customer with id ${sampleCustomer?.id} not found") == true)
    }
}