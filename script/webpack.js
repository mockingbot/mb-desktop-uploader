import { resolve as resolvePath } from 'path'
import { DefinePlugin } from 'webpack'

import { argvFlag, runMain } from 'dev-dep-tool/library/main'
import { getLogger } from 'dev-dep-tool/library/logger'
import { compileWithWebpack, commonFlag } from 'dev-dep-tool/library/webpack'

const PATH_ROOT = resolvePath(__dirname, '..')
const PATH_OUTPUT = resolvePath(__dirname, '../output-gitignore')
const fromRoot = (...args) => resolvePath(PATH_ROOT, ...args)
const fromOutput = (...args) => resolvePath(PATH_OUTPUT, ...args)

runMain(async (logger) => {
  const { mode, isWatch, isProduction, profileOutput, assetMapOutput } = await commonFlag({ argvFlag, fromRoot, logger })

  const babelOption = {
    configFile: false,
    babelrc: false,
    cacheDirectory: isProduction,
    presets: [ [ '@babel/env', { targets: { node: '8.8' }, modules: false } ] ]
  }

  const config = {
    mode,
    bail: isProduction,
    target: 'node', // support node main modules like 'fs'
    output: { path: fromOutput('library'), filename: '[name].js' },
    entry: { index: 'source/index' },
    resolve: { alias: { source: fromRoot('source') } },
    module: { rules: [ { test: /\.js$/, use: [ { loader: 'babel-loader', options: babelOption } ] } ] },
    plugins: [ new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(mode), '__DEV__': !isProduction }) ],
    optimization: { minimize: false }
  }

  logger.padLog(`compile with webpack mode: ${mode}, isWatch: ${Boolean(isWatch)}`)
  await compileWithWebpack({ config, isWatch, profileOutput, assetMapOutput, logger })
}, getLogger(`webpack`))
