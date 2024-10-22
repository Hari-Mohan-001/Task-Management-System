
export const validateName = (name: string ):string|null=>{
    if(!name){
      return "Name is required"
    }else{
      return null
    }
  }
  
  export const ValidateEmail =(email:string):string|null=>{
     if(!email){
      return "Email is required"
     }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
         return "Enter a valid email"
     }
     return null
  }
  
  export const validateMobile =(mobile: string):string|null=>{
      if (!mobile) {
          return "Mobile number is required";
        } else if (!mobile.startsWith("+91")) {
          return "Mobile number must start with +91";
        } else if (!/^\+91\d{10}$/.test(mobile)) {
          return "Mobile number must be valid and contain 10 digits after +91";
        }
        return null
  }
  
  
  
  export const validatePassword = (password:string):string|null=>{
      if(!password){
          return "Password is required"
      }else if(password.length < 6 ||
          !/\d/.test(password) ||
          !/[!@#$%^&*(),.?":{}|<>]/.test(password)){
              return "Password must have atlest 6 characters & must have one number and special character"
      }
      return null
  }
  
  export const validateConfirmPasswordAndCompare =(Password:string ,confirmPassword:string):string|null=>{
     if(!confirmPassword){
      return "confirm password is required"
     }else if(Password!== confirmPassword){
      return "Password does not match"
     }
     return null
  }
  