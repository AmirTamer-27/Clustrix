import Background from "./components/background"
import UploadButton from "./components/UploadButton"
import { useState } from "react"
import Home from "./Pages/Home"
function App() {
  const [file , setFile] = useState({})
  const [k , setK]  = useState(0)
  return (
    <>
     <Home setFile = {setFile}/>
    </>
  )
}

export default App
