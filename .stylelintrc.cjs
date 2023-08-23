// @see: https://stylelint.io

module.exports = {
  root: true,
  extends: [
    // 配置样式扩展
    'stylelint-config-standard',
    // 配置stylelint css属性书写顺序插件
    'stylelint-config-recess-order',
  ],
  overrides: [
    // 扫描 .html/less 文件 styles
    {
      files: ['**/*.html'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
  rules: {
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'color-hex-length': 'long', // 指定 16 进制颜色的简写或扩写 "short(16进制简写)"|"long(16进制扩写)"
    'rule-empty-line-before': 'always-multi-line', // 要求或禁止在规则之前的空行 "always(规则之前必须始终有一个空行)"|"never(规则前绝不能有空行)"|"always-multi-line(多行规则之前必须始终有一个空行)"|"never-multi-line(多行规则之前绝不能有空行。)"
    'font-family-no-missing-generic-family-keyword': null, // 禁止在字体族名称列表中缺少通用字体族关键字
    'no-empty-source': null, // 禁止空源码
    'selector-class-pattern': null, // 强制选择器类名的格式
    'value-no-vendor-prefix': null, // 关闭 vendor-prefix(为了解决多行省略 -webkit-box)
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'custom-property-pattern': null, // 为自定义属性指定一个模式。
    'media-feature-range-notation': null, // 保持一致的媒体查询表示法
    // 不允许未知的伪类选择器。
    'selector-pseudo-class-no-unknown': [
      true,
      {
        // 忽略 global
        ignorePseudoClasses: ['global'],
      },
    ],
  },
  ignoreFiles: ['**/.js', '/*.jsx', '/.tsx', '**/.ts'],
}
