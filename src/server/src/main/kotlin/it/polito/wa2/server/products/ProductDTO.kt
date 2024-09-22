package it.polito.wa2.server.products

import it.polito.wa2.server.warranties.WarrantyDTOWithoutProduct
import it.polito.wa2.server.warranties.toDTOWithoutProduct

data class ProductDTO(
    val ean: String,
    val name: String,
    val brand: String,

    val warranty: WarrantyDTOWithoutProduct?
)

data class ProductDTOWithoutWarranty(
    val ean: String,
    val name: String,
    val brand: String,
)

fun Product.toDTO() : ProductDTO {
    return ProductDTO(ean, name, brand, warranty?.toDTOWithoutProduct())
}

fun Product.toDTOWithoutWarranty() : ProductDTOWithoutWarranty {
    return ProductDTOWithoutWarranty(ean, name, brand)
}