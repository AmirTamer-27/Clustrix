import Box from "@mui/material/Box";

export default function InfoCard(props) {
    const { title, formattedData } = props
    const cardStyle = {
        width: "100%",
        maxWidth: 380,
        padding: "20px 20px",
        borderRadius: "18px",

        background:
            "linear-gradient(180deg, rgba(20,22,26,0.85), rgba(10,12,15,0.95))",
        boxShadow:
            "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.7)",

        fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
        color: "rgba(255,255,255,0.85)",
    };

    const titleStyle = {
        fontSize: "20px",
        fontWeight: 400,
        marginBottom: "16px",
        color: "rgba(255,255,255,0.92)",
    };

    const headerRowStyle = {
        display: "grid",
        gridTemplateColumns: "130px 1fr",
        alignItems: "start",
        gap: "10px",
        fontSize: "13px",
        color: "rgba(255,255,255,0.75)",
        lineHeight: 1.45,
    };

    const dividerStyle = {
        height: "1px",
        backgroundColor: "rgba(255,255,255,0.06)",
        margin: "8px 0",
    };

    const keyStyle = {
        color: "rgba(255,255,255,0.82)",
    };

    const valueStyle = {
        color: "rgba(255,255,255,0.9)",
        wordBreak: "break-word",
        whiteSpace: "normal",
    };

    return (
        <Box sx={cardStyle}>
            <Box sx={titleStyle}>{title}</Box>
            {Object.entries(formattedData).map(([key, value]) => (
                <div key={key}>
                    <Box sx={headerRowStyle}>
                        <Box sx={keyStyle}>{key}</Box>
                        <Box sx={valueStyle}>{value}</Box>
                    </Box>
                    <Box sx={dividerStyle} />
                </div>

            ))}
        </Box>
    );
}
