'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { FixedHeader, UserAvatarButton } from '@/components/BottomMenuBar/BottomMenuBarLayout';
import { PixelButton } from '@/components/shared/PixelButton';
import { getPixelResourceIcon, PIXEL_RESOURCE_NAMES, PIXEL_RESOURCE_TYPES } from '@/utils/pixelResourceTool';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import BuyDrawer from './BuyDrawer';

const topTabs = [
    {
        name: '材料',
        subList: [
            {
                // 铁矿
                name: PIXEL_RESOURCE_NAMES[PIXEL_RESOURCE_TYPES.IRON_ORE],
                key: PIXEL_RESOURCE_TYPES.IRON_ORE,
            },
            {
                // 石矿
                name: PIXEL_RESOURCE_NAMES[PIXEL_RESOURCE_TYPES.STONE],
                key: PIXEL_RESOURCE_TYPES.STONE,
            },
            {
                // 木材
                name: PIXEL_RESOURCE_NAMES[PIXEL_RESOURCE_TYPES.WOOD],
                key: PIXEL_RESOURCE_TYPES.WOOD,
            },
            {
                // 陨石
                name: PIXEL_RESOURCE_NAMES[PIXEL_RESOURCE_TYPES.METEORITE],
                key: PIXEL_RESOURCE_TYPES.METEORITE,
            },
            {
                // 粮食
                name: PIXEL_RESOURCE_NAMES[PIXEL_RESOURCE_TYPES.GRAIN],
                key: PIXEL_RESOURCE_TYPES.GRAIN,
            },
        ]
    },
    {
        name: '工具',
        subList: [
            {
                // 锄头
                name: PIXEL_RESOURCE_NAMES[PIXEL_RESOURCE_TYPES.HOE],
                key: PIXEL_RESOURCE_TYPES.HOE,
            },
            {
                // 斧头
                name: PIXEL_RESOURCE_NAMES[PIXEL_RESOURCE_TYPES.AXE],
                key: PIXEL_RESOURCE_TYPES.AXE,
            },
            {
                // 镐头
                name: PIXEL_RESOURCE_NAMES[PIXEL_RESOURCE_TYPES.PICKAXE],
                key: PIXEL_RESOURCE_TYPES.PICKAXE,
            },
        ]
    },
    {
        name: '土地',
        subList: [
            {
                // 农田
                name: PIXEL_RESOURCE_NAMES[PIXEL_RESOURCE_TYPES.FARMLAND],
                key: PIXEL_RESOURCE_TYPES.FARMLAND,
            },
            {
                // 森林
                name: PIXEL_RESOURCE_NAMES[PIXEL_RESOURCE_TYPES.FOREST],
                key: PIXEL_RESOURCE_TYPES.FOREST,
            },
        ]
    }
];

const getData = (key: PIXEL_RESOURCE_TYPES) => {
    return Array.from({ length: 5 }).map((_, i) => ({
        id: i + 1,
        name: PIXEL_RESOURCE_NAMES[key],
        icon: key,
        seller: 'Miky',
        quantity: 12567.02,
        price: 1234.12,
        unit: 'TDB/个',
    }))
}

