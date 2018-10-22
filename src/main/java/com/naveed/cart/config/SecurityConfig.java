package com.naveed.cart.config;
import com.naveed.cart.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.*;

@Configuration
@EnableWebSecurity

public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
            UserService userService;

    @Bean
    public PasswordEncoder passwordEncoder() {

//        PasswordEncoder pswdencoder = new PasswordEncoder() {
//            @Override
//            public String encode(CharSequence charSequence) {
//                return charSequence.toString();
//            }
//
//            @Override
//            public boolean matches(CharSequence charSequence, String s) {
//                if (charSequence.equals(s)){
//                    return true;
//                }
//                else {return false;}
//            }
//        };
//        return pswdencoder;
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService);
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }



    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests()
                .antMatchers("/mycart.html/**","/MyOrders.html/**","Details.html","index.html").authenticated()
                .antMatchers("/EditProduct.html/**","AddProduct.html","usersList.html").access("hasRole('ADMIN')")
                .anyRequest().permitAll()
                .and()//defaultSuccessUrl("/index1.html").permitAll();
              .formLogin().
                loginPage("/login.html").loginProcessingUrl("/security_login").usernameParameter("username").
                passwordParameter("password").defaultSuccessUrl("/index.html")
        .and()
        .logout()
        .logoutUrl("/logout").logoutSuccessUrl("/index.html");

    }

}