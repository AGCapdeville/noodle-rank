#!/usr/bin/env python3
"""
Script to parse Open Food Facts TSV export and extract ramen product data.
"""

import csv
import json
from pathlib import Path

def parse_openfoodfacts_tsv(file_path, delim=','):
    """
    Parse the Open Food Facts TSV file and extract ramen products.

    Args:
        file_path (str): Path to the TSV file

    Returns: 
        ramen_products_list
    """
    noodle_products = []

    with open(file_path, 'r', encoding='utf-8') as file:
        # Read the header line
        header_line = file.readline().strip()
        headers = header_line.split(delim)

        print(f"Total columns: {len(headers)}")

        # Create TSV reader for data rows
        reader = csv.reader(file, delimiter=delim)

        # Process each product row
        for row_num, row in enumerate(reader, 2):  # Start from row 2 (after header)
            if len(row) != len(headers):
                print(f"Warning: Row {row_num} has {len(row)} columns, expected {len(headers)}")
                continue

            # Create product dictionary
            product = {}
            for i, header in enumerate(headers):
                if i < len(row):
                    product[header] = row[i]

            # Check if it's a ramen product (case-insensitive search)
            noodle_products.append(product)

    return noodle_products

def main():
    # File path
    file_path = "/Users/senpai/Development/Ramen/Ramen/public/ramen-ratings.csv"

    if not Path(file_path).exists():
        print(f"Error: File not found at {file_path}")
        return

    print("Parsing Open Food Facts TSV file...")
    noodle_products = parse_openfoodfacts_tsv(file_path)

    # Extract only Code, Product Name, and Brand
    simplified_products = []
    for product in noodle_products:
        simplified_product = {
            'Product Name': product.get('Variety', ''),
            'Brand': product.get('Brand', ''),
            'Style': product.get('Style', '')
        }
        simplified_products.append(simplified_product)

    # Export to JSON
    output_file = "/Users/senpai/Development/Ramen/Ramen/noodle_products.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(simplified_products, f, indent=2, ensure_ascii=False)


    # # Save ramen products to JSON file
    # output_file = "/Users/senpai/Development/Ramen/Ramen/public/ramen_products.json"
    # with open(output_file, 'w', encoding='utf-8') as f:
    #     json.dump(noodle_products, f, indent=2, ensure_ascii=False)

    # print(f"\nSaved {len(noodle_products)} ramen products to {output_file}")

if __name__ == "__main__":
    main()