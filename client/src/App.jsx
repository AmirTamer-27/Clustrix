import Background from "./components/Background"
import { useEffect, useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom";
import Analyze from "./Pages/Analyze";
import Segment from "./Pages/Segment";
import Insights from "./Pages/Inisights";

import Home from "./Pages/Home"

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function RouteErrorMessage({ title, message }) {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(10, 14, 25, 0.75)",
          color: "rgba(255,255,255,0.9)",
          padding: "24px",
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          textAlign: "center",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: "8px" }}>{title}</h2>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.72)" }}>{message}</p>
      </div>
    </div>
  );
}

function App() {
  const [file, setFile] = useState(null)
  const [k, setK] = useState(0)
  const [clusterInfo, setClusterInfo] = useState(null)
  return (
    <>
      <ScrollToTop />
      <Background />
      <Routes>
        <Route path="/" element={<Home setFile={setFile} />} />
        <Route
          path="/analyze"
          element={file
            ? <Analyze file={file} k={k} setK={setK} />
            : <RouteErrorMessage title="Missing Dataset" message="Upload a dataset on Home before opening Analyze." />}
        />
        <Route
          path="/segment"
          element={file && k
            ? <Segment file={file} k={k} setClusterInfo={setClusterInfo} clusterInfo={clusterInfo} />
            : <RouteErrorMessage title="Missing Analysis Inputs" message="Analyze your dataset first, then continue to Segment." />}
        />
        <Route
          path="/insights"
          element={clusterInfo
            ? <Insights clusterInfo={clusterInfo} />
            : <RouteErrorMessage title="Missing Segmentation Results" message="Generate segments before opening Insights." />}
        />
      </Routes>
    </>
  )
}

export default App
