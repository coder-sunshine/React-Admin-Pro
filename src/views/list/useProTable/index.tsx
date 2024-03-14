import { useRef } from 'react'
import { Button } from 'antd'
import { formatDataForProTable } from '@/utils'
import { pagination } from '@/config/proTable'
import { getUserList } from '@/api/modules/user'
import { UserList } from '@/api/interface'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns } from '@ant-design/pro-components'

const columns: ProColumns<UserList>[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    width: 200,
    align: 'center',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 150,
    align: 'center',
    valueEnum: {
      1: { text: '男' },
      2: { text: '女' },
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 150,
    align: 'center',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: '地址',
    dataIndex: 'address',
    hideInSearch: true,
    align: 'center',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    align: 'center',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateRange',
    align: 'center',
    hideInTable: true,
    search: { transform: value => ({ startTime: value[0], endTime: value[1] }) },
  },
  {
    title: '操作',
    key: 'option',
    fixed: 'right',
    width: 250,
    align: 'center',
    hideInSearch: true,
    render: () => action(),
  },
]

const action = () => [
  <Button key='view' type='link' size='small' icon={<EyeOutlined />}>
    查看
  </Button>,
  <Button key='edit' type='link' size='small' icon={<EditOutlined />}>
    编辑
  </Button>,
  <Button key='delete' type='link' size='small' danger icon={<DeleteOutlined />}>
    删除
  </Button>,
]

const toolBarRender = () => [
  <Button type='primary' key='button' icon={<PlusOutlined />}>
    新建
  </Button>,
]

const useProTable = () => {
  const actionRef = useRef<ActionType>()

  return (
    <ProTable<UserList>
      className='ant-pro-table-scroll'
      columns={columns}
      actionRef={actionRef}
      bordered
      cardBordered
      scroll={{ x: 1000, y: '100%' }}
      request={async params => {
        const { data } = await getUserList(params)
        console.log('params', params)
        console.log('data', data)
        return formatDataForProTable<UserList>(data)
      }}
      columnsState={{
        persistenceKey: 'use-pro-table-key',
        persistenceType: 'localStorage',
      }}
      rowKey='id'
      search={{ labelWidth: 'auto', span: 6, showHiddenNum: true }}
      pagination={pagination}
      dateFormatter='string'
      headerTitle='使用 ProTable'
      toolBarRender={toolBarRender}
    />
  )
}

export default useProTable
