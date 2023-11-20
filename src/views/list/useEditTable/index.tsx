import React, { useState } from 'react'
import type { ProColumns } from '@ant-design/pro-components'
import { EditableProTable } from '@ant-design/pro-components'

const waitTime = (time: number = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

type DataSourceType = {
  id: React.Key
  title?: string
  readonly?: string
  decs?: string
  state?: string
  created_at?: string
  update_at?: string
  children?: DataSourceType[]
}

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '活动名称一',
    readonly: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '1590486176000',
    update_at: '1590486176000',
  },
  {
    id: 624691228,
    title: '活动名称二',
    readonly: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: '1590481162000',
    update_at: '1590481162000',
  },
  {
    id: 624691229,
    title: '活动名称二',
    readonly: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: '1590481162000',
    update_at: '1590481162000',
  },
  {
    id: 624691230,
    title: '活动名称二',
    readonly: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: '1590481162000',
    update_at: '1590481162000',
  },
]

const UseEditTable: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([])

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      align: 'center',
      formItemProps: (_, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        }
      },
      // 第一行不允许编辑
      editable: (_text, _record, index) => {
        return index !== 0
      },
      width: '15%',
    },
    {
      title: '活动名称二',
      dataIndex: 'readonly',
      align: 'center',
      tooltip: '只读，使用form.getFieldValue可以获取到值',
      width: '15%',
    },
    {
      title: '状态',
      key: 'state',
      align: 'center',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: { text: '未解决', status: 'Error' },
        closed: { text: '已解决', status: 'Success' },
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
      align: 'center',
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || '', 'title']) === '不好玩') {
          return { disabled: true }
        }
        if (rowIndex > 9) {
          return { disabled: true }
        }
        return {}
      },
    },
    {
      title: '活动时间',
      dataIndex: 'created_at',
      valueType: 'date',
      align: 'center',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      align: 'center',
      render: (_text, record, _, action) => [
        <a
          key='editable'
          onClick={() => {
            action?.startEditable?.(record.id)
          }}
        >
          编辑
        </a>,
        <a
          key='delete'
          onClick={() => {
            setDataSource(dataSource.filter(item => item.id !== record.id))
          }}
        >
          删除
        </a>,
      ],
    },
  ]

  return (
    <EditableProTable<DataSourceType>
      rowKey='id'
      headerTitle='使用 EditTable'
      className='ant-pro-table-scroll'
      scroll={{ x: 1000, y: '100%' }}
      bordered
      cardBordered
      pagination={false}
      recordCreatorProps={{
        position: 'bottom',
        record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
      }}
      loading={false}
      columns={columns}
      request={async () => ({
        data: defaultData,
        total: 5,
        success: true,
      })}
      value={dataSource}
      onChange={setDataSource}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          console.log(rowKey, data, row)
          await waitTime(2000)
        },
        onChange: setEditableRowKeys,
      }}
    />
  )
}

export default UseEditTable
