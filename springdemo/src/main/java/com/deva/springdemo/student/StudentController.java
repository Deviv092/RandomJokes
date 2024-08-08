package com.deva.springdemo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/student")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getStudents() {
        return studentService.getStudents();
    }

    @GetMapping(path = "{id}")
    public Optional<Student> getStudent(@PathVariable("id") Long id) {
        return studentService.getStudent(id);
    }

    @PostMapping
    public Student registerStudent(@RequestBody Student student) {
        studentService.addNewStudent(student);
        return student;
    }

    @DeleteMapping(path = "{studentId}")
    public String  deleteStudent(@PathVariable("studentId") long studentId) {
       studentService.deleteStudent(studentId);
       return "Deleted student with id = " + studentId;
    }

    @PutMapping(path = "{studentId}")
    public String updateStudent(@PathVariable("studentId") Long studentId,
                                 @RequestParam(required = false) String name,
                                 @RequestParam(required = false) String email) {

        studentService.updateStudent(studentId,name,email);

        return "Updated student with id = " + studentId;
    }

}
