package it.polito.wa2.server.messages

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class MessageController(private val messageService: MessageService) {
    @PostMapping("/API/messages")
    fun createMessage(@RequestBody message: Message) =
        messageService.createMessage(message)

}