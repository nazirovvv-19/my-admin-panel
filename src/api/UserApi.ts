import { UserType } from "../types"
import api from "./Api"

const UserApi={
    getAll:()=>{
        return api.get("/api/users?limit=10&page=1&order=ASC")
    },
    delete:(id:number)=>{
        return api.delete(`/api/users/${id}`)
    },
    create:(values:UserType)=>{
        console.log(values,'value');
        
        return api.post(
            `https://nt.softly.uz/api/users`,
            { 
              name: values.name,
              email: values.email,
              password: values.password,
              image: values.image,
              role: values.role,
              phone:values.phone
            },
          
          )
    },
    update:(id:number,values:any)=>{
        return  api.patch(`/api/users/${id}`,values)
    }
    
}

export default UserApi