/** 市场页 */
const PWmarket = () => {
    // 一级菜单选中项
    const [topActive, setTopActive] = useState('材料');
    // 二级菜单
    const [subList, setSubList] = useState(topTabs.find(i => i.name === topActive)?.subList);
    // 二级菜单选中项
    const [subActive, setSubActive] = useState(subList?.[0]?.key);
    // 商品列表
    const [goodsList, setGoodsList] = useState(getData(PIXEL_RESOURCE_TYPES.IRON_ORE))
    // 购买弹窗显示状态
    const [showBuyModal, setShowBuyModal] = useState(false);

    // 处理一级菜单选中事件
    const handleTopTabClick = (name: string) => {
        setTopActive(name);
        // 当前选中tab
        const currentTab = topTabs.find(i => i.name === name)?.subList;
        setSubList(currentTab);
        setSubActive(currentTab?.[0]?.key);
    }

    // 处理购买事件
    const handleBuy = (name: string) => {
        console.log('购买1', name);
        setShowBuyModal(true);
    };

    useEffect(() => {
        if (subActive) {
            setGoodsList(getData(subActive as PIXEL_RESOURCE_TYPES))
        }
    }, [subActive])

    return (
        <ErrorBoundary>
            <div className="px-[15px] pt-[70px] pb-[100px]">

                {/* 顶部标题 */}
                <FixedHeader>
                    {/* 用户头像 */}
                    <UserAvatarButton />
                </FixedHeader>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='sticky top-[70px] bg-black z-10'
                >

                    {/* 顶部分类 */}
                    <div className="flex justify-between py-[20px] gap-[15px]"
                    >
                        {topTabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => handleTopTabClick(tab.name)}
                                className={clsx(
                                    'flex-1 w-1/3 py-[10px] rounded-[7px] text-center text-[13px] transition-colors',
                                    topActive === tab.name
                                        ? 'bg-[#F7921B] text-[#31261A]'
                                        : 'bg-[#31261A] text-[#E7E7E7]'
                                )}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>


                    {/* 二级分类 */}
                    <div
                        className="box-content flex gap-[55px] h-[28px] mb-[15px] pb-[15px] pr-[30px] overflow-x-auto scrollbar-hide"
                    >
                        {subList?.map((sub) => (
                            <button
                                key={sub?.key}
                                onClick={() => setSubActive(sub?.key)}
                                className={clsx(
                                    'flex-shrink-0 pb-[5px] text-[13px] font-medium relative',
                                    subActive === sub?.key
                                        ? 'text-[#E7E7E7]'
                                        : 'text-[#999999]'
                                )}
                            >
                                {sub?.name}
                                {subActive === sub?.key && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute left-1/2 right-0 -bottom-[1px] w-[16px] h-[3px] bg-[#F07C1F] rounded-full transition-all duration-300 -translate-x-1/2"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>
                {/* 商品列表 */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={subActive}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-3"
                    >
                        {goodsList.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800"
                            >
                                <div className="flex justify-between gap-[15px] mb-[14px]">
                                    <div className='flex items-center gap-[10px]'>
                                        {
                                            getPixelResourceIcon(item?.icon, {
                                                iconSize: 34,
                                                haveBackgroundWarper: true,
                                            })
                                        }
                                        <div className="text-[16px] text-[#E7E7E7]">{item.name}</div>
                                    </div>
                                    <div className='text-[#F07C1F] text-[15px]'>
                                        <span className='font-bold'>{item.price.toFixed(2)}</span>
                                        &nbsp;
                                        <span className="text-[12px]">{item.unit}</span>
                                    </div>
                                </div>

                                <div className='flex items-center justify-between gap-[15px]'>
                                    <div className='flex flex-col gap-[6px]'>
                                        <div className='text-[14px] text-[#999999]'>
                                            数量：
                                            <span className='text-[#E7E7E7]'>
                                                {item.quantity.toLocaleString()}个
                                            </span>
                                        </div>
                                        <div className='text-[14px] text-[#999999]'>
                                            出售者：
                                            <span className='text-[#E7E7E7]'>
                                                {item.seller}
                                            </span>
                                        </div>
                                    </div>
                                    <PixelButton
                                        variant="primary"
                                        className="w-[80px] rounded-[44px] text-white"
                                        onClick={() => handleBuy(item.name)}
                                    >
                                        购买
                                    </PixelButton>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        className={"fixed bottom-[var(--bottom-menu-height,58px)] left-0 w-full bg-[#1E1E1E] p-[15px] flex justify-between gap-[80px]"}
                    >
                        <div className='flex items-center gap-[15px]'>
                            <div className='flex flex-col items-center gap-[6px]'>
                                <span className='text-[11px] text-[#CCCCCC]'>
                                    我的订单
                                </span>
                            </div>
                            <div className='flex flex-col items-center gap-[6px]'>
                                <span className='text-[11px] text-[#CCCCCC]'>
                                    交易明细
                                </span>
                            </div>
                        </div>
                        <PixelButton
                            variant="secondary"
                            className="w-[140px] rounded-[44px] text-[#F7921B] bg-[#31261A]"
                        >
                            我要出售
                        </PixelButton>
                    </motion.aside>
                </AnimatePresence>
            </div>

            {/* 购买弹窗 */}
            <BuyDrawer BuyDrawerOpen={showBuyModal} setBuyDrawerOpen={setShowBuyModal} />
        </ErrorBoundary>
    );
}

export default PWmarket;