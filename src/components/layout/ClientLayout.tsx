/*
 * @Author: yy
 * @Date: 2025-09-28 20:10:18
 * @LastEditTime: 2025-10-20 21:07:51
 * @LastEditors: yy
 * @Description: 
 */
'use client'

import { usePathname } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import BottomMenuBarLayout from '../BottomMenuBar/BottomMenuBarLayout'
import { pathMap } from '@/utils/pathMap'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // 需要使用 Dashboard 布局的路由
  const dashboardRoutes = [
    '/dashboard',
    '/assets',
    '/mining',
    '/market',
    '/shop',
    '/wallet',
    '/vouchers'
  ]

  // 需要使用 BottomMenuBarLayout 布局的路由
  const bottomMenuBarRoutes = [
    '/dashboard',
    pathMap.PW_MARKET,
    '/assets',
    pathMap.HOME,
    pathMap.TERRITORY,
  ];

  const isBottomMenuBarRoute = bottomMenuBarRoutes.some(route =>
    pathname?.startsWith(route)
  )

  // 如果是底部菜单栏路由，使用 BottomMenuBarLayout
  if (isBottomMenuBarRoute) {
    return <BottomMenuBarLayout>{children}</BottomMenuBarLayout>
  }


  const isDashboardRoute = dashboardRoutes.some(route =>
    pathname?.startsWith(route)
  )

  // 如果是仪表盘路由，使用 DashboardLayout
  if (isDashboardRoute) {
    return <DashboardLayout>{children}</DashboardLayout>
  }

  // 否则直接渲染页面
  return <>{children}</>
}
