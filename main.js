#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { allocateDiscounts } from './src/allocator.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
  console.error('❌ Usage: node main.js <input_file.json> <output_file.json>');
  process.exit(1);
}

try {
  const rawData = fs.readFileSync(path.resolve(__dirname, inputPath), 'utf-8');
  const input = JSON.parse(rawData);

  const result = allocateDiscounts(input);

  fs.writeFileSync(path.resolve(__dirname, outputPath), JSON.stringify(result, null, 2));
  console.log('✅ Output written to', outputPath);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
