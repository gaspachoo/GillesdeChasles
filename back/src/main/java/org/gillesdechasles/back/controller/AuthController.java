package org.gillesdechasles.back.controller;

import lombok.AllArgsConstructor;
import org.gillesdechasles.back.dto.LoginRequest;
import org.gillesdechasles.back.dto.LoginResponse;
import org.gillesdechasles.back.dto.MessageResponse;
import org.gillesdechasles.back.dto.AuthStatusResponse;
import org.gillesdechasles.back.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

@RestController
@RequestMapping("api/auth")
@AllArgsConstructor
public class AuthController {

    private AdminService adminService;

    @PostMapping("login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
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

            // Retourner une réponse JSON valide
            return ResponseEntity.ok(loginResponse);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
    }

    @PostMapping("logout")
    public ResponseEntity<MessageResponse> logout(HttpServletResponse response) {
        // Créer un cookie vide pour supprimer le token
        Cookie cookie = new Cookie("authToken", "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);  // Expire immédiatement
        cookie.setAttribute("SameSite", "Lax");

        response.addCookie(cookie);

        return ResponseEntity.ok(new MessageResponse("Logged out successfully"));
    }

    @GetMapping("status")
    public ResponseEntity<AuthStatusResponse> status(HttpServletRequest request) {
        // Extraire le token du cookie
        String token = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("authToken".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        // Vérifier si le token est valide
        boolean isAuthenticated = token != null && !token.isEmpty();
        return ResponseEntity.ok(new AuthStatusResponse(isAuthenticated));
    }
}
