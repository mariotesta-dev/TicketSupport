package it.polito.wa2.server.warranties

import it.polito.wa2.server.products.Product
import it.polito.wa2.server.customers.Customer
import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name="warranties")
class Warranty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0

    @OneToOne(fetch = FetchType.LAZY, cascade = [CascadeType.REFRESH])
    @JoinColumn(nullable = false)
    var product: Product? = null

    @ManyToOne(fetch = FetchType.LAZY, cascade = [CascadeType.REFRESH])
    @JoinColumn(nullable = true)
    var customer: Customer? = null

    // generate date of Purchase when the warranty is created (now)
    var dateOfPurchase: LocalDate = LocalDate.now()

    // generate end of warranty when the warranty is created (now + 2 years)
    var endOfWarranty: LocalDate = LocalDate.now().plusYears(2)

}