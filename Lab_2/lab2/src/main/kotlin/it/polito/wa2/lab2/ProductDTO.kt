package it.polito.wa2.productApp.products

data class ProductDTO(
    val ean: String,
    val name: String,
    val brand: String
)

/*
* toDTO() returns a ProductDTO. This is an extension method.
*
*
*
* */
fun Product.toDTO(): ProductDTO {
    return ProductDTO(ean, name, brand) // this initializes my Product
    // I can write ean, name, brand (it's like this.ean, this.name, this.brand)
    // since it is an extension function
}