# Specification

* [Bin Option Format](#bin-option-format)

#### Bin Option Format
📄 [source/option.js](source/option.js)
> ```
> CLI Usage:
>   --config -c [OPTIONAL] [ARGUMENT=1]
>       # from JSON: set to 'path/to/config.json'
>       # from ENV: set to 'env'
>   --help -h [OPTIONAL]
>       set to enable
>   --version -v [OPTIONAL]
>       set to enable
>   --quiet -q [OPTIONAL]
>       reduce most logging
>   --upload-platform [OPTIONAL] [ARGUMENT=1]
>       one of:
>         linux win32
>         darwin
>     --upload-input-path [OPTIONAL-CHECK] [ARGUMENT=1]
>     --upload-version [OPTIONAL-CHECK] [ARGUMENT=1]
>         like 0.0.0
>     --upload-locale [OPTIONAL-CHECK] [ARGUMENT=1]
>         like zh/en, for win32/darwin
>     --upload-arch [OPTIONAL-CHECK] [ARGUMENT=1]
>         like x64/ia32, for win32
>     --upload-service -s [OPTIONAL-CHECK] [ARGUMENT=1]
>         one of:
>           aws oss
>           tc
>     --upload-service-region [OPTIONAL-CHECK] [ARGUMENT=1]
>     --upload-service-bucket [OPTIONAL-CHECK] [ARGUMENT=1]
>     --upload-service-access-key-id [OPTIONAL-CHECK] [ARGUMENT=1]
>     --upload-service-access-key-secret [OPTIONAL-CHECK] [ARGUMENT=1]
>     --upload-service-access-tc-app-id [OPTIONAL-CHECK] [ARGUMENT=1]
>         only for 'tc' bucket
> ENV Usage:
>   "
>     #!/usr/bin/env bash
>     export UPLOADER_CONFIG="[OPTIONAL] [ARGUMENT=1]"
>     export UPLOADER_HELP="[OPTIONAL]"
>     export UPLOADER_VERSION="[OPTIONAL]"
>     export UPLOADER_QUIET="[OPTIONAL]"
>     export UPLOADER_UPLOAD_PLATFORM="[OPTIONAL] [ARGUMENT=1]"
>     export UPLOADER_UPLOAD_INPUT_PATH="[OPTIONAL-CHECK] [ARGUMENT=1]"
>     export UPLOADER_UPLOAD_VERSION="[OPTIONAL-CHECK] [ARGUMENT=1]"
>     export UPLOADER_UPLOAD_LOCALE="[OPTIONAL-CHECK] [ARGUMENT=1]"
>     export UPLOADER_UPLOAD_ARCH="[OPTIONAL-CHECK] [ARGUMENT=1]"
>     export UPLOADER_UPLOAD_SERVICE="[OPTIONAL-CHECK] [ARGUMENT=1]"
>     export UPLOADER_UPLOAD_SERVICE_REGION="[OPTIONAL-CHECK] [ARGUMENT=1]"
>     export UPLOADER_UPLOAD_SERVICE_BUCKET="[OPTIONAL-CHECK] [ARGUMENT=1]"
>     export UPLOADER_UPLOAD_SERVICE_ACCESS_KEY_ID="[OPTIONAL-CHECK] [ARGUMENT=1]"
>     export UPLOADER_UPLOAD_SERVICE_ACCESS_KEY_SECRET="[OPTIONAL-CHECK] [ARGUMENT=1]"
>     export UPLOADER_UPLOAD_SERVICE_ACCESS_TC_APP_ID="[OPTIONAL-CHECK] [ARGUMENT=1]"
>   "
> JSON Usage:
>   {
>     "uploaderConfig": [ "[OPTIONAL] [ARGUMENT=1]" ],
>     "uploaderHelp": [ "[OPTIONAL]" ],
>     "uploaderVersion": [ "[OPTIONAL]" ],
>     "uploaderQuiet": [ "[OPTIONAL]" ],
>     "uploaderUploadPlatform": [ "[OPTIONAL] [ARGUMENT=1]" ],
>     "uploaderUploadInputPath": [ "[OPTIONAL-CHECK] [ARGUMENT=1]" ],
>     "uploaderUploadVersion": [ "[OPTIONAL-CHECK] [ARGUMENT=1]" ],
>     "uploaderUploadLocale": [ "[OPTIONAL-CHECK] [ARGUMENT=1]" ],
>     "uploaderUploadArch": [ "[OPTIONAL-CHECK] [ARGUMENT=1]" ],
>     "uploaderUploadService": [ "[OPTIONAL-CHECK] [ARGUMENT=1]" ],
>     "uploaderUploadServiceRegion": [ "[OPTIONAL-CHECK] [ARGUMENT=1]" ],
>     "uploaderUploadServiceBucket": [ "[OPTIONAL-CHECK] [ARGUMENT=1]" ],
>     "uploaderUploadServiceAccessKeyId": [ "[OPTIONAL-CHECK] [ARGUMENT=1]" ],
>     "uploaderUploadServiceAccessKeySecret": [ "[OPTIONAL-CHECK] [ARGUMENT=1]" ],
>     "uploaderUploadServiceAccessTcAppId": [ "[OPTIONAL-CHECK] [ARGUMENT=1]" ],
>   }
> ```
