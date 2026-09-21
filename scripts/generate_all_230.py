#!/usr/bin/env python3
"""
Full Dataset Generator for 230 World Famous Buildings & Artifacts
Outputs:
- src/data/monuments/asianMonuments.ts (60 items)
- src/data/monuments/europeanMonuments.ts (60 items)
- src/data/monuments/americasAfricaOceaniaMonuments.ts (55 items)
- src/data/monuments/famousArtifacts.ts (55 items)
- src/data/monuments/index.ts (aggregating all 230 items)
"""

import json
import os

os.makedirs("src/data/monuments", exist_ok=True)

def write_ts_file(path, var_name, data):
    content = f"""import {{ WorldMonumentOrArtifact }} from '../../types';

export const {var_name}: WorldMonumentOrArtifact[] = {json.dumps(data, ensure_ascii=False, indent=2)};
"""
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Wrote {len(data)} items to {path}")

print("Dataset generator helper initialized.")
