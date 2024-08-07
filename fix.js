/*
  This is used to fix a bug in Metro that prevents NativeWind from being applied on web in Windows, which crashes the compiler.
  See: https://github.com/nativewind/nativewind/pull/860
*/

const fs = require('node:fs')
const path = require('node:path')

const filePath = path.join('.', 'node_modules', 'nativewind', 'dist', 'metro', 'transformer.js')
const globalsPath = path.join('.', 'node_modules', '.cache', 'nativewind', 'global.css')
const cacheDirPath = path.join('.', 'node_modules', '.cache', 'nativewind')

fs.mkdir(cacheDirPath, { recursive: true }, (err) => {
  if (err) {
    console.error('Erro ao criar o diretório:', err)
    return
  }

  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      console.error(err)
      return
    }

    const cjsIssue = "`require('${config.nativewind.output}');`"
    const ecsIssue = "`import '${config.nativewind.output}'`"

    if (!content.includes(cjsIssue) && !content.includes(ecsIssue)) {
      return console.log('🎉 NativeWind fix already applied!')
    }

    const fix = "`require('${config.nativewind.output.replace(/\\\\/g, '\\\\\\\\')}');`"

    let updatedContent = content.replace(cjsIssue, fix)
    updatedContent = updatedContent.replace(ecsIssue, fix)

    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
      if (err) {
        return console.error(err)
      }
      console.log('🎉 NativeWind fix applied successfully!')
    })
  })

  const srcPath = path.join(__dirname, 'global.web.css')
  fs.copyFile(srcPath, globalsPath, (err) => {
    if (err) {
      return console.error(err)
    }
    console.log('🎉 NativeWind fix globals.css applied successfully!')
  })
})
