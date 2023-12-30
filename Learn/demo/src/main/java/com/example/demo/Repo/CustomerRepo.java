package com.example.demo.Repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.Model.Customer;

public interface CustomerRepo extends CrudRepository<Customer, Long> {

    List<Customer> findByLastName(String lastName);

    Customer findById(long id);

}
