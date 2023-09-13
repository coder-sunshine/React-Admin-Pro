// @see: http://eslint.cn

module.exports = {
  // 标识当前配置文件为eslint的根配置文件，让其停止在父级目录中继续寻找。
  root: true,
  // 环境:
  env: {
    // 浏览器
    browser: true,
    // node 环境
    node: true,
    // es6
    es6: true,
  },
  // eslint 会对我们的代码进行检验
  // parser的作用是将我们写的代码转换为ESTree（AST）
  // ESLint会对ESTree进行校验
  parser: '@typescript-eslint/parser',
  // 解析器的配置项 --> 优先级低于 parse 的语法解析配置
  parserOptions: {
    // es的版本号，或者年份都可以，默认es5
    ecmaVersion: 'latest',
    // 源码类型 默认是script，es模块用module
    sourceType: 'module',
    jsxPragma: 'React',
    // 额外的语言类型
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  // 定义全局变量
  globals: {},
  // 插件
  // 插件名忽略了「eslint-plugin-」前缀，所以在package.json中，对应的项目名是 eslint-plugin-xxx
  plugins: ['react', '@typescript-eslint', 'prettier'],
  /**
   * 扩展的eslint规范语法，可以被继承的规则
   * 字符串数组：每个配置继承它前面的配置
   * 规则继承 es的内置规则有且只有一个 "eslint:recommended"，
   * 从插件中获取的引入规则是 「plugin:插件包名/配置名」，忽略前缀"plugin:prettier/recommended"
   */
  extends: [
    'eslint:recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  // 共享设置
  settings: {
    // 让 ESLint 自动检测并适配项目中所使用的 React 版本，确保代码检查的准确性和一致性。
    react: {
      version: 'detect',
    },
    /**
     *
     * 注意，「import/resolver」并不是eslint规则项，与rules中的「import/extensions」不同。它不是规则项
     * 这里只是一个参数名，叫「import/resolver」，会传递给每个规则项。
     * settings并没有具体的书写规则，「import/」只是import模块自己起的名字，原则上，它直接命名为「resolver」也可以，加上「import」只是为了更好地区分。不是强制设置的。
     * 因为「import」插件很多规则项都用的这个配置项，所以并没有通过rules设置，而是通过settings共享
     * 具体使用方法可参考https://github.com/benmosher/eslint-plugin-import
     */
    'import/reslover': {
      // 别名配置  @ --> ./src
      // 用于让ESLint了解项目在路径等方面的设置。
      alias: {
        map: [['@', './src']],
      },
    },
  },
  /**
   * 自定义规则，覆盖上面extends继承的第三方库的规则，根据组内成员灵活定义
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行
    'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
    'prefer-const': 'off', // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
    'no-debugger': 'off', // 禁用 debugger

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
    '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
    '@typescript-eslint/ban-ts-comment': 'error', // 禁止 @ts-<directive> 使用注释或要求在指令后进行描述
    '@typescript-eslint/no-inferrable-types': 'off', // 可以轻松推断的显式类型可能会增加不必要的冗长
    '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/ban-types': 'off', // 禁止使用特定类型
    '@typescript-eslint/no-var-requires': 'off', // 允许使用 require() 函数导入模块
    '@typescript-eslint/no-empty-function': 'off', // 禁止空函数
    '@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)

    // react (https://github.com/jsx-eslint/eslint-plugin-react)
    'react-hooks/rules-of-hooks': 'error', // 确保在组件或自定义钩子的顶层调用钩子
    'react-hooks/exhaustive-deps': 'off', // useEffect和useCallback钩子的依赖关系不需要是详尽的
  },
}
