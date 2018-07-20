#!/bin/bash
echo "Starting server in production mode with 4 workers on port 8001"
gunicorn -w 4 -b localhost:8001 server:app