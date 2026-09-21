#!/usr/bin/env python3
import json
import os

# Helper to escape strings for TypeScript
def to_ts_string(s):
    return json.dumps(s, ensure_ascii=False)

def format_item(item):
    tags_ts = json.dumps(item.get("tags", []), ensure_ascii=False)
    facts_ts = json.dumps(item.get("keyFacts", []), ensure_ascii=False)
    return f"""  {{
    id: {to_ts_string(item["id"])},
    name: {to_ts_string(item["name"])},
    nativeOrAlternateName: {to_ts_string(item.get("nativeOrAlternateName", ""))},
    category: {to_ts_string(item["category"])},
    location: {to_ts_string(item["location"])},
    country: {to_ts_string(item["country"])},
    region: {to_ts_string(item["region"])},
    era: {to_ts_string(item["era"])},
    yearBuilt: {to_ts_string(item["yearBuilt"])},
    numericYear: {item["numericYear"]},
    architectOrCreator: {to_ts_string(item["architectOrCreator"])},
    architecturalStyle: {to_ts_string(item["architecturalStyle"])},
    dimensionsAndHeight: {to_ts_string(item["dimensionsAndHeight"])},
    materialsUsed: {to_ts_string(item["materialsUsed"])},
    historyAndBackground: {to_ts_string(item["historyAndBackground"])},
    architecturalMarvels: {to_ts_string(item["architecturalMarvels"])},
    modernStatusAndSignificance: {to_ts_string(item["modernStatusAndSignificance"])},
    imageUrl: {to_ts_string(item["imageUrl"])},
    fallbackImageUrl: {to_ts_string(item.get("fallbackImageUrl", "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200"))},
    tags: {tags_ts},
    keyFacts: {facts_ts},
    unescoStatus: {to_ts_string(item.get("unescoStatus", "World Heritage Cultural Landmark"))}
  }}"""

print("Setup helper script...")
