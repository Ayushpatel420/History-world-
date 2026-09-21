#!/usr/bin/env python3
import json
import os

os.makedirs("src/data/monuments", exist_ok=True)

# Helper function to construct rich monument objects
def create_monument(id, name, native_name, category, location, country, region, era, year_built, numeric_year, architect, style, dimensions, materials, history, marvels, modern_status, image_url, fallback_url, tags, facts, unesco="World Heritage Cultural Landmark"):
    return {
        "id": id,
        "name": name,
        "nativeOrAlternateName": native_name,
        "category": category,
        "location": location,
        "country": country,
        "region": region,
        "era": era,
        "yearBuilt": year_built,
        "numericYear": numeric_year,
        "architectOrCreator": architect,
        "architecturalStyle": style,
        "dimensionsAndHeight": dimensions,
        "materialsUsed": materials,
        "historyAndBackground": history,
        "architecturalMarvels": marvels,
        "modernStatusAndSignificance": modern_status,
        "imageUrl": image_url,
        "fallbackImageUrl": fallback_url,
        "tags": tags,
        "keyFacts": facts,
        "unescoStatus": unesco
    }

print("Script framework ready.")
