package it.polito.wa2.server

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.customers.CustomerRepository
import it.polito.wa2.server.experts.Expert
import it.polito.wa2.server.products.Product
import it.polito.wa2.server.products.ProductRepository
import it.polito.wa2.server.tickets.Ticket
import it.polito.wa2.server.tickets.TicketController
import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.TicketRepository
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatus
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryDTO
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryRepository
import it.polito.wa2.server.warranties.Warranty
import it.polito.wa2.server.warranties.WarrantyRepository
import org.json.JSONObject
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.DynamicTest
import org.junit.jupiter.api.TestFactory
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.web.client.postForEntity
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.PutMapping
import java.time.LocalDate

class WarrantyTests : DbT1ApplicationTests() {

    @Autowired
    lateinit var customerRepository: CustomerRepository
    @Autowired
    lateinit var productRepository: ProductRepository
    @Autowired
    lateinit var warrantyRepository: WarrantyRepository

    // SAMPLE DATA

    val sampleCustomer = Customer().apply {
        email = "john.smith@example.com"
        name = "John"
        surname = "Smith"
    }

    val sampleProduct = Product().apply {
        ean = "3286341298116"
        name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
        brand = "Bridgestone"
    }

    val sampleWarranty = Warranty().apply {
        product = sampleProduct
        dateOfPurchase = LocalDate.now()
        endOfWarranty = LocalDate.now().plusYears(2)
    }

    @Test
    fun extend_warranty() {
        var newEndOfWarrantyRequest = LocalDate.now().plusYears(4)

        restTemplate.put(
            "/API/warranties/${sampleWarranty.id}/extend",
            ExtendWarrantyRequest(newEndOfWarrantyRequest)
        )

    }

    //TODO ancora non funziona
    @Test
    fun subscribe_product() {

        //GET WARRANTY

        restTemplate.put(
            "/API/warranties/${sampleWarranty.id}/customer",
            SubscribeProductRequest(sampleCustomer)
        )
    }
}

data class ExtendWarrantyRequest(val newExpiringDate: LocalDate)
data class SubscribeProductRequest(val customer: Customer)