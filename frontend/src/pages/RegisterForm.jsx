import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const validationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleGoogleSuccess = (response) => {
    console.log("Google login success:", response);
  };

  const handleGoogleFailure = (error) => {
    console.log("Google login failure:", error);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#BCABA4",
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            backgroundColor: "#F0ECEA",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}
          >
            <Avatar
              sx={{
                marginRight: "0.5rem",
                backgroundColor: "#6D4D42",
              }}
            >
              <HowToRegIcon />
            </Avatar>
            <Typography
              variant="h5"
              color="#4D342F"
              fontWeight="bold"
            >
              Sign in
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
          <TextField
  fullWidth
  id="email"
  name="email"
  label="Email"
  value={formik.values.email}
  onChange={formik.handleChange}
  error={formik.touched.email && Boolean(formik.errors.email)}
  helperText={formik.touched.email && formik.errors.email}
  margin="normal"
  InputProps={{
    sx: {
      height: 50,
      backgroundColor: "#E7DACD",
      borderRadius: "8px",
      color: "#87431D",
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#87431D",
      },
    },
  }}
  InputLabelProps={{
    sx: {
      color: "#87431D",
      "&.Mui-focused": {
        color: "#87431D",
      },
    },
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      "& fieldset": {
        borderColor: "#87431D",
      },
      "&:hover fieldset": {
        borderColor: "#87431D",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#87431D",
      },
    },
  }}
/>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
              InputProps={{
                sx: {
                  height: 50,
                  backgroundColor: "#E7DACD",
                  borderRadius: "8px",
                  color: "#87431D",
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#87431D",
      },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: "#87431D" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                sx: {
                  color: "#87431D",
                  "&.Mui-focused": {
                    color: "#87431D",
                  },
                },
              }}
              sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      "& fieldset": {
        borderColor: "#87431D",
      },
      "&:hover fieldset": {
        borderColor: "#87431D",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#87431D",
      },
    },
  }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                height: 50,
                mt: 2,
                borderRadius: "8px",
                fontWeight: "bold",
                backgroundColor: "#6D4D42",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#4D342F",
                },
              }}
            >
              Sign in
            </Button>
          </form>
          <Typography
            variant="body2"
            color="#87431D"
            mt={2}
            mb={2}
          >
            or
          </Typography>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            render={(renderProps) => (
              <Button
                fullWidth
                startIcon={<GoogleIcon />}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                sx={{
                  height: 50,
                  borderRadius: "10px",
                  fontWeight: "bold",
                  textTransform: "none",
                  backgroundColor: "#FFE1CC",
                  color: "#87431D",
                  border: "1px solid #6D4D42",
                  "&:hover": {
                    backgroundColor: "#FFCC99",
                  },
                }}
              >
                Sign in with Google
              </Button>
            )}
          />
        </Box>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default RegisterForm;

