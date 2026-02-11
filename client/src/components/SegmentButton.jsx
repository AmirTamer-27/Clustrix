import Button from "@mui/material/Button";
import { use } from "react";
import { useNavigate } from "react-router";
export default function SegmentButton() {
    const navigate = useNavigate()
    return (
        <Button
            variant="contained"
            onClick={() => navigate('/segment')}
            sx={{
                padding: "14px 36px",
                borderRadius: "999px",
                fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
                fontSize: "15px",
                fontWeight: 500,
                letterSpacing: "0.3px",
                textTransform: "none",

                background: "linear-gradient(90deg,#38bdf8,#6366f1)",
                color: "#fff",

                boxShadow: "0 0 20px rgba(99,102,241,0.4)",

                transition: "all 0.25s ease",

                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 0 30px rgba(99,102,241,0.7)",
                    background: "linear-gradient(90deg,#3bc9f8,#7c83ff)",
                },

                "&:active": {
                    transform: "translateY(0px)",
                    boxShadow: "0 0 15px rgba(99,102,241,0.4)",
                }
            }}
        >
            Run Segmentation
        </Button>
    );
}
