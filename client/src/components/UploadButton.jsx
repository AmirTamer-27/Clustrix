import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const StyledButton = styled(Button)(({ theme }) => ({
    position: "relative",
    font: 'helvetica neue',
    padding: "14px 36px",
    borderRadius: "999px",
    color: "#E6EAF0",
    backgroundColor: "#0B0F14",
    textTransform: "none",
    fontSize: "16px",
    fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
    letterSpacing: "0.3px",
    border: "1px solid transparent",
    overflow: "hidden",

    backgroundImage:
        "linear-gradient(#0B0F14, #0B0F14), linear-gradient(120deg, #3B82F6, #60A5FA, #3B82F6)",
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
    backgroundSize: "100% 100%, 200% 100%",
    backgroundPosition: "0 0, 0 0",

    transition: "background-position 0.4s ease, box-shadow 0.4s ease",

    "&:hover": {
        backgroundPosition: "0 0, 100% 0",
        boxShadow: "0 0 18px rgba(59, 130, 246, 0.35)",
        backgroundColor: "#0B0F14",
    },
}));

export default function UploadButton(props) {
    const { setFile, setEnable } = props
    return (
        <StyledButton
            component="label"
            startIcon={<CloudUploadIcon />}

        >
            Upload Dataset
            <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                    setFile(e.target.files[0])
                    setEnable(true)

                }}
            />
        </StyledButton>
    );
}
