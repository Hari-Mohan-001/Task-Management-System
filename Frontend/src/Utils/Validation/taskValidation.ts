export const validateName = (name: string ):string|null=>{
    if(!name){
      return "Name is required"
    }else{
      return null
    }
  }
  
  export const validateDescription = (description: string ):string|null=>{
      if(!description){
        return "Descrption is required"
      }else{
        return null
      }
    }
  export const validateDate = (date: string ):string|null=>{
      if(!date){
        return "Date is required"
      }else{
        return null
      }
    }
  