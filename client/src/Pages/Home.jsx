import Box from "@mui/material/Box";
import { useState } from "react";
import AnalyzeButton from "../components/AnalyzeButton";
import FloatIn from "../components/FloatIn";
import Guidelines from "../components/Guidelines";
import TextSection from "../components/TextSection";
import UploadButton from "../components/UploadButton";
import { homeContainerStyle } from "../styles.js";

export default function Home(props) {
    const [enable, setEnable] = useState(false);
    const { setFile } = props;

    return (
        <Box sx={homeContainerStyle}>
            <FloatIn delay={0.1}>
                <TextSection />
            </FloatIn>

            <FloatIn delay={0.25}>
                <UploadButton setFile={setFile} setEnable={setEnable} />
            </FloatIn>

            <FloatIn delay={0.4}>
                <AnalyzeButton enable={enable} />
            </FloatIn>

            <FloatIn delay={0.55}>
                <Guidelines />
            </FloatIn>
        </Box>
    );
}
