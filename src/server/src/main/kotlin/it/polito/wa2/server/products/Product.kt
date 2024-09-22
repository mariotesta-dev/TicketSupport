package it.polito.wa2.server.products

import it.polito.wa2.server.warranties.Warranty
import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.OneToOne
import jakarta.persistence.Table

@Entity
@Table(name="products")
class Product {
    @Id
    var ean: String = ""
    var name: String = ""
    var brand: String = ""

    @OneToOne(mappedBy = "product", cascade = [CascadeType.REFRESH])
    @JoinColumn(nullable = true)
    var warranty: Warranty? = null
}
