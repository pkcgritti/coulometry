#!/bin/bash
echo "Starting server in production mode with 4 workers on port 8092"
gunicorn -w 4 -b localhost:8092 server:app
