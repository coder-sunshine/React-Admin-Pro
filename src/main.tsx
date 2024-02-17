import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'antd/dist/reset.css'
import '@/styles/index.less'
import '@/assets/fonts/font.less'
import '@/assets/iconfont/iconfont.less'
import 'virtual:svg-icons-register'

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
