import Box from "@mui/material/Box";

export default function Guidelines() {
    // defined once to keep code clean and consistent
    const textStyle = {
        fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
        fontSize: "13px",
        fontWeight: 400, // 500 can be slightly better for small text on dark backgrounds
        lineHeight: "1.6",
        color: "rgba(255,255,255,0.6)", // Slightly increased opacity for better legibility
        margin: 0,
        textAlign: "center", // Aligns text nicely within the constrained box
    };

    return (
        <Box sx={{
            marginTop: "32px", // Increased from 16px to separate "Actions" from "Info"
            display: "flex",
            flexDirection: "column",
            gap: "8px",        // Increased slightly for breathing room
            maxWidth: "400px", // Crucial: Prevents text from stretching too wide on desktop
            width: "100%",
            padding: "0 16px", // Prevents text from touching edges on small mobile screens
            opacity: 0.9,      // Overall container blending
        }}>
            <p style={textStyle}>
                Dataset should contain transaction-level records.
            </p>

            <p style={textStyle}>
                Required fields include customer ID, invoice date, quantity, and unit price.
            </p>

            <p style={textStyle}>
                CSV or Excel formats are supported.
            </p>
        </Box>
    )
}