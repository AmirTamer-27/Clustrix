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
    color: "#dbeafe",
    background: "linear-gradient(90deg,#38bdf8,#6366f1)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
};

export const descriptionStyle = {
    marginTop: "12px",
    color: "#64748b",
    fontSize: "15px",
    lineHeight: "1.6",
};

export const pageStyle = {
    position: "relative",
    minHeight: "100vh",
    padding: "80px 60px",
};

export const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "80px",
};

export const actionContainer = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "150px",
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

export const homeContainerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "80vh",
    justifyContent: "center",
    marginTop: "5rem",
};

export const loadingContainerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    justifyContent: "center",
};

export const loadingMessageStyle = {
    marginTop: 30,
    fontSize: "14px",
    color: "rgba(255,255,255,0.7)",
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

export const segmentLoadingMessageStyle = {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: "1.6",
    color: "rgba(255,255,255,0.6)",
    marginTop: 40,
    textAlign: "center",
};

export const overlayStyle = {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.15)",
    pointerEvents: "none",
};

export const analyzeOverlayStyle = {
    position: "absolute",
    inset: 0,
    background: "rgba(0, 0, 0, 0.1)",
};

export const segmentOverlayStyle = {
    position: "absolute",
    inset: 0,
    background: "rgba(0, 0, 0, 0.2)",
};

export const sectionContainerStyle = {
    ...containerStyle,
    position: "relative",
    zIndex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "120px",
    paddingBottom: "120px",
};

export const sectionHeaderStyle = {
    textAlign: "center",
    marginBottom: "80px",
    maxWidth: "700px",
};

export const centeredSectionHeaderStyle = {
    ...sectionHeaderStyle,
    marginLeft: "auto",
    marginRight: "auto",
};

export const sectionDescriptionStyle = {
    ...descriptionStyle,
    marginTop: "20px",
};

export const insightsGridStyle = {
    width: "100%",
    maxWidth: "1200px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "80px",
    marginBottom: "80px",
};

export const insightsSummaryCardStyle = {
    ...cardStyle,
    width: "100%",
    maxWidth: "900px",
    padding: "50px",
};

export const insightsSummaryTitleStyle = {
    fontSize: "28px",
    fontWeight: 500,
    marginTop: 0,
    marginBottom: "25px",
    color: "rgba(255,255,255,0.94)",
};

export const insightsSummaryTextStyle = {
    color: "rgba(255,255,255,0.75)",
    lineHeight: "1.8",
    fontSize: "15px",
};

export const insightsActionsStyle = {
    marginTop: "60px",
    width: "100%",
    maxWidth: "1000px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
};

export const insightsSecondaryButtonStyle = {
    padding: "10px 26px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "rgba(255,255,255,0.8)",
    textTransform: "none",
};

export const insightsPrimaryButtonStyle = {
    padding: "10px 30px",
    borderRadius: "999px",
    background: "linear-gradient(90deg,#38bdf8,#6366f1)",
    color: "white",
    textTransform: "none",
    fontWeight: 500,
    boxShadow: "0 0 15px rgba(99,102,241,0.6)",
};

export const analyzeLeftCardStyle = {
    ...cardStyle,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
};

export const analyzeSliderSectionStyle = {
    marginTop: "50px",
};

export const clusterSliderStyle = {
    color: "#6366f1",
    height: 6,
    "& .MuiSlider-thumb": {
        width: 18,
        height: 18,
        boxShadow: "0 0 10px #6366f1",
    },
    "& .MuiSlider-track": {
        border: "none",
    },
};

export const segmentButtonWrapperStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "30px",
};

export const analyzeRightCardStyle = {
    ...cardStyle,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

export const segmentActionsWrapperStyle = {
    marginTop: "40px",
};

export const segmentDownloadGroupStyle = {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
};
