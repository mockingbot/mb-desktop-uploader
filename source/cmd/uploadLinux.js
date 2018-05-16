import { verifyInputFile, bucketUpload } from './function'

const KEY_PREFIX = 'linux/'

const uploadLinux = async (bucketService, { inputPath, version }, log) => {
  const nameInstaller64 = `MockingBot_${version}_amd64.deb`
  const nameInstaller32 = `MockingBot_${version}_i386.deb`

  const fileInstaller64 = await verifyInputFile(inputPath, nameInstaller64)
  const fileInstaller32 = await verifyInputFile(inputPath, nameInstaller32)

  await bucketUpload(bucketService, { file: fileInstaller64, key: `${KEY_PREFIX}${nameInstaller64}`, copyKey: `${KEY_PREFIX}MockingBot_amd64.deb`, isSkipUploaded: true }, log)
  await bucketUpload(bucketService, { file: fileInstaller32, key: `${KEY_PREFIX}${nameInstaller32}`, copyKey: `${KEY_PREFIX}MockingBot_i386.deb`, isSkipUploaded: true }, log)
}

export { uploadLinux }
