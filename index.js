const exec = require('child_process').exec
const async = require('async')
const curent = require('./package.json')

const getVersionReplace = (version) => {
    return version.replace(/[`~^<>=]/gi, '')
}

var updatePackage = []

async.eachSeries(Object.keys(curent.dependencies), (package, callback) => {
    exec(`npm install --save ${package}`, (error, stdout, stderr) => {
        if (error !== null)
            console.error(`exec error: ${error}`)

        if (stdout.substring(package.length + 3, stdout.indexOf('updated') - 1) != getVersionReplace(curent.dependencies[package]))
            updatePackage.push(package)

        callback()
    })
}, () => {
    console.log(`Upgraded Packages: ${updatePackage.join(', ')}`)
})

