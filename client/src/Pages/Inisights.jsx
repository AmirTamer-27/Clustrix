import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FloatIn from "../components/FloatIn";
import InfoCard from "../components/InfoCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
    overlayStyle,
    sectionContainerStyle,
    sectionHeaderStyle,
    smallLabelStyle,
    gradientTitleStyle,
    sectionDescriptionStyle,
    insightsGridStyle,
    insightsSummaryCardStyle,
    insightsSummaryTitleStyle,
    insightsSummaryTextStyle,
    insightsActionsStyle,
    insightsSecondaryButtonStyle,
    insightsPrimaryButtonStyle,
    loadingContainerStyle,
    segmentLoadingMessageStyle
} from "../styles.js";
import { MoonLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { getErrorMessage } from "../utils.js";
const messages = [
    "Analyzing cluster performance...",
    "Interpreting customer behavior patterns...",
    "Evaluating revenue concentration...",
    "Identifying retention opportunities...",
    "Detecting growth segments...",
    "Assessing churn risk clusters...",
    "Generating strategic recommendations...",
    "Prioritizing high-impact actions...",
    "Finalizing executive insights..."
];

export default function Insights(props) {
    const [insights, setInsights] = useState(null)
    const { clusterInfo } = props
    const [messageIndex, setMessageIndex] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        async function getInsights() {
            if (!clusterInfo) {
                setError("No cluster data found. Generate segments before opening insights.");
                return;
            }
            try {
                setError("");
                const response = await axios.post("http://clustrix-production.up.railway.app/insights", {
                    clusterInfo
                });
                setInsights(response.data)
            } catch (err) {
                setError(getErrorMessage(err, "Failed to generate AI insights."));
            }
        }
        getInsights()

    }, [clusterInfo])

    function downloadStrategicReport() {
        if (!insights) return;

        const reportSections = [
            "Customer Intelligence Strategic Report",
            `Generated: ${new Date().toLocaleString()}`,
            "",
            "Executive Summary",
            insights.overall_strategy || "No summary available.",
            "",
            "Cluster Recommendations",
            ...(insights.clusters || []).flatMap((cluster, index) => ([
                "",
                `Cluster ${index + 1}`,
                `Segment Name: ${cluster.segment_name || "N/A"}`,
                `Revenue Importance: ${cluster.revenue_importance || "N/A"}`,
                `Description: ${cluster.description || "N/A"}`,
                `Strategic Focus: ${cluster.focus || "N/A"}`,
            ])),
        ];

        const blob = new Blob([reportSections.join("\n")], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "Strategic_Report.txt");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    if (!insights) {
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
    else {
        return (
            <>
                <div style={overlayStyle} />

                <Box sx={sectionContainerStyle}>
                    <FloatIn delay={0.2}>
                        <Box sx={sectionHeaderStyle}>
                            <p style={smallLabelStyle}>AI Strategic Report</p>
                            <h1 style={gradientTitleStyle}>Customer Intelligence Insights</h1>
                            <p style={sectionDescriptionStyle}>
                                AI-generated interpretation of your customer segments with structured business
                                recommendations.
                            </p>
                        </Box>
                    </FloatIn>

                    <FloatIn delay={0.4}>
                        <Box sx={insightsGridStyle}>
                            {insights.clusters.map((cluster, index) => (
                                <InfoCard
                                    key={cluster._id}
                                    title={`Cluster ${index + 1}`}
                                    formattedData={{
                                        "Segment Name": cluster.segment_name,
                                        "Revenue Importance": cluster.revenue_importance,
                                        "Description": cluster.description,
                                        "Strategic Focus": cluster.focus,
                                    }}
                                />
                            ))}
                        </Box>
                    </FloatIn>

                    <FloatIn delay={0.6}>
                        <Box sx={insightsSummaryCardStyle}>
                            <p style={smallLabelStyle}>Overall Strategy</p>
                            <h2 style={insightsSummaryTitleStyle}>Executive Summary</h2>
                            <p style={insightsSummaryTextStyle}>
                                {insights.overall_strategy}
                            </p>
                        </Box>
                    </FloatIn>

                    <FloatIn delay={0.8}>
                        <Box sx={insightsActionsStyle}>
                            <Button sx={insightsSecondaryButtonStyle} onClick={() => navigate("/segment")}>
                                Back to Segmentation
                            </Button>
                            <Button sx={insightsPrimaryButtonStyle} onClick={downloadStrategicReport}>
                                Download Strategic Report
                            </Button>
                        </Box>
                    </FloatIn>
                </Box>
            </>
        );
    }
}
