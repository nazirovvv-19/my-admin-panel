import axios from 'axios'
const api =axios.create({
    baseURL:'https://nt.softly.uz'
})

api.interceptors.response.use(null, (e)=>{
    if (e.status===401) {
        import('../store/store').then(res=>{
            const useGlobalStore = res.default
            const state = useGlobalStore.getState()
            state.logOut()
        })
    }
})
export default api