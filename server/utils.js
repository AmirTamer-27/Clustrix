const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateInsights(inputData) {
  console.log(inputData)
  const prompt = `
You are a senior customer analytics strategist.

You are given RFM clustering results from a retail business.

The data below contains:
- For each cluster:
    - Cluster ID
    - Number of customers
    - Average Recency (days since last purchase)
    - Average Frequency (number of unique purchases)
    - Average Monetary value (average customer spend)

Clustering Summary:
${JSON.stringify(inputData, null, 2)}

Your task:

For EACH cluster:
1. Assign a short descriptive name (max 4 words)
2. Explain what this segment represents behaviorally
3. Estimate revenue importance (Low / Medium / High)
4. Provide 3–5 specific business recommendations
5. Suggest whether focus should be Retention, Growth, or Reactivation

Then provide:
- A short overall strategic summary for the company.

IMPORTANT:
Respond ONLY in valid JSON.
Do NOT include markdown.
Do NOT include explanations outside JSON.

Use this exact structure:

{
  "clusters": [
    {
      "cluster_id": number,
      "segment_name": string,
      "description": string,
      "revenue_importance": "Low | Medium | High",
      "focus": "Retention | Growth | Reactivation",
    }
  ],
  "overall_strategy": string
}
`;


  console.log("Prompt sent")
  const model = ai.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const result = await model.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  return text;
}
module.exports = { generateInsights };


