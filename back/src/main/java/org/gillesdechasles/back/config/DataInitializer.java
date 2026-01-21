package org.gillesdechasles.back.config;

import lombok.AllArgsConstructor;
import org.gillesdechasles.back.entity.Admin;
import org.gillesdechasles.back.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private AdminRepository adminRepository;
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String ... args) throws Exception {
        if (adminRepository.findByUsername("admin").isEmpty()) {
            Admin admin = Admin.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .build();
            adminRepository.save(admin);
            System.out.println("Default admin account created with username: 'admin' and password: 'admin123'");
        }
    }
}
