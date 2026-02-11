import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InfoCard from "../components/InfoCard";
import FloatIn from "../components/FloatIn";
import { useEffect, useState } from "react";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import { formatClusterData, downloadCSV } from "../utils.js";
import { motion, AnimatePresence } from "framer-motion";

import {
    pageStyle,
    gridStyle,
    actionContainer,
    secondaryButtonStyle,
    primaryButtonStyle,
} from "../styles.js";

const messages = [
    "Initializing clustering model...",
    "Calculating distance metrics...",
    "Optimizing segment boundaries...",
    "Evaluating intra-cluster similarity...",
    "Finalizing customer segments..."
];

export default function Segment(props) {

    const [messageIndex, setMessageIndex] = useState(0);
    const [clusterData, setClusterData] = useState(null);
    const [customerInfo, setCustomerInfo] = useState(null);

    const { file, k } = props;

    const textStyle = {
        fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
        fontSize: "13px",
        fontWeight: 400,
        lineHeight: "1.6",
        color: "rgba(255,255,255,0.6)",
        marginTop: 40,
        textAlign: "center",
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex(prev =>
                prev < messages.length - 1 ? prev + 1 : prev
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (!file || !k) return;

            const formData = new FormData();
            formData.append("dataset", file);
            formData.append("k", k);

            const response = await axios.post(
                "http://localhost:3000/segment",
                formData
            );

            if (response.status === 200) {
                setClusterData(response.data.clusterInfo);
                setCustomerInfo(response.data.customerCluster);
            }
        }

        fetchData();
    }, []);

    if (!clusterData) {
        return (
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "100vh",
                    justifyContent: "center",
                }}
            >
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
                        style={textStyle}
                    >
                        {messages[messageIndex]}
                    </motion.p>
                </AnimatePresence>
            </Box>
        );
    }

    const clustersF = clusterData.map((obj) =>
        formatClusterData(obj)
    );

    return (
        <>
            <div
                style={{
                    height: "100vh",
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0, 0, 0, 0.2)",
                }}
            />

            <Box sx={pageStyle}>

                {/* Cluster Cards */}
                <Box sx={gridStyle}>
                    {clustersF.map((cluster, index) => (
                        <Box key={index}>
                            <FloatIn delay={index * 0.15}>
                                <InfoCard
                                    title={`Cluster ${index + 1}`}
                                    formattedData={cluster}
                                />
                            </FloatIn>
                        </Box>
                    ))}
                </Box>

                {/* Action Buttons */}
                <Box sx={{ marginTop: "40px" }}>
                    <FloatIn delay={clustersF.length * 0.15 + 0.2}>
                        <Box sx={actionContainer}>

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: "15px",
                                    flexWrap: "wrap",
                                }}
                            >
                                <Button
                                    sx={secondaryButtonStyle}
                                    onClick={() =>
                                        downloadCSV(
                                            customerInfo,
                                            "Customer_Clusters.csv"
                                        )
                                    }
                                >
                                    Download Customer → Cluster CSV
                                </Button>

                                <Button
                                    sx={secondaryButtonStyle}
                                    onClick={() =>
                                        downloadCSV(
                                            clustersF,
                                            "Cluster_Summary.csv"
                                        )
                                    }
                                >
                                    Download Cluster Summary CSV
                                </Button>
                            </Box>

                            <Button sx={primaryButtonStyle}>
                                Generate Business Insights
                            </Button>

                        </Box>
                    </FloatIn>
                </Box>

            </Box>
        </>
    );
}
