package com.naveed.cart.Controller;

import com.naveed.cart.Model.User;
import com.naveed.cart.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

import static java.util.Objects.isNull;

@Controller
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping("/saveuserdetails")
    @ResponseBody
    public int saveUserDetails(@RequestParam("username") String username,@RequestParam("password") String password, @RequestParam("email") String email,@RequestParam("phone") String phone,@RequestParam("address") String address){
        String role = "USER";
        User user = new User( username, password, email, phone, address, role);
        userService.saveUser(user);
        return user.getUserId();
    }

    @PostMapping("/getprofile")
    public @ResponseBody User getUserProfiles(){
       int userid = userService.CurrentUser();
        return userService.getUserProfiles(userid);
    }
    @PostMapping("/passwordChangeByPhone")
    public @ResponseBody User getUserByPhoneNumber(@RequestParam("phone") String ph,@RequestParam("password") String pass){
        User user = userService.findByPhoneNumber(ph);
        userService.saveUserForPasswordChange(user, pass);
        return user;
    }
    @PostMapping("/verifyByPhone")
    public @ResponseBody User verifyByPhoneNumber(@RequestParam("phone") String phone){
        User user = userService.findByPhoneNumber(phone);
    return user;
    }

    @PostMapping("/checkUser")
    public @ResponseBody String checkUser(){
      return userService.CurrentUserRole();

    }

    @PostMapping ("/editUserDetails")
        @ResponseBody
    public void updateProfiles(@RequestParam("address")String address ,@RequestParam("phone") String phone, @RequestParam("email") String email){
        int userid = userService.CurrentUser();
        User user = userService.getUserProfiles(userid);
        user.setPhone(phone);
        user.setAddress(address);
        user.setEmail(email);
        userService.saveUserWithoutPasswordEncryption(user);
    }

    @PostMapping("/fetchUsersList")
    @ResponseBody
    public List<User> usersList(){
        return userService.getUserList();
    }

}
