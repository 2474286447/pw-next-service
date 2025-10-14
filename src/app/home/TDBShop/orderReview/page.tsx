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

/** 订单审核 */
const orderReview = () => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText("测试")
        setCopied(true)
        toast.success('订单号已复制')
        setTimeout(() => setCopied(false), 2000)
    }

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

                    <div className='text-[#E7E7E7] text-[16px]'>订单验证</div>
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

            <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-[10px] pb-[30px] space-y-6">
                <div className='text-[15px] text-[#E7E7E7] mb-[15px]'>
                    审核须知
                </div>

                <div className="text-[12px] text-[#999]">
                    1、所有商品均为国行正品，享受国家三包服务;<br />
                    2、因产品本身质量问题涉及退、换、修的有效期，以
                    物流配送时的实际签收日期开始算起。
                </div>
            </div>


            <motion.aside
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                className={cn("fixed bottom-0 left-0 z-10 w-full bg-[#1A1A1A] p-[15px] flex gap-[15px]")}
            >
                <Link href={pathMap.HOME_TDBSHOP} className='w-full'>
                    <PixelButton
                        variant="primary"
                        className={"w-full rounded-full"}
                    >
                        返回商城
                    </PixelButton>
                </Link>
            </motion.aside>
        </div>
    );
}

export default orderReview;