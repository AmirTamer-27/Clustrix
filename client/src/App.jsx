import Background from "./components/background"
import UploadButton from "./components/UploadButton"
import { useState } from "react"
import { Routes, Route } from "react-router-dom";
import Analyze from "./Pages/Analyze";
import Segment from "./Pages/Segment";

import Home from "./Pages/Home"
function App() {
  const [file, setFile] = useState(null)
  const [k, setK] = useState(0)
  return (
    <>
      <Background />
      <Routes>
        <Route path="/" element={<Home setFile={setFile} />} />
        <Route path="/analyze" element={<Analyze file={file} k={k} setK={setK} />} />
        <Route path="/segment" element={<Segment file={file} k={k} />} />
      </Routes>
    </>
  )
}

export default App
