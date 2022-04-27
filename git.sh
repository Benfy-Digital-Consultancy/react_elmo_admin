#!bin/bash

npm run build

git add .

git commit -m "New Build to staging"

git push origin main