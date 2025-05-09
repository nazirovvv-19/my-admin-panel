import { Product } from "../types"
import api from "./Api"

const ProductApi = {
    getOne:(id:number)=>{
        return api.get('/api/product/'+id)

    },
    getAll:(page=1,limit=10)=>{
        return api.get(`/api/products?limit=${limit}&page=${page}&order=ASC`)
    },
    update:(id:number , values:any)=>{
        return api.patch(`/api/products/${id}`,values)
    },
    delete:(id:number)=>{
        return api.delete(`/api/products/${id}`)
    },
    create:(values:Product)=>{
        return api.post(`/api/products`, {
                name: values.name,
                stock: Number(values.stock),
                description: values.description,
                price: Number(values.price),
                imageUrl: values.imageUrl,
                categoryId: Number(values.categoryId),
              })
    }
}
export default ProductApi