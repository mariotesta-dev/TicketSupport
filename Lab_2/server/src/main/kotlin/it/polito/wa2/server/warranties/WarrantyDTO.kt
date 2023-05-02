package it.polito.wa2.server.warranties

import it.polito.wa2.server.customers.CustomerDTOWithoutWarrantiesAndTickets
import it.polito.wa2.server.products.Product
import it.polito.wa2.server.customers.toDTOWithoutWarrantiesAndTickets
import java.time.LocalDate

data class WarrantyDTO(
    val id: Long,
    val product: Product?,
    val customer: CustomerDTOWithoutWarrantiesAndTickets?,
    val dateOfPurchase: LocalDate,
    val endOfWarranty: LocalDate
)

data class WarrantyDTOWithoutCustomer(
    val id: Long,
    val product: Product?,
    val dateOfPurchase: LocalDate,
    val endOfWarranty: LocalDate
)

fun Warranty.toDTO() : WarrantyDTO {
    return WarrantyDTO(id, product, customer!!.toDTOWithoutWarrantiesAndTickets(), dateOfPurchase, endOfWarranty)
}

fun Warranty.toDTOWithoutCustomer() : WarrantyDTOWithoutCustomer {
    return WarrantyDTOWithoutCustomer(id, product, dateOfPurchase, endOfWarranty)
}