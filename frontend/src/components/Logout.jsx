import { useEffect } from "react"
import { useTokenContext } from "../context/TokenContext"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const {removeToken} = useTokenContext()
    const navigate = useNavigate()
    useEffect(()=>{
        removeToken()
        navigate('/login')
    })
  return null
}

export default Logout