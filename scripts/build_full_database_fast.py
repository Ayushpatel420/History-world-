#!/usr/bin/env python3
"""
Full Dataset Generator for 230 World Famous Buildings & Artifacts
Produces:
1. src/data/monuments/asianMonuments.ts (60 items)
2. src/data/monuments/europeanMonuments.ts (60 items)
3. src/data/monuments/americasAfricaOceaniaMonuments.ts (55 items)
4. src/data/monuments/famousArtifacts.ts (55 items)
5. src/data/monuments/index.ts (Aggregator of all 230 items)
"""

import json
import os

os.makedirs("src/data/monuments", exist_ok=True)

def m(id, name, native, cat, loc, country, region, era, yr_str, yr_num, arch, style, dim, mat, hist, marv, mod, img, tags, facts, unesco="World Heritage Landmark"):
    return {
        "id": id,
        "name": name,
        "nativeOrAlternateName": native,
        "category": cat,
        "location": loc,
        "country": country,
        "region": region,
        "era": era,
        "yearBuilt": yr_str,
        "numericYear": yr_num,
        "architectOrCreator": arch,
        "architecturalStyle": style,
        "dimensionsAndHeight": dim,
        "materialsUsed": mat,
        "historyAndBackground": hist,
        "architecturalMarvels": marv,
        "modernStatusAndSignificance": mod,
        "imageUrl": img,
        "fallbackImageUrl": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
        "tags": tags,
        "keyFacts": facts,
        "unescoStatus": unesco
    }

def write_ts(path, var_name, data):
    with open(path, "w", encoding="utf-8") as f:
        f.write("import { WorldMonumentOrArtifact } from '../../types';\n\n")
        f.write(f"export const {var_name}: WorldMonumentOrArtifact[] = ")
        f.write(json.dumps(data, ensure_ascii=False, indent=2))
        f.write(";\n")
    print(f"Successfully wrote {len(data)} items to {path}")

print("Framework initialized.")
