import ComponentSize from './components/ComponentSize'
import Language from './components/Language'
import SearchMenu from './components/SearchMenu'
import Message from './components/Message'

const ToolBarRight: React.FC = () => {
  return (
    <div className='tool-bar-ri'>
      <div className='header-icon'>
        <ComponentSize />
        <Language />
        <SearchMenu />
        <Message />
      </div>
    </div>
  )
}

export default ToolBarRight
