package org.gillesdechasles.back.config;

import org.gillesdechasles.back.entity.Admin;
import org.gillesdechasles.back.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    public DataInitializer(AdminRepository adminRepository, BCryptPasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String ... args) throws Exception {
        if (adminRepository.findByUsername(adminUsername).isEmpty()) {
            Admin admin = Admin.builder()
                    .username(adminUsername)
                    .password(passwordEncoder.encode(adminPassword))
                    .build();
            adminRepository.save(admin);
            System.out.println("Admin account created with username: '" + adminUsername + "'");
        }
    }
}
