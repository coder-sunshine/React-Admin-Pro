import { useState } from 'react'
import { ProList } from '@ant-design/pro-components'
import { Button, Space, Tag } from 'antd'

const defaultData = [
  {
    name: '语雀的天空',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    name: 'Ant Design',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    name: '蚂蚁金服体验科技',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    name: 'TechUI',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    name: '语雀的天空',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    name: 'Ant Design',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    name: '蚂蚁金服体验科技',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    name: 'TechUI',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
]

type DataItem = (typeof defaultData)[number]

const UseProList = () => {
  const [dataSource, setDataSource] = useState<DataItem[]>(defaultData)

  return (
    <>
      <ProList<DataItem>
        toolBarRender={() => {
          return [
            <Button key='add' type='primary'>
              新建
            </Button>,
          ]
        }}
        onRow={record => {
          return {
            onMouseEnter: () => {
              console.log(record)
            },
            onClick: () => {
              console.log(record)
            },
          }
        }}
        rowKey='name'
        headerTitle='使用 ProList'
        tooltip='基础列表的配置'
        dataSource={dataSource}
        showActions='hover'
        showExtra='hover'
        cardBordered
        onDataSourceChange={setDataSource}
        metas={{
          title: { dataIndex: 'name' },
          avatar: { dataIndex: 'image' },
          description: { dataIndex: 'desc' },
          subTitle: {
            render: () => {
              return (
                <Space size={0}>
                  <Tag color='blue'>Ant Design</Tag>
                  <Tag color='#5BD8A6'>TechUI</Tag>
                </Space>
              )
            },
          },
          actions: {
            render: () => [
              <a target='_blank' rel='noopener noreferrer' key='link'>
                链路
              </a>,
              <a target='_blank' rel='noopener noreferrer' key='warning'>
                报警
              </a>,
              <a target='_blank' rel='noopener noreferrer' key='view'>
                查看
              </a>,
            ],
          },
        }}
      />
    </>
  )
}

export default UseProList
