package org.gillesdechasles.back.config;

import org.gillesdechasles.back.entity.User;
import org.gillesdechasles.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class StartupUserSeeder {

    @Bean
    CommandLineRunner seedAdminUser(
            UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder,
            @Value("${ADMIN_USERNAME}") String adminUsername,
            @Value("${ADMIN_PASSWORD}") String adminPassword
    ) {
        return args -> {
            if (!userRepository.existsByUsername(adminUsername)) {
                User admin = User.builder()
                        .username(adminUsername)
                        .password(passwordEncoder.encode(adminPassword))
                        .role("ADMIN")
                        .build();

                userRepository.save(admin);
            }
        };
    }
}
