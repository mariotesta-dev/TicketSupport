package it.polito.wa2.server.warranties

class WarrantyExceptions {

    class WarrantyNotFoundException(message: String) : RuntimeException(message)

}