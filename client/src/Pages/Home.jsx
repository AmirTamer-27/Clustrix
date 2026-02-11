import Background from "../components/background"
import Box from '@mui/material/Box'
import UploadButton from "../components/UploadButton"
import TextSection from "../components/TextSection"
import { useState } from "react"
import Guidelines from "../components/Guidelines"
import AnalyzeButton from "../components/AnalyzeButton"
import InfoCard from "../components/InfoCard"
import FloatIn from "../components/FloatIn"
export default function Home(props) {
    const [enable, setEnable] = useState(false)

    const { setFile } = props
    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "80vh",
                justifyContent: "center",
                marginTop: "5rem",
            }}
        >

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





    )
}