import { connectAwsBucket, connectOssBucket, connectTcBucket } from 'bucket-sdk'
import { clock } from 'dr-js/module/common/time'
import { time as formatTime } from 'dr-js/module/common/format'
import { parseOption, formatUsage } from './option'
import { uploadLinux } from './cmd/uploadLinux'
import { uploadWin32 } from './cmd/uploadWin32'
import { uploadDarwin } from './cmd/uploadDarwin'
import { name as packageName, version as packageVersion } from '../package.json'

const initBucketService = async (getSingleOption, log) => {
  const uploadService = getSingleOption('upload-service')
  const uploadServiceRegion = getSingleOption('upload-service-region')
  const uploadServiceBucket = getSingleOption('upload-service-bucket')
  const uploadServiceAccessKeyId = getSingleOption('upload-service-access-key-id')
  const uploadServiceAccessKeySecret = getSingleOption('upload-service-access-key-secret')

  __DEV__ && console.log({
    uploadService,
    uploadServiceRegion,
    uploadServiceBucket,
    uploadServiceAccessKeyId,
    uploadServiceAccessKeySecret
  })

  const isServiceAws = uploadService === 'aws'
  const isServiceOss = uploadService === 'oss'
  const isServiceTc = uploadService === 'tc'

  if (!isServiceAws && !isServiceOss && !isServiceTc) throw new Error('service not specified')

  log(`[Bucket] ${isServiceAws ? 'AWS' : isServiceOss ? 'OSS' : 'TC'}: ${uploadServiceBucket} (${uploadServiceRegion})`)

  return isServiceAws ? connectAwsBucket({
    accessKeyId: uploadServiceAccessKeyId,
    secretAccessKey: uploadServiceAccessKeySecret,
    region: uploadServiceRegion,
    bucket: uploadServiceBucket
  }) : isServiceOss ? connectOssBucket({
    accessKeyId: uploadServiceAccessKeyId,
    accessKeySecret: uploadServiceAccessKeySecret,
    region: uploadServiceRegion,
    bucket: uploadServiceBucket
  }) : isServiceTc ? connectTcBucket({
    appId: getSingleOption('upload-service-access-tc-app-id'),
    secretId: uploadServiceAccessKeyId,
    secretKey: uploadServiceAccessKeySecret,
    region: uploadServiceRegion,
    bucket: uploadServiceBucket
  }) : null
}

const upload = async (uploadPlatform, { getOptionOptional, getSingleOption, getSingleOptionOptional }, log) => {
  const bucketService = await initBucketService(getSingleOption, log)
  const uploadConfig = {
    inputPath: getSingleOption('upload-input-path'),
    version: getSingleOption('upload-version'),
    locale: getSingleOptionOptional('upload-locale'),
    arch: getSingleOptionOptional('upload-arch'),
    publicUrlPrefix: getSingleOptionOptional('upload-public-url-prefix'),
    isForce: Boolean(getOptionOptional('force'))
  }

  log(`[Info] platform: ${uploadPlatform} ${JSON.stringify(uploadConfig, null, ' ')}`)

  if (uploadPlatform === 'linux') return uploadLinux(bucketService, uploadConfig, log)
  if (uploadPlatform === 'win32') return uploadWin32(bucketService, uploadConfig, log)
  if (uploadPlatform === 'darwin') return uploadDarwin(bucketService, uploadConfig, log)
}

const main = async () => {
  const optionData = await parseOption()
  const uploadPlatform = optionData.getSingleOptionOptional('upload-platform')
  const log = optionData.getOptionOptional('quiet') ? () => {} : console.log

  if (!uploadPlatform) {
    return optionData.getOptionOptional('version')
      ? console.log(JSON.stringify({ packageName, packageVersion }, null, '  '))
      : console.log(formatUsage(null, optionData.getOptionOptional('help') ? null : 'simple'))
  }

  let prevTime = clock()
  const logWithTime = (...args) => {
    const deltaTime = clock() - prevTime
    prevTime += deltaTime
    log(...args, `(+${formatTime(deltaTime)})`)
  }

  await upload(uploadPlatform, optionData, logWithTime).catch((error) => {
    console.warn(`[Error] for platform: ${uploadPlatform}:`, error.stack || error)
    process.exit(2)
  })
}

main().catch((error) => {
  console.warn(formatUsage(error.stack || error, 'simple'))
  process.exit(1)
})
