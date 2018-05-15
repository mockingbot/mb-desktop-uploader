import { verifyInputFile, bucketUpload } from './function'

const KEY_PREFIX = 'darwin/'

const uploadDarwin = async (bucketService, { inputPath, version, locale }, log) => {
  const nameInstaller = `MockingBot-darwin-x64-${locale}-${version}.dmg`
  const namePack = `MockingBot-darwin-x64-${locale}-${version}.zip`

  const fileInstaller = await verifyInputFile(inputPath, nameInstaller)
  const filePack = await verifyInputFile(inputPath, namePack)

  await bucketUpload(bucketService, { file: fileInstaller, key: `${KEY_PREFIX}${nameInstaller}`, copyKey: `${KEY_PREFIX}MockingBot.dmg` }, log)
  await bucketUpload(bucketService, { file: filePack, key: `${KEY_PREFIX}${namePack}` }, log)
}

export { uploadDarwin }
