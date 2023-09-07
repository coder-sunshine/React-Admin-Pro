import { useEffect, useRef, useState } from 'react'
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

  const searchList = debouncedSearchValue
    ? flatMenuList.filter(item => {
        return (
          (item.path!.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
            item.meta!.title!.toLowerCase().includes(debouncedSearchValue.toLowerCase())) &&
          !item.meta?.isHide
        )
      })
    : []

  const showModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

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
