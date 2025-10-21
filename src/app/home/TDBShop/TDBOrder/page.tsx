'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { eventManager } from '@/utils/eventManager';
import { FixedHeader, SHOW_MENU_BAR_EVENT } from '@/components/BottomMenuBar/BottomMenuBarLayout';
import Link from 'next/link';
import Image from 'next/image';
import gackImg from "@/public/icon/back.svg";
import { pathMap } from '@/utils/pathMap';
import GoodsIcon from '../GoodsIcon';
import { PixelButton } from '@/components/shared/PixelButton';
import { useRouter } from 'next/navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface Order {
    id: string;
    title: string;
    img: string;
    price: number;
    quantity: number;
    code: string;
    status: '待付款' | '已取消' | '待验证' | '待审核' | '重新验证' | '已完成' | '已提货' | '已退货' | '提货中' | '退货中';
    deadline?: string;
}

const orders: Order[] = [
    {
        id: '12389489567608080',
        title: '商品名称',
        img: '/test.png',
        price: 1239.12,
        quantity: 3,
        code: 'TDB123',
        status: '待付款',
        deadline: '22:22',
    },
    {
        id: '12389489567608081',
        title: '商品名称',
        img: '/test.png',
        price: 1239.12,
        quantity: 3,
        code: 'TDB123',
        status: '已取消',
    },
    {
        id: '12389489567608082',
        title: '商品名称',
        img: '/test.png',
        price: 1239.12,
        quantity: 3,
        code: 'TDB123',
        status: '待验证',
        deadline: '22:22',
    },
    {
        id: '12389489567608012',
        title: '商品名称',
        img: '/test.png',
        price: 1239.12,
        quantity: 3,
        code: 'TDB123',
        status: '待审核',
    },
    {
        id: '12389489567608083',
        title: '商品名称',
        img: '/test.png',
        price: 1239.12,
        quantity: 3,
        code: 'TDB123',
        status: '重新验证',
    },
    {
        id: '12389489567608084',
        title: '商品名称',
        img: '/test.png',
        price: 1239.12,
        quantity: 3,
        code: 'TDB123',
        status: '已完成',
    },
    {
        id: '12389489567608013',
        title: '商品名称',
        img: '/test.png',
        price: 1239.12,
        quantity: 3,
        code: 'TDB123',
        status: '已提货',
    },
    {
        id: '12389489567608014',
        title: '商品名称',
        img: '/test.png',
        price: 1239.12,
        quantity: 3,
        code: 'TDB123',
        status: '已退货',
    },
    {
        id: '12389489567608015',
        title: '商品名称',
        img: '/test.png',
        price: 1239.12,
        quantity: 3,
        code: 'TDB123',
        status: '提货中',
    },
    {
        id: '12389489567608025',
        title: '商品名称',
        img: '/test.png',
        price: 1239.12,
        quantity: 3,
        code: 'TDB123',
        status: '退货中',
    },
];

/** 订单列表页 */
export default function OrdersPage() {
    const router = useRouter();

    const [list, setList] = useState(orders);

    const handleAction = (id: string, action: string) => {
        if (action === '退货') {
            router.push(`${pathMap.TDBSHOP_TDBORDER_REFUND}?id=${id}`)
        } else {
            toast.success(`${action}成功`);
        }
    };

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

                        <div className='text-[#E7E7E7] text-[16px]'>TDB订单</div>
                        <div></div>
                    </div>
                </FixedHeader>
                <div className="space-y-4">
                    {list.map((order) => (
                        <motion.div
                            key={order.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-2xl bg-neutral-900 p-4 shadow-md border border-neutral-800"
                        >
                            <div className="flex justify-between text-[13px] pb-[12px] border-b-[.5px] border-[#66666630]">
                                <span className='text-[#CCCCCC]'>订单号: <span className='text-[#999999]'>{order.id}</span></span>
                                <span
                                    className={clsx(
                                        'text-[#F07C1F]',
                                    )}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-[15px] my-[15px]">
                                <GoodsIcon imgSrc='' />
                                <div className="flex-1 pt-[4px] text-[14px]">
                                    <div className="w-full text-[#E7E7E7] flex items-center justify-between gap-[5px]">
                                        <div className="text-[15px] text-[#E7E7E7]">{order.title}</div>
                                        <div className="text-[14px] text-[#CCCCCC]">¥{order.price.toFixed(2)}</div>
                                    </div>
                                    <div className="text-[12px] text-[#999999] mt-[15px] mb-[10px]">
                                        商品数量: {order.quantity}
                                    </div><div className="text-[12px] text-[#999999]">
                                        TD编码: {order.code}
                                    </div>
                                </div>
                            </div>

                            {/* 订单底部操作 */}
                            <div className="mt-3 flex justify-between items-center">
                                {order.deadline && ['待付款', '待验证'].includes(order.status) && (
                                    <div className="text-[13px] text-[#E7E7E7]">
                                        请在 <span className="text-[#F64747]">{order.deadline}</span> 内完成支付
                                    </div>
                                )}
                                {order.status === '重新验证' && (
                                    <div className="text-xs text-red-400">验证码有误，请重新提交验证</div>
                                )}

                                <div className='flex justify-end flex-1'>
                                    {order.status === '待付款' && (
                                        <PixelButton
                                            variant="primary"
                                            className={"rounded-full py-[6px] px-[12px] text-[#FFFFFF] text-[13px]"}
                                            onClick={() => handleAction(order.id, '支付')}
                                        >
                                            继续支付
                                        </PixelButton>
                                    )}
                                    {order.status === '待验证' && (
                                        <PixelButton
                                            variant="primary"
                                            className={"rounded-full py-[6px] px-[12px] text-[#FFFFFF] text-[13px]"}
                                            onClick={() => handleAction(order.id, '验证')}
                                        >
                                            前往验证
                                        </PixelButton>
                                    )}
                                    {order.status === '重新验证' && (
                                        <PixelButton
                                            variant="primary"
                                            className={"rounded-full py-[6px] px-[12px] text-[#FFFFFF] text-[13px]"}
                                            onClick={() => handleAction(order.id, '重新验证')}
                                        >
                                            重新验证
                                        </PixelButton>
                                    )}
                                    {order.status === '已完成' && (
                                        <div className="flex justify-end gap-2">
                                            <PixelButton
                                                variant="primary"
                                                className={"rounded-full py-[6px] px-[25px] text-[#CCCCCC] text-[13px] border border-[#66666630] !bg-[#9797971c]"}
                                                onClick={() => handleAction(order.id, '退货')}
                                            >
                                                退货
                                            </PixelButton>
                                            <PixelButton
                                                variant="primary"
                                                className={"rounded-full py-[6px] px-[25px] text-[#F7921B] text-[13px] border border-[#F7921B] bg-[#ffbf753b]"}
                                                onClick={() => handleAction(order.id, '提货')}
                                            >
                                                提货
                                            </PixelButton>
                                        </div>
                                    )}
                                    {
                                        order.status === '退货中' && (
                                            <PixelButton
                                                variant="primary"
                                                className={"rounded-full py-[6px] px-[25px] text-[#F7921B] text-[13px] border border-[#F7921B] bg-[#ffbf753b]"}
                                                onClick={() => handleAction(order.id, '取消退货')}
                                            >
                                                取消退货
                                            </PixelButton>
                                        )
                                    }
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </ErrorBoundary>
    );
}
