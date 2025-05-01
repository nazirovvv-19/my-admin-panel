import { useState } from 'react'
import { Mycontext } from '../store/context'
import { Button } from 'antd'
import ProfilContext from './ProfilContext'

function Contexthook() {
    const [str, setstr] = useState(10)
  return (
  <Mycontext.Provider value={str}>
    <div>
        asosiy
        <Button onClick={()=>setstr(str+1)}>{str}</Button>
        <ProfilContext/>

    </div>
  </Mycontext.Provider>
  )
}


export default Contexthook