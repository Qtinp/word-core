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

        item = item + '|' + element[0].toString()
    })

    outRegList.item = RegExp(item.substr(1))
    
    return outRegList
}
