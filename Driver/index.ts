import * as fs from 'fs'
import * as path from 'path'
import * as api from '../Tools/index'
import { messageReg } from '../Function/regList/index'
/**
* 返回一个文件的json对象
* @param list 词库文件目录（wordConfig/userData/wordList/recycleBin）
* @param name 词库文件名
* @return 词库json对象
*/
const getjson = (list: string, name: string) => { return api.command.getjson(dir, list, name) }

/**
* 将词库json对象存储在文件内
* @param list 词库文件目录
* @param name 词库文件名
* @param file 词库json对象
*/
const update = (list: string, name: string, file: any) => { return api.command.update(dir, list, name, file) }

/**
 * 生成随机数
 * @param n 区间a
 * @param m 区间b
 * @returns 结果
 */
const random = (n: number, m: number) => { return api.command.random(n, m) }

let wordCache: { [key: string]: any }

let dir: string

export default class {
  /**
   * 配置基础信息
   * @param cache 
   * @param dataDir 
   */
  constructor(cache: { [key: string]: any }, dataDir: string) {
    wordCache = cache
    dir = dataDir
  }

  /**
   * 开始被动查找问
   * @param q 源问
   * @param playerData 当前玩家数据
   * @returns 结果
   */
  mainStart(q: string, playerData: any) {

    const arrCache = messageReg()
    while (arrCache.item.test(q)) {
      for (let a of arrCache.list) {
        const reg: RegExp = a[0]
        const txt: string = a[1]
        const index: string = a[2]

        const cache = q.match(reg)
        if (cache) {
          q = q.replace(a[0], txt)
          playerData[index] = a[1]
        }

        if (wordCache.passive.indexOf(q) > -1) {
          // wordCache.passive[q]是词库的表接下来要去那些表将他们拼接起来
          return this.start(joint(wordCache.passive[q], q), playerData)
        }
      }
    }
  }
  
  initiativeStart(q: string, playerData: object) {} // 开始主动解析?????
  start(a: string[], playData: any) {

  } // 执行回答

  readPack(dbName: string) { } // 查看xxx词库背包
  readOtherPack() { } //查看某人xxx词库背包

}

/**
 * 拼接多个词库的关键词数组
 * @param list 库表
 * @param q 处理后的关键词
 * @returns 结果
 */
 const joint = (list: string[], q: string) => {
  let outArr: any[] = []
  for (let a of list) {
    const word = getjson('wordList', a)
    outArr = word[q].concat(outArr)
  }
  return outArr
}

/*
  wordCacheObj = {
      passive: { 触发词: [所拥有的词库] }
      keys : [所有的触发词],
      wordList : [所有的库名称],
      recycleBinList: [回收站列表],
      initiative: { 主动触发词:[所拥有的词库] }
    }
*/

/*
  {
    main:{ // 基础存储 },
    author: [ // 编写者 ],
    backpack: [ // 标记物品? ],
    cache: '存储库名',
    initiative: { // 主动词库 },
    function: { // js代码 }
  }
*/

/*
playData = {
  mid: ''
  mname: '',
  yid: '',
  yname: ''
}
*/

