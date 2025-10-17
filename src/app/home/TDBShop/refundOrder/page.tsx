"use client"
import Image from 'next/image';
import { FixedHeader, SHOW_MENU_BAR_EVENT } from '@/components/BottomMenuBar/BottomMenuBarLayout';
import Link from 'next/link';
import { pathMap } from '@/utils/pathMap';
import gackImg from "@/public/icon/back.svg";
import { PixelButton } from '@/components/shared/PixelButton';
import { useEffect, useState } from 'react';
import { eventManager } from '@/utils/eventManager';
import GoodsIcon from '../GoodsIcon';
import toast from 'react-hot-toast'
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import RefundMethodDrawer from './RefundMethodDrawer';
import { getMethodTypeLabel, MethodType } from '../PaymentMethodSelector';

/** 退货退款 */
const refundOrder = () => {
    const [copied, setCopied] = useState(false)

    // 选中的支付方式
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<MethodType>();

    // 退款方式抽屉显示状态
    const [refundMethodDrawerOpen, setRefundMethodDrawerOpen] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("测试")
        setCopied(true)
        toast.success('订单号已复制')
        setTimeout(() => setCopied(false), 2000)
    }

    // 处理退货方式抽屉关闭事件
    const onRefundMethodSubmit = () => {
        // 关闭退货方式抽屉
        setRefundMethodDrawerOpen(false);
    }

    // 处理退货事件
    const handleRefund = () => {
        // 检查是否选择了支付方式
        if (!selectedPaymentMethod) {
            toast.error('请选择退款方式')
            return;
        }
        toast.success('退货成功')
    }

    useEffect(() => {
        eventManager.emit(SHOW_MENU_BAR_EVENT.HIDE);
        return () => {
            eventManager.emit(SHOW_MENU_BAR_EVENT.SHOW);
        }
    }, []);

    return (
        <>

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

                        <div className='text-[#E7E7E7] text-[16px]'>退货退款</div>
                        <div></div>
                    </div>
                </FixedHeader>

                <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-[10px] pb-[20px] space-y-6 mb-[15px]">
                    {/* 商品信息 */}
                    <div className="flex gap-[8px] px-[6px]">
                        <GoodsIcon imgSrc='' />
                        <div className='flex-1 flex flex-col gap-[12px]'>
                            <div className="text-sm mb-[8px]">商品名称</div>
                            <div className="text-xs flex items-center justify-between">
                                <div className='text-[12px] text-[#999999]'>
                                    商品数量：
                                </div>
                                <div className='text-[12px] text-[#CCCCCC]'>
                                    x3
                                </div>
                            </div>
                            <div className="text-xs flex items-center justify-between">
                                <div className='text-[12px] text-[#999999]'>
                                    TDB数量：
                                </div>
                                <div className='text-[12px] text-[#CCCCCC]'>
                                    213
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 支付金额 */}
                    <div className="flex items-center justify-between border-t border-b border-[#66666626] py-[16px] px-[6px]">
                        <div className='text-[14px] text-[#CCCCCC]'>
                            支付金额
                        </div>
                        <div className='text-[14px] text-[#CCCCCC]'>
                            ¥1239.12
                        </div>
                    </div>

                    {/* 订单信息 */}
                    <div className="space-y-2 text-sm px-[6px]">
                        <div className="flex justify-between">
                            <span className='text-[13px] text-[#CCCCCC]'>订单号：</span>
                            <span className="flex items-center space-x-1">
                                <span className='text-[13px] text-[#999999]'>12839489567608080</span>
                                <button
                                    onClick={handleCopy}
                                    className="text-[13px] ml-[6px] pl-[6px] border-l border-[#66666626]"
                                >
                                    {copied ? '已复制' : '复制'}
                                </button>
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className='text-[13px] text-[#CCCCCC]'>支付方式：</span>
                            <span className='text-[13px] text-[#999999]'>支付宝</span>
                        </div>
                        <div className="flex justify-between">
                            <span className='text-[13px] text-[#CCCCCC]'>创建时间：</span>
                            <span className='text-[13px] text-[#999999]'>2025/12/22 22:22:22</span>
                        </div>
                        <div className="flex justify-between">
                            <span className='text-[13px] text-[#CCCCCC]'>过期时间：</span>
                            <span className='text-[13px] text-[#999999]'>2025/12/22 22:22:22</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-[10px] mb-[15px]">
                    <div className='flex justify-between items-center' onClick={() => setRefundMethodDrawerOpen(true)}>
                        <div className='text-[14px] text-[#E7E7E7]'>
                            退款方式
                        </div>
                        {
                            selectedPaymentMethod
                                ? <div className='text-[14px] text-[#999999]'>
                                    {getMethodTypeLabel(selectedPaymentMethod)}
                                </div>
                                : <div className='text-[14px] text-[#999999]'>
                                    添加退款方式&nbsp;&nbsp;&gt;
                                </div>
                        }

                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-[10px] pb-[15px]">
                    <div className='flex justify-between mb-[10px]'>
                        <div className='text-[14px] text-[#fff]'>
                            支付金额
                        </div>
                        <div className='text-[14px] text-[#fff] text-end'>
                            <div>123.12 TDB</div>
                            <div className='text-[#F64747] mt-[5px]'>余额不足</div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='text-[14px] text-[#fff]'>
                            手续费
                        </div>
                        <div className='text-[14px] text-[#fff]'>
                            <div>5%</div>
                        </div>
                    </div>
                </div>


                <motion.aside
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    className={cn("fixed bottom-0 left-0 z-10 w-full bg-[#1A1A1A] p-[15px] flex gap-[15px]")}
                >
                    <PixelButton
                        variant="primary"
                        className={cn("w-full rounded-full", !selectedPaymentMethod && "bg-[#31261A] text-[#999999] pointer-events-none")}
                        disabled={!selectedPaymentMethod}
                        onClick={() => {
                            handleRefund();
                        }}
                    >
                        我要退货
                    </PixelButton>
                </motion.aside>
            </div>

            {/* 退款方式抽屉 */}
            <RefundMethodDrawer
                refundMethodDrawerOpen={refundMethodDrawerOpen}
                setRefundMethodDrawerOpen={setRefundMethodDrawerOpen}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
                onRefundMethodSubmit={onRefundMethodSubmit}
            />
        </>
    );
}

export default refundOrder;