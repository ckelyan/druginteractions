import pandas as pd
import json

DOAC = 'DOAC name'
COMED = 'Co-medications name'

df = pd.read_excel("Prémices application DOAC.xlsx", skiprows=2).iloc[:,1:-2]
res = {r: {} for r in df[DOAC]}

for i, row in df.iterrows():
    res[row[DOAC]][row[COMED]] = [d.strip() if d != '-' else '' for d in row.iloc[3:]]

res['_DOAC'] = list(set(df[DOAC].to_list()))

with open('public/data.json', 'w') as f:
    json.dump(res, f)