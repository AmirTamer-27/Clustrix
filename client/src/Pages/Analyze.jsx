import { useEffect, useState } from "react";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { motion, AnimatePresence } from "framer-motion";
import { formatAnalyzeData, getErrorMessage } from "../utils.js";
import SegmentButton from "../components/SegmentButton.jsx";
import FloatIn from "../components/FloatIn.jsx";
import InfoCard from "../components/InfoCard.jsx";
import {
    loadingContainerStyle,
    loadingMessageStyle,
    analyzeOverlayStyle,
    sectionContainerStyle,
    sectionHeaderStyle,
    smallLabelStyle,
    gradientTitleStyle,
    sectionDescriptionStyle,
    innerWrapperStyle,
    analyzeLeftCardStyle,
    analyzeSliderSectionStyle,
    clusterSliderStyle,
    segmentButtonWrapperStyle,
    analyzeRightCardStyle,
} from "../styles.js";

export default function Analyze(props) {
    const messages = [
        "Validating dataset structure...",
        "Cleaning transactional records...",
        "Computing RFM metrics...",
        "Scaling customer features...",
        "Evaluating optimal cluster configuration...",
        "Finalizing analysis results...",
    ];

    const [index, setIndex] = useState(0);
    const [analyzedData, setAnalyzedData] = useState(null);
    const [error, setError] = useState("");

    const { file, k, setK } = props;

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (!file) {
                setError("No dataset found. Upload a file on Home, then try again.");
                return;
            }

            try {
                setError("");
                const formData = new FormData();
                formData.append("dataset", file);

                const response = await axios.post("https://clustrix-production.up.railway.app/analyze", formData);

                setAnalyzedData(response.data);
                setK(response.data.k);
            } catch (err) {
                setError(getErrorMessage(err, "Failed to analyze dataset."));
            }
        }

        fetchData();
    }, [file]);

    if (!analyzedData) {
        if (error) {
            return (
                <Box sx={loadingContainerStyle}>
                    <p style={{ ...loadingMessageStyle, color: "#fca5a5", marginTop: 0 }}>
                        {error}
                    </p>
                </Box>
            );
        }

        return (
            <Box sx={loadingContainerStyle}>
                <MoonLoader
                    color="#6366f1"
                    cssOverride={{
                        filter: `
                            drop-shadow(0 0 6px #6366f1)
                            drop-shadow(0 0 12px #6366f1)
                            drop-shadow(0 0 24px #6366f1)
                        `,
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
                        style={loadingMessageStyle}
                    >
                        {messages[index]}
                    </motion.p>
                </AnimatePresence>
            </Box>
        );
    }

    const analyzedDataF = formatAnalyzeData(analyzedData);

    return (
        <>
            <div style={analyzeOverlayStyle} />

            <Box sx={sectionContainerStyle}>
                <FloatIn delay={0.15}>
                    <Box sx={sectionHeaderStyle}>
                        <p style={smallLabelStyle}>Analysis Summary</p>
                        <h1 style={gradientTitleStyle}>RFM Behavioral Overview</h1>
                        <p style={sectionDescriptionStyle}>
                            Review key metrics derived from your transactional dataset and adjust cluster
                            granularity before segmentation.
                        </p>
                    </Box>
                </FloatIn>

                <Box sx={innerWrapperStyle}>
                    <Box sx={{ flex: 1, display: "flex", "& > *": { width: "100%", display: "flex" } }}>
                        <FloatIn delay={0.25}>
                            <Box sx={analyzeLeftCardStyle}>
                                <div>
                                    <p style={smallLabelStyle}>Adjust Cluster Count</p>
                                    <h1 style={gradientTitleStyle}>K = {k}</h1>
                                    <p style={sectionDescriptionStyle}>
                                        Increasing K creates more granular segments. Lower values produce broader
                                        customer groups.
                                    </p>
                                </div>

                                <div style={analyzeSliderSectionStyle}>
                                    <p style={smallLabelStyle}>Adjust Cluster Count</p>

                                    <Slider
                                        min={2}
                                        max={10}
                                        value={k}
                                        onChange={(e) => setK(e.target.value)}
                                        sx={clusterSliderStyle}
                                    />

                                    <Box sx={segmentButtonWrapperStyle}>
                                        <SegmentButton />
                                    </Box>
                                </div>
                            </Box>
                        </FloatIn>
                    </Box>

                    <Box sx={{ flex: 1, display: "flex", "& > *": { width: "100%", display: "flex" } }}>
                        <FloatIn delay={0.4}>
                            <Box sx={analyzeRightCardStyle}>
                                <InfoCard title="Analysis Result" formattedData={analyzedDataF} />
                            </Box>
                        </FloatIn>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
