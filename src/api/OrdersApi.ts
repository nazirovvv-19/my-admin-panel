import api from "./Api"

const OrdersApi={
    getAll:()=>{
        return api.get("/api/orders?order=ASC")
    },
    delete:(id:number)=>{
        return api.delete(`/api/orders/${id}`)
    }
}
export default OrdersApi