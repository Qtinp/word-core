import Editor from './Editor/index'
import  Driver from './Driver'
import fs from 'fs'
import path from 'path'

// 加载额外主动库
fs.readdirSync(path.join('../Function/initiative/')).forEach((value)=>{ require(path.join('../Function/initiative/', value)) })

const dir = './data'
const editor = new Editor(dir)

const cacheObj = editor.getCacheWord()
const driver = new Driver(cacheObj, dir)

export const initiative = (q:string, playData: { [key: string]: any }) => {driver.initiativeStart(q, playData)}


