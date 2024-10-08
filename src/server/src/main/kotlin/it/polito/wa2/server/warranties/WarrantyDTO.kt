package it.polito.wa2.server.warranties

import it.polito.wa2.server.customers.CustomerDTOWithoutWarrantiesAndTickets
import it.polito.wa2.server.customers.toDTOWithoutWarrantiesAndTickets
import it.polito.wa2.server.products.*
import java.time.LocalDate

data class WarrantyDTO(
    val id: Long,
    val product: ProductDTOWithoutWarranty?,
    val customer: CustomerDTOWithoutWarrantiesAndTickets?,
    val dateOfPurchase: LocalDate,
    val endOfWarranty: LocalDate
)

data class WarrantyDTOWithoutCustomer(
    val id: Long,
    val product: ProductDTOWithoutWarranty?,
    val dateOfPurchase: LocalDate,
    val endOfWarranty: LocalDate
)

data class WarrantyDTOWithoutProduct(
    val id: Long,
    val customer: CustomerDTOWithoutWarrantiesAndTickets?,
    val dateOfPurchase: LocalDate,
    val endOfWarranty: LocalDate
)

fun Warranty.toDTO() : WarrantyDTO {
    return WarrantyDTO(id, product?.toDTOWithoutWarranty(), customer?.toDTOWithoutWarrantiesAndTickets(), dateOfPurchase, endOfWarranty)
}

fun Warranty.toDTOWithoutCustomer() : WarrantyDTOWithoutCustomer {
    return WarrantyDTOWithoutCustomer(id, product?.toDTOWithoutWarranty(), dateOfPurchase, endOfWarranty)
}

fun Warranty.toDTOWithoutProduct() : WarrantyDTOWithoutProduct {
    return WarrantyDTOWithoutProduct(id, customer?.toDTOWithoutWarrantiesAndTickets(), dateOfPurchase, endOfWarranty)
}