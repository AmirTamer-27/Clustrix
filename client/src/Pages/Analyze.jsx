import { useEffect } from "react"
import { useState } from "react"
import axios from "axios";
import { MoonLoader } from "react-spinners";
import Box from "@mui/material/Box";
import InfoCard from "../components/InfoCard.jsx";
import Slider from "@mui/material/Slider";
import { motion, AnimatePresence } from "framer-motion";
import { formatAnalyzeData } from '../utils.js'
import SegmentButton from "../components/SegmentButton.jsx";
import FloatIn from "../components/FloatIn.jsx";
import {
    containerStyle,
    innerWrapperStyle,
    cardStyle,
    smallLabelStyle,
    gradientTitleStyle,
    descriptionStyle,
} from "../styles.js";

export default function Analyze(props) {
    const messages = [
        "Validating dataset structure...",
        "Cleaning transactional records...",
        "Computing RFM metrics...",
        "Scaling customer features...",
        "Evaluating optimal cluster configuration...",
        "Finalizing analysis results..."
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev =>
                prev < messages.length - 1 ? prev + 1 : prev
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    let analyzedDataF = null
    const textStyle = {
        fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
        fontSize: "13px",
        fontWeight: 400, // 500 can be slightly better for small text on dark backgrounds
        lineHeight: "1.6",
        color: "rgba(255,255,255,0.6)", // Slightly increased opacity for better legibility
        marginTop: 40,
        textAlign: "center", // Aligns text nicely within the constrained box
    };
    const { file, k, setK } = props
    const [analyzedData, setAnalyzedData] = useState(null)
    useEffect(() => {
        async function fetchData() {
            if (!file) return;
            const formData = new FormData()
            formData.append("dataset", file)
            const response = await axios.post('http://localhost:3000/analyze', formData)
            setAnalyzedData(response.data)
            // setAnalyzedData({
            //     k: 3,
            //     customerCount: 4338,
            //     cashInflow: 5978506.653999999,
            //     totalTransactions: 18532
            // })
            setK(response.data.k)
            // setK(3)
        }
        fetchData()
    }, [])


    if (!analyzedData) {
        return (
            <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center' }}>
                <MoonLoader
                    color="#6366f1"
                    cssOverride={{
                        filter: `
      drop-shadow(0 0 6px #6366f1)
      drop-shadow(0 0 12px #6366f1)
      drop-shadow(0 0 24px #6366f1)
    `
                    }}
                    size={40}
                />
                <AnimatePresence mode="wait">
                    <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            marginTop: 30,
                            fontSize: "14px",
                            color: "rgba(255,255,255,0.7)",
                            fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`
                        }}
                    >
                        {messages[index]}
                    </motion.p>
                </AnimatePresence>
            </Box>
        )
    }
    else {
        analyzedDataF = formatAnalyzeData(analyzedData)
        return (
            <>

                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0, 0, 0, 0.1)"
                }} />
                <Box sx={containerStyle}>

                    <Box sx={innerWrapperStyle}>
                        <FloatIn delay={0.2}>
                            {/* LEFT */}
                            <Box
                                sx={{
                                    ...cardStyle,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}
                            >

                                <div>
                                    <p style={smallLabelStyle}>Adjust Cluster Count</p>
                                    <h1 style={gradientTitleStyle}>K = {k}</h1>
                                    <p style={descriptionStyle}>
                                        Increasing K creates more granular segments. Lower values produce broader customer groups.
                                    </p>
                                </div>

                                <div style={{ marginTop: "50px" }}>
                                    <p style={smallLabelStyle}>Adjust Cluster Count</p>

                                    <Slider
                                        min={2}
                                        max={10}
                                        value={k}
                                        onChange={(e) => setK(e.target.value)}
                                        sx={{
                                            color: "#6366f1",
                                            height: 6,
                                            "& .MuiSlider-thumb": {
                                                width: 18,
                                                height: 18,
                                                boxShadow: "0 0 10px #6366f1"
                                            },
                                            "& .MuiSlider-track": {
                                                border: "none"
                                            }
                                        }}
                                    />

                                    {/* Button aligned right */}
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}>
                                        <SegmentButton />
                                    </Box>
                                </div>

                            </Box>
                        </FloatIn>


                        {/* RIGHT */}
                        <FloatIn delay={0.5}>
                            <Box sx={{ ...cardStyle, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <InfoCard title="Analysis Result" formattedData={analyzedDataF} />
                            </Box>
                        </FloatIn>

                    </Box>
                </Box>
            </>
        )
    }
}