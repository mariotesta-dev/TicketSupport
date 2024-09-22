package it.polito.wa2.server.managers

import it.polito.wa2.server.auth.AuthData
import it.polito.wa2.server.auth.AuthService
import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryDTOWithoutTicket
import it.polito.wa2.server.tickets.ticketStatusHistories.toDTO
import it.polito.wa2.server.users.UserDTO
import jakarta.annotation.security.RolesAllowed
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class ManagerController(private val managerService: ManagerService, private val authService: AuthService){

    @GetMapping("/API/managers/{email}")
    fun getManager(@PathVariable email: String) : UserDTO {
        return managerService.getManager(email)
    }
}