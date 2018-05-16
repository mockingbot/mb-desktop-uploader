import { getOptionalFormatValue } from 'dr-js/module/common/module/Option/preset'
import { ConfigPresetNode, prepareOption } from 'dr-js/module/node/module/Option'

const { SingleString, OneOfString, SinglePath, BooleanFlag, Config } = ConfigPresetNode

const onlyWin32Darwin = getOptionalFormatValue('upload-platform', 'win32', 'darwin')
const onlyWin32 = getOptionalFormatValue('upload-platform', 'win32')
const onlyDarwin = getOptionalFormatValue('upload-platform', 'darwin')

const OPTION_CONFIG = {
  prefixENV: 'uploader',
  prefixJSON: 'uploader',
  formatList: [
    Config,
    { ...BooleanFlag, name: 'help', shortName: 'h' },
    { ...BooleanFlag, name: 'version', shortName: 'v' },
    { ...BooleanFlag, name: 'quiet', shortName: 'q', description: `reduce most logging` },
    {
      ...OneOfString([ 'linux', 'win32', 'darwin' ]),
      optional: true,
      name: 'upload-platform',
      extendFormatList: [
        { ...SinglePath, name: 'upload-input-path' },
        { ...SingleString, name: 'upload-version', description: 'like 0.0.0' },
        { ...OneOfString([ 'zh', 'en' ]), optional: onlyWin32Darwin, name: 'upload-locale', description: 'like zh/en, for win32/darwin' },
        { ...OneOfString([ 'x64', 'ia32' ]), optional: onlyWin32, name: 'upload-arch', description: 'like x64/ia32, for win32' },
        { ...SingleString, optional: onlyDarwin, name: 'upload-public-url-prefix' },
        { ...BooleanFlag, name: 'force', shortName: 'f', description: `do not skip uploaded file` },

        // bucket-sdk
        { ...OneOfString([ 'aws', 'oss', 'tc' ]), name: 'upload-service', shortName: 's' },
        { ...SingleString, name: 'upload-service-region' },
        { ...SingleString, name: 'upload-service-bucket' },
        { ...SingleString, name: 'upload-service-access-key-id' },
        { ...SingleString, name: 'upload-service-access-key-secret' },
        { ...SingleString, optional: true, name: 'upload-service-access-tc-app-id', description: `only for 'tc' bucket` }
      ]
    }
  ]
}

const { parseOption, formatUsage } = prepareOption(OPTION_CONFIG)

export { parseOption, formatUsage }
