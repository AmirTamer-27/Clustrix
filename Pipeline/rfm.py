import argparse
import json
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import silhouette_score
#Add the validation function here , keep only the important function if it exists

import pandas as pd

def validate(filePath):
    # Load dataset
    df = pd.read_csv(filePath)

    # Normalize column names (lowercase, no spaces)
    df.columns = [col.strip().lower().replace(" ", "") for col in df.columns]

    # Possible aliases for each required field
    required_columns = {
        "Quantity": ["quantity", "qty"],
        "UnitPrice": ["unitprice", "price"],
        "InvoiceNo": ["invoiceno", "invoice", "invoicenumber"],
        "CustomerID": ["customerid", "customer"],
        "InvoiceDate": ["invoicedate", "date"]
    }

    column_mapping = {}

    # Try to find each required field
    for standard_name, aliases in required_columns.items():
        found = False
        for col in df.columns:
            if col in aliases:
                column_mapping[col] = standard_name
                found = True
                break
        if not found:
            raise ValueError(f"Missing required column similar to: {standard_name}")

    # Keep only required columns and rename them
    df = df[list(column_mapping.keys())]
    df = df.rename(columns=column_mapping)

    return df

def analyze (filePath):
    #Data cleaning
    dataset = validate(filePath)
    dataset = dataset.dropna()
    dataset = dataset[dataset['Quantity'] > 0]
    dataset = dataset[dataset['UnitPrice'] > 0]

    #Outlier capping
    Q1 = dataset['Quantity'].quantile(0.25)
    Q3 = dataset['Quantity'].quantile(0.75)
    IQR = Q3 - Q1
    upper_bound_q = Q3 + 1.5 * IQR
    Q1 = dataset['UnitPrice'].quantile(0.25)
    Q3 = dataset['UnitPrice'].quantile(0.75)
    IQR = Q3 - Q1
    upper_bound_u = Q3 + 1.5 * IQR
    dataset["UnitPrice_c"] = dataset["UnitPrice"].clip(
    lower=0,
    upper=upper_bound_u
    )
    dataset["Quantity_c"] = dataset["Quantity"].clip(
    lower=0,
    upper=upper_bound_q
    )

    #Calculating RFM
    dataset["transactionCost"] = dataset["Quantity_c"] * dataset['UnitPrice_c']
    cashInflow = dataset["transactionCost"].sum()
    totalTransactions = dataset["InvoiceNo"].nunique()
    dataset["formatedDate"] = pd.to_datetime(dataset["InvoiceDate"])
    sortedDataset = dataset.sort_values(by="formatedDate" , ascending=False)
    referenceDate = sortedDataset["formatedDate"].iloc[0] + pd.Timedelta(days=1)
    rfm = sortedDataset.groupby("CustomerID").agg({
        "formatedDate" : "first",
        "transactionCost" : "sum",
        "InvoiceNo" : 'nunique'
    })
    rfm = rfm.reset_index()
    rfm['R'] = (referenceDate - rfm["formatedDate"]).dt.days
    rfm = rfm.drop(columns=['formatedDate'])
    rfm = rfm.rename(
        columns={
        "transactionCost" : "M",
        "InvoiceNo" : "F"
        }
    )

    #Performing log transform to fix skewness
    rfm["F_log"] = np.log1p(rfm["F"])
    rfm["M_log"] = np.log1p(rfm["M"])

   #Scaling values
    scaler = MinMaxScaler()
    rfm_scaled = scaler.fit_transform(
        rfm[["R", "F_log", "M_log"]]
    )
    rfm_scaled = pd.DataFrame(
        rfm_scaled,
        index=rfm.index,
        columns=["R", "F_log", "M_log"]
    )
    #Finding the optimal number of clusters
    silhouette_scores = {}
    k_range = range(3, 11) 
    for k in k_range:
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        labels = kmeans.fit_predict(rfm_scaled)
        score = silhouette_score(rfm_scaled, labels)
        silhouette_scores[k] = score
    best_k = max(silhouette_scores, key=silhouette_scores.get)
    customerCount = rfm["CustomerID"].nunique()
    return (best_k , rfm , rfm_scaled , customerCount , cashInflow , totalTransactions)

def segment(filePath , K):
    best_k , rfm , rfm_scaled , customerCount , cashInflow , totalTransactions = analyze(filePath)
    kmeans = KMeans(n_clusters=K , random_state=42 , n_init=10)
    kmeans.fit(rfm_scaled)
    rfm["Cluster"] = kmeans.labels_
    cluster_info = rfm.groupby("Cluster").agg({
    "CustomerID" : 'size',
    'R' : 'mean',
    "F" : "mean",
    "M" : "mean"
    })
    cluster_info = cluster_info.reset_index()
    return (rfm , cluster_info)

def main(filePath , K = False):
    if( K == False):
        best_k , rfm , rfm_scaled , customerCount , cashInflow , totalTransactions = analyze(filePath)
        return best_k , customerCount,cashInflow,totalTransactions
    else:
        rfm , cluster_info = segment(filePath , K)
        formatedRFM = rfm[["CustomerID" , "R" , "F" , "M" , "Cluster"]]
        return formatedRFM , cluster_info
    
if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    # required argument
    parser.add_argument("--file", required=True)

    # optional argument
    parser.add_argument("--k", type=int, required=False)

    args = parser.parse_args()

    filePath = args.file
    k = args.k
    result = {}
    if k is None:
        best_k , customerCount,cashInflow,totalTransactions = main(filePath)
        result = {"k" : best_k , "customerCount" : customerCount , "cashInflow" : cashInflow , "totalTransactions" : totalTransactions}
    else:
        rfm , cluster_info = main(filePath , k)
        result = {"customerCluster" : rfm.to_dict(orient="records") , "clusterInfo"  :cluster_info.to_dict(orient="records") }
    print(json.dumps(result))
    

        


        
        

   

    
    