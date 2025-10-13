"use client"
import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { eventManager } from '@/utils/eventManager'
import { FixedHeader, SHOW_MENU_BAR_EVENT } from '@/components/BottomMenuBar/BottomMenuBarLayout'
import Link from 'next/link'
import { pathMap } from '@/utils/pathMap'
import gackImg from "@/public/icon/back.svg";
import { motion } from 'framer-motion'
import { PixelButton } from '@/components/shared/PixelButton'
import { cn } from '@/lib/utils'
import GoodsIcon from '../GoodsIcon'
import { PixelTipsModal } from '@/components/shared/PixelTipsModal'

/** 支付订单 */
const paymentOrder = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState('')
    const [deadline] = useState(new Date(Date.now() + 15 * 60 * 1000)) // 15分钟
    const [timeLeft, setTimeLeft] = useState('')
    const [copied, setCopied] = useState(false)
    // 确认取消订单弹窗显示状态
    const [showCancelModal, setShowCancelModal] = useState(false)
    // 是否已支付状态
    const [isPaid, setIsPaid] = useState(false)

    const orderId = '12839489567608080'
    const price = 1239.12

    const product = {
        name: '商品名称',
        code: 'TDB123',
        image: '/images/product.png', // 替换为实际路径
        count: 3,
        tdb: 123,
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(orderId)
        setCopied(true)
        toast.success('订单号已复制')
        setTimeout(() => setCopied(false), 2000)
    }


    // 倒计时逻辑
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            const diff = deadline.getTime() - now.getTime()
            if (diff <= 0) {
                setTimeLeft('已过期')
                clearInterval(timer)
            } else {
                const minutes = String(Math.floor(diff / 60000)).padStart(2, '0')
                const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
                setTimeLeft(`${minutes}:${seconds}`)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [deadline])

    // 生成二维码（模拟支付链接）
    useEffect(() => {
        QRCode.toDataURL(`https://example.com/pay?orderId=${orderId}`)
            .then(url => setQrCodeUrl(url))
            .catch(console.error)
    }, [orderId])

    useEffect(() => {
        eventManager.emit(SHOW_MENU_BAR_EVENT.HIDE);
        return () => {
            eventManager.emit(SHOW_MENU_BAR_EVENT.SHOW);
        }
    }, []);

    return (
        <div className="px-[15px] pt-[66px] pb-[75px]">

            {/* 顶部标题 */}
            <FixedHeader>
                <div className='flex items-center justify-between'>
                    {/* 返回 */}
                    <Link href={pathMap.TDBSHOP_CREATEORDER}>
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

                    <div className='text-[#E7E7E7] text-[16px]'>支付订单</div>
                    <div className='text-[#E7E7E7] text-[12px]' onClick={() => setShowCancelModal(true)}>取消订单</div>
                </div>
            </FixedHeader>
            {/* 倒计时 */}
            <div className="text-center text-sm my-4">
                请在 <span className="text-red-500">{timeLeft}</span> 内完成支付
            </div>

            {/* 商品信息 */}
            <div className="bg-gray-800 rounded-lg p-4">
                <div className='flex space-x-4 items-center py-2'>
                    <GoodsIcon imgSrc="" />
                    <div className="flex-1 text-sm space-y-1">
                        <div className="text-base">{product.name}</div>
                        <div className="text-gray-400">商品数量 <span className="ml-2">×{product.count}</span></div>
                        <div className="text-gray-400">TDB数量 <span className="ml-2">{product.tdb}</span></div>
                    </div>
                </div>
                <div className='border-t border-gray-600 flex items-center justify-between py-2 text-[14px]'>
                    <span className="text-gray-300">支付金额</span>
                    <div className="text-orange-400 font-semibold">¥{price}</div>
                </div>
            </div>

            <div className='bg-gray-800 rounded px-3 py-2 mt-4 mb-[8]'>
                {/* 订单号 */}
                <div className="flex items-center justify-between text-sm mb-2">
                    <span>订单号</span>
                    <div className="flex items-center space-x-2">
                        <span className="text-[#777474ed]">{orderId}</span>
                        <button
                            onClick={handleCopy}
                            className="text-xs"
                        >
                            {copied ? '已复制' : '复制'}
                        </button>
                    </div>
                </div>

                {
                    isPaid && <>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span>账户名称</span>
                            <div className="flex items-center space-x-2">
                                <span className="text-[#777474ed]">张三</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span>开户银行</span>
                            <div className="flex items-center space-x-2">
                                <span className="text-[#777474ed]">中国农业银行巴斯德还得</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span>银行账号</span>
                            <div className="flex items-center space-x-2">
                                <span className="text-[#777474ed]">6548574968743843864365</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span>转账金额</span>
                            <div className="flex items-center space-x-2">
                                <span className="text-[#777474ed]">￥&nbsp;135413.12</span>
                            </div>
                        </div>
                    </>
                }

                {/* 二维码 */}
                {!isPaid && qrCodeUrl && (
                    <div className="bg-white rounded w-fit mx-auto my-6 flex justify-center overflow-hidden">
                        <img src={qrCodeUrl} alt="二维码" className="w-48 h-48" />
                    </div>
                )}

                {/* 支付提示 */}
                <div className="text-center space-y-1 text-[14px]">
                    {!isPaid && <div className="font-bold">扫码支付 <span className='text-orange-400'>¥{price}</span></div>}
                    <div className={cn("text-xs text-[#fff]", isPaid && "my-6")}>⚠️ 支付时请备注订单号</div>
                </div>
            </div>


            <motion.aside
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                className={cn("fixed bottom-0 left-0 z-10 w-full bg-[#1A1A1A] p-[15px] flex gap-[15px]")}
            >
                <PixelButton
                    variant="secondary"
                    className="w-1/3 rounded-[44px] text-white border-[1px] border-[#eeeeee1c]"
                    onClick={() => setShowCancelModal(true)}
                >
                    取消订单
                </PixelButton>
                <PixelButton
                    variant="primary"
                    className="w-2/3 rounded-[44px] text-white"
                    onClick={() => setIsPaid(true)}
                >
                    我已支付
                </PixelButton>
            </motion.aside>


            {/* 取消订单确认弹窗 */}
            <PixelTipsModal
                isVisible={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                className="overflow-visible w-[300px] py-6 px-4"
            >
                <div className='mb-4 py-4 text-center'>
                    确定取消订单吗？
                </div>

                <div className='flex gap-[15px]'>
                    <PixelButton
                        variant="secondary"
                        className={"w-1/2 border border-[1px] border-[#eeeeee1c] rounded-full"}
                    >
                        确认取消
                    </PixelButton>
                    <PixelButton
                        variant="primary"
                        className={"w-1/2 rounded-full"}
                        onClick={() => setShowCancelModal(false)}
                    >
                        继续支付
                    </PixelButton>
                </div>
            </PixelTipsModal>
        </div>
    )
}


export default paymentOrder;