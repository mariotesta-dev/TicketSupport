package it.polito.wa2.server.config

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/API/members")
class MemberController {
    @GetMapping("/test")
    fun getTest() : String {
        return "test-get"
    }
}