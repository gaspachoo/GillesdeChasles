package org.gillesdechasles.back.controller;

import lombok.AllArgsConstructor;
import org.gillesdechasles.back.dto.LoginRequest;
import org.gillesdechasles.back.dto.LoginResponse;
import org.gillesdechasles.back.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

@RestController
@RequestMapping("api/auth")
@AllArgsConstructor
public class AuthController {

    private AdminService adminService;

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        try {
            LoginResponse loginResponse = adminService.login(request);

            // Créer un cookie avec le token
            Cookie cookie = new Cookie("authToken", loginResponse.getToken());
            cookie.setHttpOnly(true);        // Empêche l'accès JavaScript
            cookie.setSecure(false);         // À mettre à true en HTTPS (production)
            cookie.setPath("/");             // Disponible sur tout le domaine
            cookie.setMaxAge(86400);         // 24 heures
            cookie.setAttribute("SameSite", "Lax");

            response.addCookie(cookie);

            // Retourner une réponse sans le token
            return ResponseEntity.ok("Logged in successfully !");
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
    }

    @PostMapping("logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        // Créer un cookie vide pour supprimer le token
        Cookie cookie = new Cookie("authToken", "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);  // Expire immédiatement
        cookie.setAttribute("SameSite", "Lax");

        response.addCookie(cookie);

        return ResponseEntity.ok("Logged out successfully");
    }
}
