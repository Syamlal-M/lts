package com.ibsplc.apiserviceleaveforcasting.repository;

import com.ibsplc.apiserviceleaveforcasting.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {


    public Optional<User> findByUserIdAndPassword(String userId, String password);

    public Optional<User> findByUsername(String username);

    public  Optional<User> findByEmailId(String emailId);

    public  Optional<User> findByUserId(String emailId);



}
