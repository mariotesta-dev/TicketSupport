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
import java.time.LocalDate

class TicketHistoryTests : DbT1ApplicationTests() {

    @Autowired
    lateinit var ticketStatusHistoryRepository: TicketStatusHistoryRepository
    @Autowired
    lateinit var ticketRepository: TicketRepository
    @Autowired
    lateinit var customerRepository: CustomerRepository
    @Autowired
    lateinit var productRepository: ProductRepository


    private val paths = listOf(
        listOf(TicketStatus.IN_PROGRESS, TicketStatus.OPEN),
        listOf(TicketStatus.IN_PROGRESS, TicketStatus.CLOSED, TicketStatus.REOPENED),
        listOf(TicketStatus.IN_PROGRESS, TicketStatus.RESOLVED, TicketStatus.REOPENED),
        listOf(TicketStatus.IN_PROGRESS, TicketStatus.OPEN, TicketStatus.CLOSED, TicketStatus.REOPENED),
        listOf(TicketStatus.IN_PROGRESS, TicketStatus.OPEN, TicketStatus.RESOLVED, TicketStatus.REOPENED),
        listOf(TicketStatus.IN_PROGRESS, TicketStatus.CLOSED, TicketStatus.REOPENED, TicketStatus.CLOSED),
        listOf(TicketStatus.IN_PROGRESS, TicketStatus.RESOLVED, TicketStatus.REOPENED, TicketStatus.CLOSED),
        listOf(TicketStatus.RESOLVED, TicketStatus.REOPENED),
        listOf(TicketStatus.RESOLVED, TicketStatus.CLOSED, TicketStatus.REOPENED),
        listOf(TicketStatus.RESOLVED, TicketStatus.REOPENED, TicketStatus.CLOSED, TicketStatus.REOPENED),
        listOf(TicketStatus.RESOLVED, TicketStatus.REOPENED, TicketStatus.IN_PROGRESS, TicketStatus.OPEN),
        listOf(TicketStatus.RESOLVED, TicketStatus.CLOSED, TicketStatus.REOPENED),
        listOf(TicketStatus.RESOLVED, TicketStatus.CLOSED, TicketStatus.REOPENED, TicketStatus.RESOLVED),
        listOf(TicketStatus.CLOSED, TicketStatus.REOPENED),
        listOf(TicketStatus.CLOSED, TicketStatus.REOPENED, TicketStatus.CLOSED),
        listOf(TicketStatus.CLOSED, TicketStatus.REOPENED, TicketStatus.RESOLVED, TicketStatus.REOPENED),
        listOf(TicketStatus.CLOSED, TicketStatus.REOPENED, TicketStatus.IN_PROGRESS, TicketStatus.CLOSED),
        listOf(TicketStatus.CLOSED,TicketStatus.REOPENED, TicketStatus.CLOSED, TicketStatus.REOPENED, TicketStatus.RESOLVED),
        listOf(TicketStatus.CLOSED,TicketStatus.REOPENED, TicketStatus.IN_PROGRESS, TicketStatus.OPEN, TicketStatus.CLOSED),
        listOf(TicketStatus.CLOSED,TicketStatus.REOPENED, TicketStatus.IN_PROGRESS, TicketStatus.RESOLVED, TicketStatus.CLOSED)
    )


    private val apiPath =  mapOf (
        TicketStatus.OPEN to "/API/history/open",
        TicketStatus.CLOSED to "/API/history/close",
        TicketStatus.IN_PROGRESS to "/API/history/in_progress",
        TicketStatus.RESOLVED to "/API/history/resolve",
        TicketStatus.REOPENED to "/API/history/reopen",
    )

    @TestFactory
    fun `test paths`(): List<DynamicTest> {
        // Create a sample ticket to operate tests

        val sampleCustomer = Customer().apply {
            email = "john.smith@example.com"
            name = "John"
            surname = "Smith"
        }
        customerRepository.save(sampleCustomer)

        val sampleProduct = Product().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }
        productRepository.save(sampleProduct)

        val ticket = Ticket().apply {
            product = Product().apply {
                ean = sampleProduct.ean
            }
            customer = Customer().apply {
                id = sampleCustomer.id
            }
            category = "INFORMATION"
            summary = "Office installation issue"
            description = "I am unable to install the software on my computer. It shows an error message during the installation process."
        }


        return paths.map { path ->
            DynamicTest.dynamicTest("Test path: ${path.joinToString(" -> ")}") {
                ticketStatusHistoryRepository.deleteAll()
                ticketRepository.deleteAll()

                val headers = HttpHeaders()
                headers.setContentType(MediaType.APPLICATION_JSON)

                val response = restTemplate.postForEntity<TicketDTO>(
                    "/API/tickets",
                    HttpEntity(ticket, headers),
                    TicketDTO::class.java::class.java,
                )

                for (toStatus in path) {
                    val response = restTemplate.postForEntity<TicketStatusHistoryDTO>(
                        "${apiPath[toStatus]}/${response.body?.id}",
                        TicketStatusHistoryDTO::class.java,
                    )
                    Assertions.assertEquals(HttpStatus.OK, response.statusCode)
                    Assertions.assertEquals(toStatus, response.body?.status)
                }
            }
        }
    }


}