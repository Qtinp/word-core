import * as fs from 'fs'
import * as path from 'path'


export const command = {
    /**
    * 返回一个文件的json对象
    * @param dir data文件目录
    * @param list 词库文件目录（wordConfig/userData/wordList/recycleBin）
    * @param name 词库文件名
    * @return 词库json对象
    */
    getjson: (dir: string, list: string, name: string) => {
        const wordPath = path.join(dir, `./word/${list}/${name}.json`)
        if (!fs.existsSync(wordPath)) {
            fs.writeFileSync(wordPath, '{}')
        }

        return JSON.parse(fs.readFileSync(wordPath).toString())
    },
    /**
    * 将词库json对象存储在文件内
    * @param dir data文件目录
    * @param list 词库文件目录
    * @param name 词库文件名
    * @param file 词库json对象
    */
    update: (dir: string, list: string, name: string, file: { [key: string]: any }) => {
        try {
            fs.writeFileSync(path.join(dir, `./word/${list}/${name}.json`), JSON.stringify(file, null, 3))
        } catch (error) {
        }
    }
}

export const wordCommand = {
    /**
     * 获取全局数据
     * @param dir data文件目录
     * @returns 结果
     */
    getCacheWord: (dir: string) => {
        const wordListArr = fs.readdirSync(path.join(dir, 'word/wordList'))
        const recycleBinArr = fs.readFileSync(path.join(dir, 'word/recycleBin'))
        const CacheObj: { [key: string]: any } = {}
        CacheObj['recycleBinList'] = recycleBinArr
        CacheObj['keys'] = []
        CacheObj['passive'] = {}

        for (const a of wordListArr) {
            const name = a.replace('.json', '')
            const data = command.getjson(dir, 'wordList', name)
            const keysArr = Object.keys(data.main)
            const initiativeKey = Object.keys(data.initiative)

            if (!CacheObj['wordList']) { CacheObj['wordList'] = [] } // 将本词库名放入缓存
            CacheObj['wordList'].push(name)

            for (const item of keysArr) {
                if (!CacheObj['passive'][item]) { CacheObj['passive'][item] = [] }
                CacheObj['passive'][item].push(name) // 将此触发词所在的词库放入缓存

                if (CacheObj['keys'].indexOf(item) < 0) { CacheObj['keys'].push(item) }
            }

            for (const item2 of initiativeKey) {
                if (!CacheObj['initiative'][item2]) { CacheObj['initiative'][item2] = [] }
                CacheObj['initiative'][item2].concat(data['initiative'][item2])
            }
        }
        return CacheObj
    }
}
