package it.polito.wa2.productApp.products

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

// The @Entity class is automatically mapped to a database table "product"
// and we need to have a primary key, otherwise the class is invalid.
// Second problem: we have a table "products" and not "product".

@Entity
@Table(name="products")
class Product {
    @Id
    var ean: String = ""

    var name: String = ""
    var brand: String = ""
}