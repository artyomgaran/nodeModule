const fs = require("fs/promises")
const fsSync = require("fs")
const path = require("path")
const base = path.join(__dirname, "temp")

// // создание новой папки then/catch
// fs.mkdir(base).then(() => {
//     console.log('folder created')
// }).catch((err) => {
//     console.log('err', err )
// })

// // создание новой папки try/catch
// async function start () {
//     try {
//        await fs.mkdir(base)
//         console.log('folder created')
//     } catch (err) {
//         console.log('err', err)
//     }
// }


// применение fs sync

const getContent = () => `
\n\r${process.argv[2] ?? ''}
`


async function start () {
    try {
        if (fsSync.existsSync(base)) {
           await fs.appendFile(path.join(base, "log.txt"), getContent())
            const data = await fs.readFile(path.join(base, "log.txt"), {encoding: "utf8"})
            console.log(data)
            console.log(path.basename(__filename))
        } else {
            await fs.mkdir(base)
            await fs.writeFile(path.join(base, "log.txt"), process.argv[2])

        }
    } catch (err) {
        console.log('err', err)
    }
}
start()