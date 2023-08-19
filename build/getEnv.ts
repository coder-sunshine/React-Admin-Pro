// 读取所有环境变量配置文件到process.env --> 并处理特殊值
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {}
  for (const envName of Object.keys(envConf)) {
    // 将其中的 "\n" 替换成实际的换行符 "\n"
    let realValue = envConf[envName].replace(/\\n/g, '\n')
    // 因为传进来的是字符串，需要把布尔值的字符串转换成真正的布尔值
    realValue = realValue === 'true' ? true : realValue === 'false' ? false : realValue
    // 把端口转化成数字
    if (envName === 'VITE_PORT') realValue = Number(realValue)
    if (envName === 'VITE_PROXY') {
      try {
        realValue = JSON.parse(realValue)
      } catch (error) {
        console.log(error)
      }
    }
    ret[envName] = realValue
  }
  return ret
}
