import Button from '@mui/material/Button';

export default function AnalyzeButton({ enable }) {
    return (
        <Button
            variant="outlined"
            disabled={!enable}
            sx={{
                marginTop: "20px",
                padding: "14px 38px",
                borderRadius: "999px",
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: "16px",
                fontWeight: 500,
                letterSpacing: "0.2px",
                textTransform: "none",

                backgroundColor: "transparent",
                color: "#60A5FA",
                borderColor: "#60A5FA",

                "&:hover": {
                    backgroundColor: "rgba(96, 165, 250, 0.08)",
                    borderColor: "#60A5FA",
                },

                "&.Mui-disabled": {
                    color: "rgba(255,255,255,0.65)",
                    borderColor: "rgba(255,255,255,0.25)",
                }
            }}
        >
            Analyze
        </Button>
    );
}