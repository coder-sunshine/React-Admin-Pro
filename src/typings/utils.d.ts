// 注：
// .d.ts文件顶级声明declare最好不要跟export同级使用，不然在其他ts引用这个.d.ts的内容的时候，就需要手动import导入了
// .d.ts文件里如果顶级声明不用export的话，declare和直接写type、interface效果是一样的，在其他地方都可以直接引用

type objToKeyValUnion<T> = {
  [K in keyof T]: { key: K; value: T[K] }
}[keyof T]
