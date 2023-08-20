/**
 * @description Route guard component
 */
interface RouterGuardProps {
  children: React.ReactNode
}

// 做路由守卫处理 例如登录验证等，传入children，返回验证过后的children
const RouterGuard: React.FC<RouterGuardProps> = props => {
  return props.children as JSX.Element
}

export default RouterGuard
