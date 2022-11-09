import * as api from '../Tools/index'
let dir: string

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

export default class {
  /**
   * 构建权限组(传入位置)
   * @param inDir 数据存储位置
   */
  constructor (inDir: string) {
    dir = inDir
  }

  /**
   * 添加权限
   * @param persName 权限名称
   * @param id 需修改者id
   * @returns 结果
   */
  add (persName: string, id: string) {
    const persObj = getjson('wordConfig', 'permissions')

    if (!persObj[id]) { persObj[id] = [] }
    persObj[id].push(persName)

    update('wordConfig', 'permissions', persObj)

    return ' [词库核心] 权限修改成功 '
  }

  /**
   * 删除权限
   * @param persName 权限名称
   * @param id 需修改者id
   * @returns 返回结果
   */
  del (persName: string, id: string) {
    const persObj = getjson('wordConfig', 'permissions')
    const index = persObj[id].indexOf(persName)

    if (!persObj[id] || index === -1) { return ' [词库核心] 你不存在此权限' }

    persObj[id].splice(index, 1)

    update('wordConfig', 'permissions', persObj)

    return ' [词库核心] 权限修改成功 '
  }
}
