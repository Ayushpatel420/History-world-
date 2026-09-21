#!/usr/bin/env python3
"""
Generator for complete 230 World Most Famous Buildings and Historical Artifacts
"""
import json
import os

os.makedirs("src/data/monuments", exist_ok=True)

def write_ts_file(filepath, var_name, items):
    content = f"""import {{ WorldMonumentOrArtifact }} from '../../types';

export const {var_name}: WorldMonumentOrArtifact[] = {json.dumps(items, ensure_ascii=False, indent=2)};
"""
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated {len(items)} entries in {filepath}")

print("Dataset generator helper initialized.")
