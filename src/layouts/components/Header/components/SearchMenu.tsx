import { useEffect, useMemo, useRef, useState } from 'react'
import { Empty, Input, InputRef, Modal } from 'antd'
import { EnterOutlined, SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'ahooks'
import { RootState, useSelector } from '@/redux'
import { Icon } from '@/components/Icon'
import { RouteObjectType } from '@/routers/interface'

const SearchMenu: React.FC = () => {
  const navigate = useNavigate()
  const flatMenuList = useSelector((state: RootState) => state.auth.flatMenuList)

  const inputRef = useRef<InputRef>(null)
  const menuListRef = useRef<HTMLDivElement>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [activePath, setActivePath] = useState('')

  const debouncedSearchValue = useDebounce(searchValue, { wait: 300 })

  const showModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // 需要使用useMemo优化，不然下面列表变化保持第一个高亮导致bug
  const searchList = useMemo(() => {
    return debouncedSearchValue
      ? flatMenuList.filter(
          item =>
            (item.path!.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
              item.meta!.title!.toLowerCase().includes(debouncedSearchValue.toLowerCase())) &&
            !item.meta?.isHide
        )
      : []
  }, [debouncedSearchValue])

  // 列表变化保持第一个高亮
  useEffect(() => {
    searchList.length ? setActivePath(searchList[0].path!) : setActivePath('')
  }, [searchList])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const keyPressUpOrDown = (direction: number) => {
    const { length } = searchList
    if (length === 0) return
    const index = searchList.findIndex(item => item.path === activePath)
    const newIndex = (index + direction + length) % length
    setActivePath(searchList[newIndex].path!)
    // 改变scrollTop
    if (menuListRef.current?.firstElementChild) {
      const menuItemHeight = menuListRef.current.firstElementChild.clientHeight + 12 || 0
      menuListRef.current.scrollTop = newIndex * menuItemHeight
    }
  }

  const keyboardOperation = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      keyPressUpOrDown(-1)
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      keyPressUpOrDown(1)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      selectMenuItem()
    }
  }

  // 注册键盘事件
  useEffect(() => {
    const handler = isModalOpen ? window.addEventListener : window.removeEventListener
    handler('keydown', keyboardOperation)
    return () => window.removeEventListener('keydown', keyboardOperation)
    // keyboardOperation --> 填上这个可以每次按下重新渲染页面,拿到最新的searchList --> 解决 searchList 为空的问题
  }, [isModalOpen, keyboardOperation])

  useEffect(() => {
    if (isModalOpen) {
      // cursor 聚焦状态
      setTimeout(() => inputRef.current?.focus({ cursor: 'end' }), 10)
    } else {
      setSearchValue('')
    }
  }, [isModalOpen])

  const mouseoverMenuItem = (item: RouteObjectType) => {
    setActivePath(item.path!)
  }

  const selectMenuItem = () => {
    const menu = searchList.find(item => item.path === activePath)
    if (!menu) return
    if (menu.meta?.isLink) window.open(menu.meta.isLink, '_blank')
    navigate(menu.path!)
    closeModal()
  }

  return (
    <>
      <i className='iconfont icon-sousuo' onClick={showModal}></i>
      <Modal className='search-modal' width={600} footer={null} closable={false} open={isModalOpen} onCancel={closeModal}>
        <Input
          ref={inputRef}
          placeholder='菜单搜索：支持菜单名称、路径'
          size='large'
          prefix={<SearchOutlined style={{ fontSize: '18px' }} />}
          allowClear={true}
          value={searchValue}
          onChange={handleInputChange}
        />
        {searchList.length ? (
          <div className='menu-list' ref={menuListRef}>
            {searchList.map(item => (
              <div
                key={item.path}
                className={`menu-item ${item.path === activePath && 'menu-active'}`}
                onMouseEnter={() => mouseoverMenuItem(item)}
                onClick={() => selectMenuItem()}
              >
                <Icon className='menu-icon' name={item.meta!.icon!} />
                <span className='menu-title'>{item.meta?.title}</span>
                <EnterOutlined className='menu-enter' />
              </div>
            ))}
          </div>
        ) : (
          <Empty className='mt40 mb30' description='暂无菜单' />
        )}
      </Modal>
    </>
  )
}

export default SearchMenu
