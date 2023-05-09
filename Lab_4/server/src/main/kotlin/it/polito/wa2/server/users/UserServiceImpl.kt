package it.polito.wa2.server.users

import it.polito.wa2.server.tickets.TicketRepository
import org.springframework.stereotype.Service

@Service
class UserServiceImpl(private val userRepository: UserRepository, private val ticketRepository: TicketRepository): UserService {

}