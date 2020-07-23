#!/bin/bash

set -e
api_key=$1

echo "Creating an upload resource and fetching the upload URL"

upload_data=$(curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'X-API-Token: '$APP_CENTER_KEY 'https://api.appcenter.ms/v0.1/apps/palawan-appcenter/Employee-Mobile-Android/release_uploads')
upload_id=`echo $upload_data | jq -r '.upload_id'`
upload_url=`echo $upload_data | jq -r '.upload_url'`

echo "Uploading the APK"

upload_success=$(curl -F "ipa=@android/app/build/outputs/apk/distribution/release/app-distribution-release.apk" $upload_url)

echo "APK Uploaded"

echo "Commiting the APK and getting the release url"

release_data=$(curl -X PATCH --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'X-API-Token: '$APP_CENTER_KEY -d '{ "status": "committed"  }' 'https://api.appcenter.ms/v0.1/apps/palawan-appcenter/Employee-Mobile-Android/release_uploads/'$upload_id)
release_url=`echo $release_data | jq -r '.release_url'`

echo "Distributing the release"

release_success=$(curl -X PATCH --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'X-API-Token: '$APP_CENTER_KEY -d '{ "destination_name": "Collaborators", "release_notes": "New Release" }' 'https://api.appcenter.ms/'$release_url)