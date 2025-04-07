import api from "./Api"

const BannersApi= {
    getAll:()=>{
        return api.get("/api/banners?limit=10&page=1&order=ASC")
    },
    delete:(id:number)=>{
        return api.delete(`/api/banners/${id}`)
    },
    create:(values:any)=>{
        return   api
        .post(`/api/banners`, {
          title: values.title,
          imageUrl:values.imageUrl,
          isActive:values.isActive
          
        }) 
    }
}
export default BannersApi
