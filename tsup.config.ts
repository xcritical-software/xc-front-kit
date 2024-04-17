import { defineConfig, Options } from 'tsup'
import path from 'path'
import fs from 'fs'

function writeCommonJSEntry() {
  fs.writeFileSync(
    path.join('dist/', 'index.js'),
    `'use strict'
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/index.production.min.cjs')
} else {
  module.exports = require('./cjs/index.development.cjs')
}`
  )
}

export default (pkg) => defineConfig((options) => {
    const commonOptions: Partial<Options> = {
      entry: {
        'index': 'src/index.ts',
      },
      sourcemap: false,
      target: 'es2020',
      
      ...options,
    }
    return [
      // Standard ESM, embedded `process.env.NODE_ENV` checks
      {
        ...commonOptions,
        outExtension: () => ({ js: '.mjs', dts: '.d.ts' }),
        experimentalDts: {
          entry: {"typings":'src/index.ts' } ,
        },
        
        clean: true,
      },
      
      // Support Webpack 4 by pointing `"module"` to a file with a `.js` extension
      {
        ...commonOptions,
        entry: {
          [pkg.module.replace('dist/','').replace('.js','')]: 'src/index.ts',
        },
        target: 'es2017',
        format: ['esm'],
       
        outExtension: () => ({ js: '.js', dts: '.d.ts'}),
      },
      
      // CJS development
      {
        ...commonOptions,
        entry: {
          'index.development': 'src/index.ts',
        },
        define: {
          'process.env.NODE_ENV': JSON.stringify('development'),
        },
        format: 'cjs',
        outDir: './dist/cjs/',
        outExtension: () => ({ js: '.cjs' }),
      },
      // CJS production
      {
        ...commonOptions,
        entry: {
          'index.production.min': 'src/index.ts',
        },
        define: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
        format: 'cjs',
        outDir: './dist/cjs/',
        outExtension: () => ({ js: '.cjs' }),
        minify: true,
        onSuccess: () => {
          writeCommonJSEntry()
        },
      },
    ]
  })