package HarmonyRentals.Config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers(
                        "/auth/**",
                        "/home/**",
                        "/producto/random",
                        "/producto/byCategoria/{id}",
                        "/producto/{id}",
                        "/categoria/**",
                        "/usuario/**",
                        "/producto/**",
                        "/s3/**",
                        "/s3/upload",
                        "/s3/list",
                        "s3/download",
                        "/favoritos/**",
                        "/alquiler/**",
                        "/verificar/**",
                        "/puntuacion/**"
                        )
                .permitAll()
                .requestMatchers("/verificar/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

             return http.build();
    }
}