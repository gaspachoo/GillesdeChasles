package org.gillesdechasles.back;

import org.springframework.boot.SpringApplication;

public class TestBackApplication {

    static void main(String[] args) {
        SpringApplication.from(BackApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
