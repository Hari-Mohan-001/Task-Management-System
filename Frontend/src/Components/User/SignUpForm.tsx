import { Box, Button, TextField, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SignUpUserData } from "../../Interface/IUserData";
import { validateConfirmPasswordAndCompare, ValidateEmail, validateMobile, validateName, validatePassword } from "../../Utils/Validation/signUpValidation";
import { userApi } from "../../Api/userApi";
import { toast } from "react-toastify";
import { useUser} from "../../Context/userContext"



const SignUpForm = () => {
  const {user} = useUser()
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
     navigate('/dashboard')
    }
},[user])

  const [formData, setFormData] = useState<SignUpUserData>({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ signUpError: "" });

    const newErrors: { [key: string]: string } = {};

    newErrors.name = validateName(formData.name) || "";
    newErrors.email = ValidateEmail(formData.email) || "";
    newErrors.mobile = validateMobile(formData.mobile) || "";
    newErrors.password = validatePassword(formData.password) || "";
    newErrors.confirmPassword =
      validateConfirmPasswordAndCompare(
        formData.password as string,
        formData.confirmPassword as string
      ) || "";

    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key] === "") delete newErrors[key];
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const response = await userApi.signUpUser(formData)

    if(response.success){
      toast.success("SignUp successfull")
      navigate('/login')
    }else{
      toast.error(response.message || "Failed to register")
    }
  
  };

  return (
    <div className="w-full h-fit max-w-md p-8 bg-white shadow-xl rounded-lg mt-2">
      <h1 className="text-center text-2xl">Welcome to register page</h1>
      <form onSubmit={handleSubmit} className="mt-4 gap-5">
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Box>
            <Typography variant="inherit">Enter your name</Typography>
            <TextField
              id="name"
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(errors.name)}
              helperText={errors.name}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Enter your email id</Typography>
            <TextField
              id="email"
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Enter your mobile number</Typography>
            <TextField
              id="mobile"
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(errors.mobile)}
              helperText={errors.mobile}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Enter your Password</Typography>
            <TextField
              fullWidth
              id="password"
              type="password"
              variant="outlined"
              size="small"
              error={Boolean(errors.password)}
              helperText={errors.password}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Typography variant="inherit">Confirm your Password</Typography>
            <TextField
              fullWidth
              id="confirmPassword"
              type="password"
              variant="outlined"
              size="small"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              onChange={handleChange}
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button sx={{ width: "200px" }} type="submit" variant="contained">
              Register
            </Button>
          </Box>
        </Box>
      </form>
      {errors.signUpError && (
        <p className="text-red-700">{errors.signUpError}</p>
      )}
      <Divider>Or</Divider>
      <Typography>
        Already having an account ?{" "}
        <Link className="text-blue-700" to={"/login"}>
          login here
        </Link>{" "}
      </Typography>
    </div>
  );
};

export default SignUpForm;
