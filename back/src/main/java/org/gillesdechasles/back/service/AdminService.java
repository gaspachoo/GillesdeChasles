package org.gillesdechasles.back.service;

import lombok.AllArgsConstructor;
import org.gillesdechasles.back.dto.LoginRequest;
import org.gillesdechasles.back.dto.LoginResponse;
import org.gillesdechasles.back.entity.Admin;
import org.gillesdechasles.back.repository.AdminRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminService {

    private AdminRepository adminRepository;
    private JwtService jwtService;
    private BCryptPasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest request) {
        Admin admin = adminRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = jwtService.generateToken(admin.getUsername());
        return new LoginResponse(token);
    }
}
