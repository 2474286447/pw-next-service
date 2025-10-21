/*
 * @Author: yy
 * @Date: 2025-10-13 20:20:47
 * @LastEditTime: 2025-10-21 21:10:13
 * @LastEditors: yy
 * @Description: 
 */
"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import PaymentMethodSelector, { type MethodType } from '../PaymentMethodSelector'
import { FixedHeader, SHOW_MENU_BAR_EVENT } from '@/components/BottomMenuBar/BottomMenuBarLayout'
import Link from 'next/link'
import { pathMap } from '@/utils/pathMap'
import gackImg from "@/public/icon/back.svg";
import GoodsIcon from '../GoodsIcon'
import { eventManager } from '@/utils/eventManager'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PixelButton } from '@/components/shared/PixelButton'
import { useRouter } from 'next/navigation'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function PayPage() {
    const router = useRouter();

    const [quantity, setQuantity] = useState(2)
    const [selectedMethod, setSelectedMethod] = useState<MethodType>('alipay')
    const price = 1239.12

    // 处理支付事件
    const handlePay = () => {
        router.push(pathMap.TDBSHOP_PAYORDER)
    }

    useEffect(() => {
        eventManager.emit(SHOW_MENU_BAR_EVENT.HIDE);
        return () => {
            eventManager.emit(SHOW_MENU_BAR_EVENT.SHOW);
        }
    }, []);
    return (
        <ErrorBoundary>
            <div className="px-[15px] pt-[66px] pb-[75px]">

                {/* 顶部标题 */}
                <FixedHeader>
                    <div className='flex items-center justify-between'>
                        {/* 返回 */}
                        <Link href={pathMap.HOME_TDBSHOP}>
                            <Image
                                width={20}
                                height={20}
                                alt="back"
                                src={gackImg}
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                            />
                        </Link>

                        <div className='text-[#E7E7E7] text-[16px]'>TDB商城</div>
                        <div></div>
                    </div>
                </FixedHeader>

                <div className="bg-gray-900 rounded-xl p-4 max-w-md mx-auto space-y-4 mb-[15px]">
                    {/* 商品信息 */}
                    <div className="flex items-center space-x-4">
                        <GoodsIcon imgSrc="" />
                        <div className='flex-1'>
                            <div className="flex items-center justify-between">
                                <div className="text-[15px] text-[#FFE7E7E7]">商品名称</div>
                                <div className="text-[15px] font-bold text-[#cd610b]">¥{price}</div>
                            </div>
                            {/* 数量选择 */}
                            <div className="flex items-center h-[22px] w-fit mt-[20px] bg-gray-700 rounded border border-gray-500">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="px-2 h-full flex items-center"
                                >-</button>
                                <div className='text-[12px] px-4 h-full border-gray-500 border-l border-r flex items-center'>{quantity}</div>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="px-2 h-full flex items-center"
                                >+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 max-w-md mx-auto space-y-4 mb-[15px]">
                    {/* 支付方式 */}
                    <div className=''>
                        <h2 className="mb-2 text-sm text-gray-400">选择支付方式</h2>
                        <PaymentMethodSelector selected={selectedMethod} onSelect={setSelectedMethod} />
                    </div>
                </div>

                {/* 提示 */}
                <p className="text-xs text-gray-500">
                    退货申明：所有商品均为国行正品，享受国家三包服务;因产品本身质量问题涉及退、换、修的有效期，以物流配送时的实际签收日期开始算起。
                </p>

                <motion.aside
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    className={cn("fixed bottom-0 left-0 z-10 w-full bg-[#1A1A1A] p-[15px]")}
                    onClick={handlePay}
                >
                    <PixelButton
                        variant="primary"
                        className="w-full rounded-[44px] text-white"
                    >
                        立即支付 ¥1239.12
                    </PixelButton>
                </motion.aside>
            </div>
        </ErrorBoundary>
    )
}
