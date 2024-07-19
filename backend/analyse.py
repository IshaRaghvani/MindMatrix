# Create a list of data
data = [
    ["Network Traffic Filtering", 45870, 13.16, 85, 78, 80, 120, 10, 11.76],
    ["Sales Data", 13160, 9.59, 90, 80, 4, 17.95],
    ["website_traffic", 17277, 9.69, 93, 91, 3, 12.5],
    ["Women Ovulation Cycle", 28510, 0, 86, 77, 9, 11.63],
    ["Milk Quality", 48980, 10, 96, 93, 5, 20.78],
    ["Breast Cancer", 56933, 3.03, 97, 94, 4, 12.35],
    ["Bank Churning", 10000, 14, 87, 76, 11, 11.49],
    ["Malicious URLs", 65119, 12, 97, 94, 5, 23.68],
    ["Bank Customer Churning", 85060, 9.89, 98, 95, 4, 11.54],
    ["sales_forecast", 10020, 8, 88, 80, 3, 10.99],
    ["Food Price Prediction", 40227, 11.98, 89, 78, 1, 15.78],
    ["House Price Prediction", 13320, 5.17, 90, 88, 2, 30.8]
]

# Define column names
column_names = ["FileSizeRows", "Missing values", "Error Detection Accuracy", "Data Imputation Accuracy", "Feature Selection Relevance", "Processing Time (minutes)", "Manual Effort (hours)", "Improvement (%)"]

# Create the table
print("| " + " | ".join(column_names) + " |")
print("|" + "-" * (len(column_names) * 23 + len(column_names) + 2) + "|")

# Fill the table with data
for row in data:
    print("| " + " | ".join([str(x) for x in row]) + " |")

print("|" + "-" * (len(column_names) * 23 + len(column_names) + 2) + "|")