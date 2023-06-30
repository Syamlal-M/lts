package com.ibsplc.apiserviceleaveforcasting.config;

import com.ibsplc.apiserviceleaveforcasting.custom.exception.UnAuthorisedException;
import com.ibsplc.apiserviceleaveforcasting.entity.EmployeeInfoDto;
import com.ibsplc.apiserviceleaveforcasting.repository.EmployeeInfoRepository;
import com.ibsplc.apiserviceleaveforcasting.util.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    EmployeeInfoRepository employeeInfoRepository;

    List<String> ALLOW_URLS = Arrays.asList("/api/employee/login", "h2-console", "api-docs", "/swagger", "/api/employee/auth");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");
        String uuid = UUID.randomUUID().toString();
        MDC.put("trace_id", uuid);
        String username = null;
        String jwtToken = null;
        logger.info("Request URI method=" + request.getMethod());
        logger.info("Request URI uri=" + request.getRequestURI() +
                "queryString=" + request.getQueryString() + " method=" + request.getMethod());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication.getPrincipal() instanceof OidcUser) {
                OidcUser principal = ((OidcUser) authentication.getPrincipal());
                String email = principal.getUserInfo().getEmail();
                Optional<EmployeeInfoDto> employee = employeeInfoRepository.findByEmailId(email);
                Objects.requireNonNull(RequestContextHolder.getRequestAttributes()).setAttribute("employeeDetails", employee.get(), RequestAttributes.SCOPE_REQUEST);
            }
        Optional<EmployeeInfoDto> employee = employeeInfoRepository.findByEmailId("abilash@abilashcveeegmail.onmicrosoft.com");
        Objects.requireNonNull(RequestContextHolder.getRequestAttributes()).setAttribute("employeeDetails", employee.get(), RequestAttributes.SCOPE_REQUEST);
//            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//
//            if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
//
//                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
//                        userDetails, null, userDetails.getAuthorities());
//                usernamePasswordAuthenticationToken
//                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//            }
        try {
            chain.doFilter(request, response);
        } finally {
            MDC.clear();
            RequestContextHolder.resetRequestAttributes();
        }
//        }
    }

}
