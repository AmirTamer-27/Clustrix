import Background from "../components/background"
import Box from '@mui/material/Box'
import UploadButton from "../components/UploadButton"
import TextSection from "../components/TextSection"
import { useState } from "react"
import Guidelines from "../components/Guidelines"
import AnalyzeButton from "../components/AnalyzeButton"
export default function Home(props) {
    const [enable, setEnable] = useState(false)
    const { setFile } = props
    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <Background />
            <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center', marginTop: '5rem' }}>
                <TextSection />
                <UploadButton setFile={setFile} setEnable={setEnable} />
                <AnalyzeButton enable={enable} />
                <Guidelines />
            </Box>

        </Box>

    )
}