import { useContext } from "react"
import { Mycontext } from "../store/context"

function ProfilContext() {
    const context = useContext(Mycontext)
  return (
    <div>ProfilContext
        {context}
    </div>
  )
}

export default ProfilContext