package it.polito.wa2.server.users

import jakarta.persistence.*


@Entity
@Table(name="users")
@Inheritance(strategy = InheritanceType.JOINED)
open class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_sequence", allocationSize = 1)
    open var id: Long = 0
    @Column(nullable = false)
    open var email: String = ""
    @Column(nullable = false)
    open var name: String = ""
    @Column(nullable = false)
    open var surname: String = ""

    // Role can be either "customer", "expert", or "manager"
    @Column(nullable = false)
    open var role: String = ""
}

