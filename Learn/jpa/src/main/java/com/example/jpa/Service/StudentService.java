package com.example.jpa.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import com.example.jpa.Student.Student;

@Service
public class StudentService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public AtomicLong counter = new AtomicLong();

    public List<Student> createStudents() {

        // jdbcTemplate.execute("insert into student(id,name,email,age)
        // values(1,'arun','arun36824@gmail.com',22)");
        List<Student> students = List.of(
                new Student((Long) counter.getAndIncrement(), "Arun", "arun36824@gmail.com", 22),
                new Student((Long) counter.getAndIncrement(), "Arun1", "arun36824@gmail.com1", 23));

        insertStudents(students);

        return students;
    }

    public void insertStudents(List<Student> students) {
        for (Student student : students) {
            String insertQuery = "insert into student(id,name, email, age) values (?,?, ?, ?)";
            jdbcTemplate.update(
                    insertQuery,
                    student.getId(),
                    student.getName(),
                    student.getEmail(),
                    student.getAge());
        }

    }
}