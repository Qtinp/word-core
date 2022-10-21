import { regList } from './iirose'
// import { messageReg } from './qq

export const messageReg = () => {
    let outRegList: {list:(string | RegExp)[][], item:RegExp} = {
        list: [],
        item: RegExp('')
    }

    let item = ''
    regList.forEach(element => {
        
        outRegList.list.push([element[0], element[1]]) 
        const str = element[0].toString()
        item = item + '|' + str.slice(1, str.length - 1)
    })

    outRegList.item = RegExp(item.substr(1))
    
    return outRegList
}
