package com.deva.springdemo.student;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getStudents() {
       return studentRepository.findAll();
    }

    public Optional<Student> getStudent(Long id) {
        return studentRepository.findById(id);
    }

    public void addNewStudent(Student student) {
        Optional<Student> studentByEmail = studentRepository.findStudentByEmail(student.getEmail());
        if (studentByEmail.isPresent()) {
            throw new IllegalStateException("Student with email " + studentByEmail.get().getEmail() + " already exists");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(long studentId) {
     boolean exists = studentRepository.existsById(studentId);
     if (!exists) {
         throw new IllegalStateException("Student with id " + studentId + " does not exist");
     }
        studentRepository.deleteById(studentId);
    }

    @Transactional
    public void updateStudent(Long studentId, String name, String email) {
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new IllegalStateException("Student with id " + studentId + " does not exist"));

        if(name != null && !email.isEmpty() && !Objects.equals(student.getName(), name)) {
            student.setName(name);

        }
        if(email != null && !email.isEmpty() && !Objects.equals(student.getEmail(), email)) {

            Optional<Student> studentByEmail = studentRepository.findStudentByEmail(email);

            if (studentByEmail.isPresent()) {
                throw new IllegalStateException("Student with email " + email + " already exists");
            }

            student.setEmail(email);

        }
    }

}
