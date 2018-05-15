import { resolve } from 'path'
import { ACCESS_TYPE } from 'bucket-sdk'
import { readFileAsync, statAsync } from 'dr-js/module/node/file/function'

const verifyInputFile = async (...args) => {
  const path = resolve(...args)
  const stat = await statAsync(path).catch((error) => { throw new Error(`[verifyInputFile] invalid file: ${path}, ${error}`) })
  if (!stat.isFile()) throw new Error(`[verifyInputFile] invalid file: ${path}`)
  return path
}

const bucketUpload = async (bucketService, { file, key, copyKey, isSkipUploaded = false }, log) => {
  __DEV__ && console.log('[bucketUpload]', file, key, copyKey, isSkipUploaded)

  if (isSkipUploaded) {
    const { bufferList } = await bucketService.getBufferList(key)
    __DEV__ && console.log('[bucketUpload]', bufferList)
    if (bufferList.find((v) => v.key === key)) {
      log(`[bucketUpload] skip existing: ${key}\n${JSON.stringify(bufferList)}`)
      return // consider this uploaded
    }
  }

  log(`[bucketUpload] uploading: ${key}`)
  const sourceInfo = await bucketService.putBuffer(key, await readFileAsync(file), ACCESS_TYPE.PUBLIC_READ)
  log(`[bucketUpload] uploaded: ${key}, eTag: ${sourceInfo.eTag}`)

  copyKey && log(`[bucketUpload] copy to: ${copyKey}, from: ${key}`)
  copyKey && await bucketService.copyBuffer(copyKey, sourceInfo, ACCESS_TYPE.PUBLIC_READ)
  copyKey && log(`[bucketUpload] copied to: ${copyKey}`)
}

export {
  verifyInputFile,
  bucketUpload
}
