
# 通用型机器人问答核心
***

# 文件结构
```
word             
├─ CloudBlack           云黑系统（未完成）
├─ Driver               驱动系统（解释器）
│  ├─ api       
│  │  └─ index.ts       语法解释器
│  └─ index.ts          词库检索器
├─ Editor               词库编辑系统
│  └─ index.ts          词库库编辑器
├─ Function             外置函数
│  ├─ Config            运行配置
│  │  ├─ conventional   常用配置
│  │  │  └─ index.ts    配置文件
│  │  └─ regList
│  │     ├─ iirose.ts   i站标识配置
│  │     └─ index.ts    标识配置导入
│  ├─ execute
│  │  └─ index.ts       词库语法触发函数器
│  ├─ initiative    
│  │  └─ test.ts        外置词库触发器
│  └─ ts                外置ts插件
├─ index.ts             主入口函数
├─ Permissions          
│  └─ index.ts          权限系统
└─ Tools
   └─ index.ts          常用工具函数

```

***

# 词库系统简介

## 工作原理

词库——问答系统，此系统可以使机器人获得关键词触发回复的能力。

如：

`editor.add('你好', '你也好...!', '编辑者昵称')`

添加一条词库，触发词是`你好`，回复是`你也好...!`

<br/>

`driver.mainStart('你好', {})`

触发“你好”，这个触发词

<br/>

`console.log(driver.mainStart('你好', {}))`

触发“你好”，这个触发词，并输出结果

<br/>

## 快速入门

1. 将`Function/Config/conventional/inex.ts`文件进行配置
2. 运行`npm run test`启动

## 词库语法

在回复内，我们支持使用词库的语法，语法如下:

`$语法名 参数$`

语法名：	必须为2字，如`添加`

参数：		可为多个，但必须以空格作为分隔

实例：		`$添加 小鱼干 10$`

<br/>

**语法支持嵌套**

实例：		`$添加 小鱼干 $添加 小鱼干 10$$`

***

注意！当回复词内出现`aaaaaa $添加 小鱼干 10$ bbb`

这样的语法的时候，会运行位于`Function/execute/index.ts`的文件

```
'添加': (inData: any, playData: any) => {
  // 此时inData为['添加', '小鱼干', '10']
  return 'ccccc'
}
```

接收到return的数据后，原回复词会从`aaaaaa $添加 小鱼干 10$ bbb`中的此语句会变为return的字符串，即：`aaaaaa ccccc bbb`

## 可扩展触发词（词库触发器）

在`Function/initiative`内的所有文件会被加载

<br/>

引入`import { initiative } from '../../index'`

intiative是一个触发语句的函数，它可以触发`editor.whenOn`添加的触发词，此函数执行后的return的结果是全词库的`whenOn`关键词的结果

***