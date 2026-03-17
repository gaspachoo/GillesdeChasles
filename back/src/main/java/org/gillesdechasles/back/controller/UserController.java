package org.gillesdechasles.back.controller;

import lombok.AllArgsConstructor;
import org.gillesdechasles.back.service.JWTService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UserController {
    private JWTService jwtService;

    @PostMapping("/login")
    public String getToken(Authentication authentication) {
        return jwtService.generateToken(authentication);
    }
}
