package it.polito.wa2.server.messages

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class MessageController(private val messageService: MessageService) {

    // This must be accessible only by the customer and the expert
    //TODO check if the ticket is assigned to the right customer and to the right expert
    @PostMapping("/API/messages")
    fun createMessage(@RequestBody message: Message) =
        messageService.createMessage(message)

    //TODO add an attachment to a ticket's message
    //@PostMapping("/API/tickets/{ticketId}/messages/{messageId}/attachments")
}