import { useEffect, useState } from "react";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import FloatIn from "../components/FloatIn";
import InfoCard from "../components/InfoCard";
import { formatClusterData, downloadCSV, getErrorMessage } from "../utils.js";
import {
    loadingContainerStyle,
    segmentLoadingMessageStyle,
    segmentOverlayStyle,
    pageStyle,
    centeredSectionHeaderStyle,
    smallLabelStyle,
    gradientTitleStyle,
    sectionDescriptionStyle,
    gridStyle,
    segmentActionsWrapperStyle,
    actionContainer,
    segmentDownloadGroupStyle,
    secondaryButtonStyle,
    primaryButtonStyle,
} from "../styles.js";

const messages = [
    "Initializing clustering model...",
    "Calculating distance metrics...",
    "Optimizing segment boundaries...",
    "Evaluating intra-cluster similarity...",
    "Finalizing customer segments...",
];

export default function Segment(props) {
    const [messageIndex, setMessageIndex] = useState(0);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [error, setError] = useState("");

    const { file, k, setClusterInfo, clusterInfo } = props;
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (!file || !k) {
                setError("Missing dataset or cluster count. Complete Analyze before Segment.");
                return;
            }

            try {
                setError("");
                const formData = new FormData();
                formData.append("dataset", file);
                formData.append("k", k);

                const response = await axios.post("http:clustrix-production.up.railway.app/segment", formData);

                if (response.status === 200) {
                    setClusterInfo(response.data.clusterInfo);
                    setCustomerInfo(response.data.customerCluster);
                }
            } catch (err) {
                setError(getErrorMessage(err, "Failed to generate segments."));
            }
        }

        fetchData();
    }, []);

    if (!clusterInfo) {
        if (error) {
            return (
                <Box sx={loadingContainerStyle}>
                    <p style={{ ...segmentLoadingMessageStyle, color: "#fca5a5", marginTop: 0 }}>
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
                        key={messageIndex}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        style={segmentLoadingMessageStyle}
                    >
                        {messages[messageIndex]}
                    </motion.p>
                </AnimatePresence>
            </Box>
        );
    }

    const clustersF = clusterInfo.map((obj) => formatClusterData(obj));

    return (
        <>
            <div style={segmentOverlayStyle} />

            <Box sx={pageStyle}>
                <Box sx={centeredSectionHeaderStyle}>
                    <p style={smallLabelStyle}>Segmentation Results</p>
                    <h1 style={gradientTitleStyle}>Customer Segments Overview</h1>
                    <p style={sectionDescriptionStyle}>
                        Review the behavioral clusters identified from your transactional data. Download
                        results or generate AI-driven strategic insights.
                    </p>
                </Box>

                <Box sx={gridStyle}>
                    {clustersF.map((cluster, index) => (
                        <Box key={index}>
                            <FloatIn delay={index * 0.15}>
                                <InfoCard title={`Cluster ${index + 1}`} formattedData={cluster} />
                            </FloatIn>
                        </Box>
                    ))}
                </Box>

                <Box sx={segmentActionsWrapperStyle}>
                    <FloatIn delay={clustersF.length * 0.15 + 0.2}>
                        <Box sx={actionContainer}>
                            <Box sx={segmentDownloadGroupStyle}>
                                <Button
                                    sx={secondaryButtonStyle}
                                    onClick={() => downloadCSV(customerInfo, "Customer_Clusters.csv")}
                                >
                                    Download Customer → Cluster CSV
                                </Button>

                                <Button
                                    sx={secondaryButtonStyle}
                                    onClick={() => downloadCSV(clustersF, "Cluster_Summary.csv")}
                                >
                                    Download Cluster Summary CSV
                                </Button>
                            </Box>

                            <Button sx={primaryButtonStyle} onClick={() => navigate("/insights")}>
                                Generate Business Insights
                            </Button>
                        </Box>
                    </FloatIn>
                </Box>
            </Box>
        </>
    );
}
