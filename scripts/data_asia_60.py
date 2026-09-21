#!/usr/bin/env python3
"""
Generates src/data/monuments/asianMonuments.ts with 60 comprehensive Asian monuments.
"""
import json
import os

os.makedirs("src/data/monuments", exist_ok=True)

def b(id, name, native, cat, loc, country, era, yr_str, yr_num, arch, style, dim, mat, hist, marv, mod, img, tags, facts, unesco="World Heritage Landmark"):
    return {
        "id": id,
        "name": name,
        "nativeOrAlternateName": native,
        "category": cat,
        "location": loc,
        "country": country,
        "region": "Asia" if country not in ["United Arab Emirates", "Jordan", "Israel / Palestine", "Palestine / Jerusalem", "Iran", "Saudi Arabia"] else "Middle East",
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

print("Asia builder starting...")
