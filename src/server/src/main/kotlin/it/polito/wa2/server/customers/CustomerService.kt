package it.polito.wa2.server.customers

import it.polito.wa2.server.tickets.TicketDTO

interface CustomerService {
    fun getCustomer(email: String) : CustomerDTO

    fun getCustomerById(customerId: Long) : CustomerDTO
    fun createCustomer(customer: Customer) : CustomerDTO
    fun updateCustomer(email: String, customer: Customer) : CustomerDTO
}