import { resolve } from 'path'
import { ACCESS_TYPE } from 'bucket-sdk'
import { withRetryAsync } from 'dr-js/module/common/function'
import { binary } from 'dr-js/module/common/format'
import { readFileAsync, statAsync } from 'dr-js/module/node/file/function'

const verifyInputFile = async (...args) => {
  const path = resolve(...args)
  const stat = await statAsync(path).catch((error) => { throw new Error(`[verifyInputFile] invalid file: ${path}, ${error}`) })
  if (!stat.isFile()) throw new Error(`[verifyInputFile] invalid file: ${path}`)
  return path
}

const bucketUpload = async (bucketService, { file, buffer, key, copyKey, isSkipUploaded = false }, log) => {
  __DEV__ && console.log('[bucketUpload]', file, key, copyKey, isSkipUploaded)
  try {
    if (isSkipUploaded) {
      const { bufferList } = await wrapRetry(bucketService.getBufferList, key)
      __DEV__ && console.log('[bucketUpload]', bufferList)
      if (bufferList.find((v) => v.key === key)) {
        log(`[skip] existing: ${key}\n${JSON.stringify(bufferList)}`)
        return // consider this uploaded
      }
    }

    buffer = buffer || await readFileAsync(file)
    log(` - upload: ${key} (${binary(buffer.length)}B)`)
    const sourceInfo = await wrapRetry(bucketService.putBuffer, key, buffer, ACCESS_TYPE.PUBLIC_READ)
    log(` - uploaded: ${key}, eTag: ${sourceInfo.eTag}`)

    copyKey && log(` - copy to: ${copyKey}, from: ${key}`)
    copyKey && await wrapRetry(bucketService.copyBuffer, copyKey, sourceInfo, ACCESS_TYPE.PUBLIC_READ)
    copyKey && log(` - copied to: ${copyKey}`)
  } catch (error) {
    console.error(`[error] upload failed for: ${JSON.stringify({ file, key, copyKey, isSkipUploaded })}`)
    throw error
  }
}

const wrapRetry = async (func, ...args) => withRetryAsync((failed, maxRetry) => {
  failed && console.warn(`[retry] ${failed} of ${maxRetry}`)
  return func(...args)
}, 3, 50)

export {
  verifyInputFile,
  bucketUpload
}
