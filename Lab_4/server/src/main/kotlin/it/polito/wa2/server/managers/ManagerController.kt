package it.polito.wa2.server.managers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/API/managers")
class ManagerController {

    @GetMapping("/test")
    fun getTest() : String {
        return "you are a manager"
    }
}