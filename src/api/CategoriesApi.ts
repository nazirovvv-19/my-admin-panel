import api from "./Api"

const CategoriesApi ={
    getAll:()=>{
      return  api('/api/categories?limit=10&page=1&order=ASC')
    },
    delete:(id:number)=>{
        return api.delete(`/api/categories/${id}`)
    }
}

export default CategoriesApi