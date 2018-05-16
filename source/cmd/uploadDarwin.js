import { verifyInputFile, bucketUpload } from './function'

const KEY_PREFIX = 'darwin/'

const uploadDarwin = async (bucketService, { inputPath, version, locale, publicUrlPrefix, isForce }, log) => {
  const nameInstaller = `MockingBot-darwin-x64-${locale}-${version}.dmg`
  const namePack = `MockingBot-darwin-x64-${locale}-${version}.zip`
  const nameUpdateIndex = `Update.json`

  const fileInstaller = await verifyInputFile(inputPath, nameInstaller)
  const filePack = await verifyInputFile(inputPath, namePack)
  const bufferUpdateIndex = Buffer.from(JSON.stringify({ url: `${publicUrlPrefix}${KEY_PREFIX}${namePack}` }))

  await bucketUpload(bucketService, { file: fileInstaller, key: `${KEY_PREFIX}${nameInstaller}`, copyKey: `${KEY_PREFIX}MockingBot.dmg`, isSkipUploaded: !isForce }, log)
  await bucketUpload(bucketService, { file: filePack, key: `${KEY_PREFIX}${namePack}`, isSkipUploaded: !isForce }, log)
  await bucketUpload(bucketService, { buffer: bufferUpdateIndex, key: `${KEY_PREFIX}${nameUpdateIndex}` }, log)
}

export { uploadDarwin }
