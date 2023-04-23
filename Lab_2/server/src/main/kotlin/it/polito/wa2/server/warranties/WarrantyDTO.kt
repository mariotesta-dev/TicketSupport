package it.polito.wa2.server.warranties

import it.polito.wa2.server.products.Product
import it.polito.wa2.server.profiles.Profile
import java.time.LocalDate

data class WarrantyDTO(
    val warrantyId: Long,
    val productEan: Product?,
    val customerId: Profile?,
    val dateOfPurchase: LocalDate,
    val endOfWarranty: LocalDate
)

fun Warranty.toDTO() : WarrantyDTO {
    return WarrantyDTO(warrantyId, productEan, customerId, dateOfPurchase, endOfWarranty)
}