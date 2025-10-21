/*
 * @Author: yy
 * @Date: 2025-10-09 21:15:07
 * @LastEditTime: 2025-10-13 20:27:02
 * @LastEditors: yy
 * @Description: 
 */
"use client"
import { FixedHeader, SHOW_MENU_BAR_EVENT } from "@/components/BottomMenuBar/BottomMenuBarLayout";
import Link from "next/link";
import Image from 'next/image';
import gackImg from "@/public/icon/back.svg";
import orderImg from "@/public/icon/order.svg";
import { pathMap } from "@/utils/pathMap";
import { useEffect } from "react";
import { eventManager } from "@/utils/eventManager";
import { useRouter } from "next/navigation";
import GoodsIcon from "./GoodsIcon";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/** TDB商城 */
const TDBShop = () => {

    const router = useRouter();

    // 处理商品点击事件
    const handleGoodsClick = () => {
        router.push(pathMap.TDBSHOP_CREATEORDER);
    }

    useEffect(() => {
        eventManager.emit(SHOW_MENU_BAR_EVENT.HIDE);
        return () => {
            eventManager.emit(SHOW_MENU_BAR_EVENT.SHOW);
        }
    }, []);
    return <ErrorBoundary>
        <div className="px-[15px] pt-[66px] pb-[20px]">
            {/* 顶部标题 */}
            <FixedHeader>
                <div className='flex items-center justify-between'>
                    {/* 返回 */}
                    <Link href={pathMap.HOME}>
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

                    {/* 订单 */}
                    <Image
                        width={20}
                        height={20}
                        alt="order"
                        src={orderImg}
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                </div>
            </FixedHeader>

            <div className="grid grid-cols-3 gap-[10px]">
                {
                    Array.from({ length: 10 }).map((_, index) => {
                        return <div key={index} className="bg-[#1A1A1A] flex flex-col rounded-[8px] overflow-hidden" onClick={() => handleGoodsClick()}>
                            <div className="p-[15px]">
                                <div className="text-[#CCCCCC] text-[14px] mb-[12px] text-center">
                                    商品名称
                                </div>
                                <GoodsIcon imgSrc="" />
                            </div>
                            <div className="bg-gradient-to-b from-[#1A1A1A] to-[#cd610b3d] p-[12px] text-[#cd610b] text-[16px] text-center">
                                ¥1239.12
                            </div>
                        </div>
                    })
                }
            </div>

            <div className="mt-[15px] rounded-[8px] p-[15px] bg-[#1A1A1A]">
                <div className="text-[#FFF] text-[15px] mb-[15px]">
                    购买须知
                </div>
                <div className="text-[12px] text-[#999]">
                    1、所有商品均为国行正品，享受国家三包服务;<br />
                    2、因产品本身质量问题涉及退、换、修的有效期，以
                    物流配送时的实际签收日期开始算起。
                </div>
            </div>
        </div>
    </ErrorBoundary>
}
export default TDBShop;