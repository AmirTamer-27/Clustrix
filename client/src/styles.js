export const containerStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    padding: "60px 40px",
};

export const innerWrapperStyle = {
    display: "flex",
    gap: "40px",
    width: "100%",
    maxWidth: "1100px",
};

export const cardStyle = {
    flex: 1,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(8px)",
    borderRadius: "18px",
    padding: "40px",
};

export const smallLabelStyle = {
    color: "#94a3b8",
    fontSize: "14px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginBottom: "8px",
};

export const gradientTitleStyle = {
    fontSize: "48px",
    fontWeight: 600,
    margin: 0,
    background: "linear-gradient(90deg,#38bdf8,#6366f1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
};

export const descriptionStyle = {
    marginTop: "12px",
    color: "#64748b",
    fontSize: "15px",
    lineHeight: "1.6",
};

export const sliderTrackStyle = {
    height: "6px",
    width: "100%",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "3px",
    position: "relative",
};

export const sliderFillStyle = {
    width: "40%",
    height: "100%",
    background: "linear-gradient(90deg,#38bdf8,#6366f1)",
    borderRadius: "3px",
};
export const pageStyle = {
    position: "relative",
    minHeight: "100vh",
    padding: "80px 60px",
};

export const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    margin: "60px",
};

export const actionContainer = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: '150px',
    flexWrap: "wrap",
    gap: "20px",
};

export const secondaryButtonStyle = {
    padding: "10px 24px",
    borderRadius: "999px",
    fontSize: "14px",
    textTransform: "none",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    background: "transparent",
    "&:hover": {
        borderColor: "#6366f1",
        boxShadow: "0 0 15px rgba(99,102,241,0.5)",
    },
};

export const primaryButtonStyle = {
    padding: "12px 28px",
    borderRadius: "999px",
    fontSize: "14px",
    textTransform: "none",
    background: "linear-gradient(90deg,#38bdf8,#6366f1)",
    color: "#fff",
    boxShadow: "0 0 20px rgba(99,102,241,0.4)",
    "&:hover": {
        boxShadow: "0 0 30px rgba(99,102,241,0.7)",
    },
};