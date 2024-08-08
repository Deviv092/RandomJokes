package com.deva.springdemo.student;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class StudentConfig {

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository repository) {
        return args -> {
            Student dev = new Student(
                    1L,
                    "Dev",
                    "dvd@gmail.com",
                    LocalDate.of(1998, Month.FEBRUARY, 28)
            );
            Student ani = new Student(
                    2L,
                    "Ani",
                    "anix@gmail.com",
                    LocalDate.of(1999, Month.FEBRUARY, 28)
            );
        repository.saveAll(
                List.of(dev, ani)
        );
        };
    }

}
