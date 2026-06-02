#!/bin/bash
set -e

echo "Running Ruff..."
ruff check . 

echo "Running Tests..."
pytest test/python/ -v

echo "Running Dependency Audit..."
pip-audit --ignore-vuln CVE-2025-8869 \
          --ignore-vuln CVE-2026-1703 \
          --ignore-vuln CVE-2026-3219 \
          --ignore-vuln CVE-2026-6357

