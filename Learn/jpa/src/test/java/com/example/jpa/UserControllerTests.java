package com.example.jpa;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

// @RunWith(SpringRunner.class)
@WebMvcTest(UserControllerTests.class)
public class UserControllerTests {
       @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testRegisterUser_Success() throws Exception {
        User user = new User("John", "Doe", "johndoe", "john@example.com", "password", "1234567890");
        String encryptedPassword = "hashedPassword"; // Replace with actual bcrypt hash of "password"
        user.setPassword(encryptedPassword); // Set hashed password

        Mockito.when(userService.registerUser(Mockito.any(User.class))).thenReturn(user);

        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", Matchers.is(user.getUsername())))
                .andExpect(jsonPath("$.firstName", Matchers.is(user.getFirstName())))
                .andExpect(jsonPath("$.lastName", Matchers.is(user.getLastName())))
                .andExpect(jsonPath("$.email", Matchers.is(user.getEmail())))
                .andExpect(jsonPath("$.phone", Matchers.is(user.getPhone())));
    }

    @Test
    public void testRegisterUser_Failure() throws Exception {
        User user = new User("John", "Doe", "existingUsername", "john@example.com", "password", "1234567890");
        String encryptedPassword = "hashedPassword"; // Replace with actual bcrypt hash of "password"
        user.setPassword(encryptedPassword); // Set hashed password

        Mockito.when(userService.registerUser(Mockito.any(User.class))).thenThrow(new UsernameAlreadyExistsException());

        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testLogin_Success() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest("johndoe", "password");
        String jwtToken = "dummyJWTToken";
        Mockito.when(userService.login(Mockito.any(AuthenticationRequest.class))).thenReturn(jwtToken);

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", Matchers.is(jwtToken)));
    }

    @Test
    public void testLogin_Failure() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest("invalidUsername", "password");
        Mockito.when(userService.login(Mockito.any(AuthenticationRequest.class))).thenThrow(new AuthenticationException("Invalid credentials"));

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testRegisterUser_InvalidInput() throws Exception {
        User user = new User(null, "Doe", "johndoe", "john@example.com", "password", "1234567890");

        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testRegisterUser_NullUsername() throws Exception {
        User user = new User("John", "Doe", null, "john@example.com", "password", "1234567890");

        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testRegisterUser_NullPassword() throws Exception {
        User user = new User("John", "Doe", "johndoe", "john@example.com", null, "1234567890");

        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testRegisterUser_InvalidEmail() throws Exception {
        User user = new User("John", "Doe", "johndoe", "invalidemail", "password", "1234567890");

        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isBadRequest());
    }
    @Test
    public void testRegisterUser_BlankFields() throws Exception {
        User user = new User("", "", "", "", "", "");

        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testRegisterUser_ExistingEmail() throws Exception {
        User user = new User("John", "Doe", "johndoe", "john@example.com", "password", "1234567890");
        Mockito.when(userService.registerUser(Mockito.any(User.class))).thenThrow(new EmailAlreadyExistsException());

        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isConflict());
    }

    @Test
    public void testRegisterUser_InvalidPhone() throws Exception {
        User user = new User("John", "Doe", "johndoe", "john@example.com", "password", "invalidPhone");

        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testLogin_InvalidCredentials() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest("johndoe", "wrongpassword");
        Mockito.when(userService.login(Mockito.any(AuthenticationRequest.class))).thenThrow(new AuthenticationException("Invalid credentials"));

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testLogin_NullCredentials() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest(null, null);

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testRegisterUser_ValidInput() throws Exception {
        User user = new User("John", "Doe", "johndoe", "john@example.com", "password", "1234567890");
        String encryptedPassword = "hashedPassword"; // Replace with actual bcrypt hash of "password"
        user.setPassword(encryptedPassword); // Set hashed password

        Mockito.when(userService.registerUser(Mockito.any(User.class))).thenReturn(user);

        mockMvc.perform(post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", Matchers.is(user.getUsername())))
                .andExpect(jsonPath("$.firstName", Matchers.is(user.getFirstName())))
                .andExpect(jsonPath("$.lastName", Matchers.is(user.getLastName())))
                .andExpect(jsonPath("$.email", Matchers.is(user.getEmail())))
                .andExpect(jsonPath("$.phone", Matchers.is(user.getPhone())));
    }

    @Test
    public void testLogin_ValidCredentials() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest("johndoe", "password");
        String jwtToken = "dummyJWTToken";
        Mockito.when(userService.login(Mockito.any(AuthenticationRequest.class))).thenReturn(jwtToken);

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", Matchers.is(jwtToken)));
    }

    @Test
    public void testLogin_NullUsername() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest(null, "password");

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testLogin_NullPassword() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest("johndoe", null);

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testLogin_EmptyCredentials() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest("", "");

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

}
