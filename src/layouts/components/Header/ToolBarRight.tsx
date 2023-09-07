import ComponentSize from './components/ComponentSize'
import Language from './components/Language'
import SearchMenu from './components/SearchMenu'
import Message from './components/Message'
import Fullscreen from './components/Fullscreen'

const ToolBarRight: React.FC = () => {
  return (
    <div className='tool-bar-ri'>
      <div className='header-icon'>
        <ComponentSize />
        <Language />
        <SearchMenu />
        <Message />
        <Fullscreen />
      </div>
    </div>
  )
}

export default ToolBarRight
