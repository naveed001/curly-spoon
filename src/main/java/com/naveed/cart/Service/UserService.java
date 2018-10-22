package com.naveed.cart.Service;

import com.naveed.cart.Model.User;
import com.naveed.cart.DAO.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static java.util.Objects.isNull;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserDAO userDAO;
    @Autowired
    private PasswordEncoder passwordEncoder;


    public List<User> getUserList(){
        return userDAO.findAll();
    }

    public void saveUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDAO.save(user);
    }

    public void saveUserWithoutPasswordEncryption(User user){
        userDAO.save(user);
    }

    public void saveUserForPasswordChange(User user,String newpassword){
        user.setPassword(passwordEncoder.encode(newpassword));
        userDAO.save(user);
    }

    public User getUserByUsername(String username) {
        return userDAO.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = getUserByUsername(username);
        if (user == null){
            throw new UsernameNotFoundException("user" + username + "does not exist");
        }

        String role = user.getRole();

        List<GrantedAuthority> grantList = new ArrayList<>();

        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_"+role);

        grantList.add(authority);


        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                user.getPassword(), true, true,
                true, true, grantList);
    }

    public int CurrentUser(){
            Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
            String username = loggedInUser.getName();
        if(isNull(getUserByUsername(username)))
        {return 0;}
        else return getUserByUsername(username).getUserId();

    }
    public String CurrentUserRole(){
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        if(isNull(getUserByUsername(username)))
        {return null;}
        else return getUserByUsername(username).getRole();
    }
    public User findByPhoneNumber(String ph){
        return userDAO.findByPhone(ph);
    }

    public User getUserProfiles(int id){
        return userDAO.findByUserId(id);
    }
}

