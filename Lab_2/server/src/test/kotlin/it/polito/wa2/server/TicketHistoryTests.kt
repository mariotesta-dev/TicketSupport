package it.polito.wa2.server

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.customers.CustomerRepository
import it.polito.wa2.server.products.Product
import it.polito.wa2.server.products.ProductRepository
import it.polito.wa2.server.tickets.Ticket
import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.TicketRepository
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatus
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistory
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryDTO
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryRepository
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.DynamicTest
import org.junit.jupiter.api.TestFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.web.client.postForEntity
import org.springframework.test.annotation.DirtiesContext
import org.junit.jupiter.api.Test
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.*
import kotlin.reflect.full.createInstance

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
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
            description =
                "I am unable to install the software on my computer. It shows an error message during the installation process."
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

    @Test
    fun `Get history of ticket`() {

        var sampleCustomer = Customer().apply {
            email = "gigio.riva@example.com"
            name = "Gigio"
            surname = "Riva"
        }
        customerRepository.save(sampleCustomer)

        val sampleProduct = Product().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }
        productRepository.save(sampleProduct)

        val sampleTicket = Ticket::class.createInstance().apply {
            product = sampleProduct
            customer = sampleCustomer
            category = "INFORMATION"
            summary = "Office installation issue"
            description =
                "I am unable to install the software on my computer. It shows an error message during the installation process."
        }.also { ticketRepository.save(it) }

        val ticketStatusHistory = TicketStatusHistory::class.createInstance().apply {
            ticket = sampleTicket
            status = TicketStatus.OPEN
        }.also { ticketStatusHistoryRepository.save(it) }

        // Make an HTTP GET request to /API/history/{ticketId}
        val response = restTemplate.exchange(
        "/API/history/${sampleTicket.id}",
        HttpMethod.GET,
        null,
        object : ParameterizedTypeReference<List<TicketStatusHistoryDTO>>() {}
        )

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.OK, response.statusCode)
        Assertions.assertEquals("OPEN", response.body?.get(0)?.status?.name)
    }

    @Test
    fun `Get history of non-existing ticket`() {

        var sampleCustomer = Customer().apply {
            email = "gigio.riva@example.com"
            name = "Gigio"
            surname = "Riva"
        }
        customerRepository.save(sampleCustomer)

        val sampleProduct = Product().apply {
            ean = "3286341298116"
            name = "4x Summer Tyres Bridgestone Turanza T005 255/50r19 107y XL"
            brand = "Bridgestone"
        }
        productRepository.save(sampleProduct)

        val ticket = Ticket::class.createInstance().apply {
            product = sampleProduct
            customer = sampleCustomer
            category = "INFORMATION"
            summary = "Office installation issue"
            description =
                "I am unable to install the software on my computer. It shows an error message during the installation process."
        }.also { ticketRepository.save(it) }

        val nonExistentTicketId = -1

        // Make an HTTP GET request to /API/history/{ticketId}
        val response = restTemplate.getForEntity(
            "/API/history/${nonExistentTicketId}",
            String::class.java
        )

        // Verify the response status and content
        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        Assertions.assertTrue(response.body?.contains("Ticket with id $nonExistentTicketId not found") == true)
    }
}
