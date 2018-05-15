import { readFileSync } from 'fs'
import { verifyInputFile, bucketUpload } from './function'

const uploadWin32 = async (bucketService, { inputPath, version, locale, arch }, log) => {
  const KEY_PREFIX = `win32-${arch}/`

  const nameRelease = `RELEASES`
  const nameInstaller = `MockingBot-win32-${arch}-${locale}-${version}.exe`
  const namePackFull = `MockingBot-${version}-full.nupkg`
  const namePackDelta = `MockingBot-${version}-delta.nupkg` // optional

  const fileRelease = await verifyInputFile(inputPath, nameRelease)
  const fileInstaller = await verifyInputFile(inputPath, nameInstaller)
  const filePackFull = await verifyInputFile(inputPath, namePackFull)
  const hasPackDelta = readFileSync(fileRelease, { encoding: 'utf8' }).includes(namePackDelta)
  const filePackDelta = hasPackDelta && await verifyInputFile(inputPath, namePackDelta)

  await bucketUpload(bucketService, { file: fileInstaller, key: `${KEY_PREFIX}${nameInstaller}`, copyKey: `${KEY_PREFIX}MockingBot-Setup.exe` }, log)
  await bucketUpload(bucketService, { file: filePackFull, key: `${KEY_PREFIX}${namePackFull}` }, log)
  hasPackDelta && await bucketUpload(bucketService, { file: filePackDelta, key: `${KEY_PREFIX}${namePackDelta}` }, log)
  await bucketUpload(bucketService, { file: fileRelease, key: `${KEY_PREFIX}${nameRelease}` }, log)
}

export { uploadWin32 }
