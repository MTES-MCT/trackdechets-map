from os import path
import json
import requests
import time
from string import Template


input_path = path.join(path.dirname(
    path.abspath(__file__)), "data", "companies.json")

with open(input_path) as jsonfile:
    companies = json.load(jsonfile)


# Use adresse.data.gouv to geocode companies
SIRENE_API_URL = Template(
    'https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/$siret')

companies_geocoded = []

for company in companies:
    geocoded = company
    geocoded["latitude"] = ""
    geocoded["longitude"] = ""
    url = SIRENE_API_URL.substitute(siret=company["siret"])
    print(url)
    response = requests.get(url)
    if (response.status_code == 200):
        info = response.json()
        geocoded["latitude"] = info["etablissement"]["latitude"]
        geocoded["longitude"] = info["etablissement"]["longitude"]
        time.sleep(0.5)
    companies_geocoded.append(geocoded)

output_path = path.join(path.dirname(
    path.abspath(__file__)), "data", "companies.geocoded.json")

with open(output_path, "w") as writer:
    json.dump(companies_geocoded, writer, indent=4)
