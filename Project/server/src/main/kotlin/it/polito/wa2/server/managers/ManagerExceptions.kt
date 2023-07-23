package it.polito.wa2.server.managers

class ManagerExceptions {
    class ManagerNotFoundException(message: String) : RuntimeException(message)

}