package it.polito.wa2.server.products

class ProductExceptions {

    class ProductNotFoundException(message: String) : RuntimeException(message)

}