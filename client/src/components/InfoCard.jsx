import Box from "@mui/material/Box";

export default function InfoCard(props) {
    const { title, formattedData } = props
    const cardStyle = {
        width: 340,
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
    };

    const headerRowStyle = {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "13px",
        color: "rgba(255,255,255,0.75)",
    };

    const dividerStyle = {
        height: "1px",
        backgroundColor: "rgba(255,255,255,0.06)",
        margin: "8px 0",
    };
    return (
        <Box sx={cardStyle}>
            <Box sx={titleStyle}>{title}</Box>
            {Object.entries(formattedData).map(([key, value]) => (
                <div>
                    <Box key={key} sx={headerRowStyle}>
                        <Box>{key}</Box>
                        <Box>{value}</Box>
                    </Box>
                    <Box sx={dividerStyle} />
                </div>

            ))}
        </Box>
    );
}
