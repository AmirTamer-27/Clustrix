import Box from "@mui/material/Box";
export default function TextSection() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 672, height: 274, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxwidth: 672, height: 120, justifyContent: 'space-between' }}>
                <h1 style={{
                    fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
                    fontSize: "48px",
                    paddingBottom: 1,
                    fontWeight: 300,
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(200,200,200,0.75) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    margin: 1

                }}>
                    Systematic Customer Intelligence.</h1>
                <h1 style={{
                    fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
                    fontSize: "48px",
                    fontWeight: 300,
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(200,200,200,0.75) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    margin: 0,
                    paddingBottom: 1
                }}>
                    Transaction-Driven Insight.</h1>
            </Box>
            <Box>
                <p style={{ fontSize: '16px', fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`, color: 'grey' }}>Transaction-level analysis powered by RFM modeling and unsupervised learning to uncover meaningful customer segments and actionable behavioral patterns.</p>
            </Box>
        </Box>
    )


}