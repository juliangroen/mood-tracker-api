#!/bin/bash

curl -X POST -H "Content-Type: application/json" -d '{"mood": "1", "sleep": "2", "anxiety": "3", "depression": "4", "motivation": "5", "focus": "5"}' localhost:3000/api/entries