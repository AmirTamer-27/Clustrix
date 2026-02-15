import Papa from "papaparse";

export function formatClusterData(clusterObj) {
    return {
        "Number of Customers": new Intl.NumberFormat("en-US").format(
            clusterObj.CustomerID
        ),

        "Average Recency (Days Since Last Purchase)":
            clusterObj.R.toFixed(1),

        "Average Purchase Frequency":
            clusterObj.F.toFixed(2),

        "Average Monetary Value": new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(clusterObj.M),
    };
}

export function formatAnalyzeData(data) {
    const labelMap = {
        customerCount: "Total Customers",
        cashInflow: "Total Cash Inflow",
        k: "Recommended Number of Clusters",
        totalTransactions: "Total Transactions"
    };

    const result = {};

    Object.entries(data).forEach(([key, value]) => {
        let formattedValue = value;
        if (key === "cashInflow") {
            formattedValue = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(value);
        } else {
            formattedValue = new Intl.NumberFormat("en-US").format(value);
        }

        result[labelMap[key]] = formattedValue;
    });

    return result;
}

export function downloadCSV(data, filename = "data.csv") {
    const csv = Papa.unparse(data);

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function getErrorMessage(error, fallback = "Something went wrong. Please try again.") {
    if (error?.response?.data?.message) return error.response.data.message;
    if (error?.message) return error.message;
    return fallback;
}
