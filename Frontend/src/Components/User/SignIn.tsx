import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SignInUserData} from "../../Interface/IUserData";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../../Api/userApi";
import { toast } from "react-toastify";
import { useUser} from "../../Context/userContext"


const SignIn = () => {
const {saveUser,user} = useUser()


    const [formData, setFormData] = useState<SignInUserData>({
        email: "",
        password: "",
      });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate()

    useEffect(()=>{
         if(user){
          navigate('/dashboard')
         }
    },[user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id]: "" });
        console.log(formData.email);
      };

    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const newErrors: { [key: string]: string } = {};
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Enter a valid email";
        }
        const password: string = formData.password;
        if (!password) {
          newErrors.password = "Password is required";
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
        const response =await userApi.signInUser(formData)
        if(response.success){
            toast.success("signed in successfully")
            console.log('sign',response.data);
            saveUser(response.data)
            navigate("/dashboard")
        }else{
            toast.error(response.message || 'failed to login')
        }
      };

  return (
    <div className="w-full max-w-md h-fit p-8 bg-white shadow-2xl rounded-lg">
      <h1 className="text-center text-2xl">Login Here</h1>
      <form onSubmit={handleSubmit} className="mt-4 gap-5">
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="inherit">Enter your email id</Typography>
            <TextField
              id="email"
              label="Email"
              fullWidth
              variant="outlined"
              size="small"
              value={formData.email}
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={handleChange}
            />
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="inherit">Enter your Password</Typography>
            <TextField
              fullWidth
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              value={formData.password}
              error={Boolean(errors.password)}
              helperText={errors.password}
              onChange={handleChange}
            />
          </Box>

          <Box display="flex" justifyContent="center">
            <Button type="submit" variant="contained" className="w-full">
              Login
            </Button>
          </Box>
          {errors.signInError && (
            <p className="text-red-600">{errors.signInError}</p>
          )}
        </Box>
      </form>
      <Divider>Or</Divider>
      <Typography>
        Don't have an account ?{" "}
        <Link className="text-blue-700" to={"/register"}>
          Register here
        </Link>{" "}
      </Typography>
    </div>
  );
}

export default SignIn