import React from 'react'
import { Card, Descriptions, Tag, Typography } from 'antd'
import './index.less'

const { Link, Title } = Typography
const style = { width: '280px' }

const About: React.FC = () => {
  const { pkg, lastBuildTime } = __APP_INFO__
  console.log('__APP_INFO__', __APP_INFO__)
  console.log('pkg', pkg)
  const { dependencies, devDependencies, version } = pkg

  return (
    <div className='about-content'>
      <Card className='mb10'>
        <Title level={4} className='mb15'>
          关于
        </Title>
        <span className='text'>
          <Link href='https://github.com/HalseySpicy/Hooks-Admin' target='_blank'>
            Hooks-Admin{' '}
          </Link>
          一款基于 React18、React-Router v6、React-Hooks、Redux-Toolkit、TypeScript、Vite4、Ant-Design5 开源的后台管理框架。
        </span>
      </Card>

      <Card className='mb10'>
        <Title level={4} className='mb15'>
          项目信息
        </Title>
        <Descriptions column={2} bordered size='middle' labelStyle={style}>
          <Descriptions.Item label='版本号'>
            <Tag color='processing'>{version}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label='发布时间'>
            <Tag color='processing'>{lastBuildTime}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label='Gitee'>
            <Link href='https://gitee.com/HalseySpicy/Hooks-Admin' target='_blank'>
              Gitee
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label='Github'>
            <Link href='https://github.com/HalseySpicy/Hooks-Admin' target='_blank'>
              Github
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label='Issues'>
            <Link href='https://github.com/HalseySpicy/Hooks-Admin/issues' target='_blank'>
              Issues
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label='预览地址'>
            <Link href='https://hooks.spicyboy.cn' target='_blank'>
              预览地址
            </Link>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card className='mb10'>
        <Title level={4} className='mb15'>
          生产环境依赖
        </Title>
        <Descriptions column={3} bordered size='middle' labelStyle={style}>
          {Object.keys(dependencies).map(key => {
            return (
              <React.Fragment key={key}>
                <Descriptions.Item label={key}>
                  <Tag color='default'>{dependencies[key]} </Tag>
                </Descriptions.Item>
              </React.Fragment>
            )
          })}
        </Descriptions>
      </Card>

      <Card>
        <Title level={4} className='mb15'>
          开发环境依赖
        </Title>
        <Descriptions column={3} bordered size='middle' labelStyle={style}>
          {Object.keys(devDependencies).map(key => {
            return (
              <React.Fragment key={key}>
                <Descriptions.Item label={key}>
                  <Tag color='default'>{devDependencies[key]} </Tag>
                </Descriptions.Item>
              </React.Fragment>
            )
          })}
        </Descriptions>
      </Card>
    </div>
  )
}

export default About
