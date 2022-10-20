import Editor from './Editor/index'
import { driver } from './Driver'

const dir = './data'
const editor = new Editor(dir)

const cacheObj = editor.getCacheWord()
driver.config(cacheObj, dir)

