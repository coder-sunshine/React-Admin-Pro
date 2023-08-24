/**
 * @description 全局主题配置
 */
const globalTheme = {
  light: {
    // 自定义全局 CSS 变量
    '--hooks-colorBgContent': '#f5f5f5',
    '--hooks-colorLogoText': '#475768',
    '--hooks-colorTextRegular': '#606266',
    '--hooks-boxShadowAnalysis': '0 5px 20px 0 rgb(50 50 50 / 54%)',
    '--hooks-scrollbarThumb': 'rgba(0, 0, 0, 0.1)',

    // 自定义登录 CSS 变量
    '--hooks-colorBgLoginContainer': '#eeeeee',
    '--hooks-colorBgLoginMain': 'rgb(255 255 255 / 80%)',
    '--hooks-boxShadowLoginForm': '0 2px 10px 2px rgb(0 0 0 / 10%)',
  },
  dark: {
    // 自定义全局 CSS 变量
    '--hooks-colorBgContent': '#0d0d0d',
    '--hooks-colorLogoText': '#f1f1f1',
    '--hooks-colorTextRegular': '#CFD3DC',
    '--hooks-boxShadowAnalysis': '0 3px 20px 0 rgb(255 255 255 / 35%)',
    '--hooks-scrollbarThumb': 'rgba(255, 255, 255, 0.1)',

    // 自定义登录 CSS 变量
    '--hooks-colorBgLoginContainer': '#191919',
    '--hooks-colorBgLoginMain': 'rgb(0 0 0 / 80%)',
    '--hooks-boxShadowLoginForm': '0 2px 10px 2px rgb(255 255 255 / 12%)',
  },
}

export default globalTheme
