import ComponentSize from './components/ComponentSize'
import Language from './components/Language'
import SearchMenu from './components/SearchMenu'

const ToolBarRight: React.FC = () => {
  return (
    <div className='tool-bar-ri'>
      <div className='header-icon'>
        <ComponentSize />
        <Language />
        <SearchMenu />
      </div>
    </div>
  )
}

export default ToolBarRight
