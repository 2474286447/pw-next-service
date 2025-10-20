/*
 * @Author: yy
 * @Date: 2025-09-28 21:09:35
 * @LastEditTime: 2025-10-16 20:30:19
 * @LastEditors: yy
 * @Description: 
 */
"use client"
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { FixedHeader, UserAvatarButton } from '@/components/BottomMenuBar/BottomMenuBarLayout';
import Image from 'next/image';
import refetchImg from "@/public/icon/refetch.svg";
import { useState } from 'react';
import { getPixelResourceIcon, PIXEL_RESOURCE_TYPES } from '@/utils/pixelResourceTool';
import { motion } from 'framer-motion';
import { pathMap } from '@/utils/pathMap';
import { useRouter } from 'next/navigation';

/** 首页 */
const Home = () => {
    const router = useRouter();
    // 刷新图标状态
    const [refreshing, setRefreshing] = useState(false);

    // 处理刷新
    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }

    const SwiperList = [
        {
            id: 1,
            name: 'Slide 1',
        },
        {
            id: 2,
            name: 'Slide 2',
        },
        {
            id: 3,
            name: 'Slide 3',
        },
        {
            id: 4,
            name: 'Slide 4',
        }
    ]

    // 剩余统计展示列表参数
    const statisticsList = [
        {
            title: "土地数量",
            color: "#61D18E",
            value: 1213
        },
        {
            title: "工具数量",
            color: "#62A6F2",
            value: 1213
        },
        {
            title: "YLD",
            color: "#8743E2",
            value: 1213
        },
    ]

    // 收益统计展示列表参数
    const incomeList = [
        {
            icon: PIXEL_RESOURCE_TYPES.IRON_ORE,
            title: "铁矿收益",
            value: 1213,
        },
        {
            icon: PIXEL_RESOURCE_TYPES.WOOD,
            title: "木材收益",
            value: 1213,
        },
        {
            icon: PIXEL_RESOURCE_TYPES.FARMLAND,
            title: "农田收益",
            value: 1213,
        },
        {
            icon: PIXEL_RESOURCE_TYPES.METEORITE,
            title: "陨石收益",
            value: 1213,
        },
        {
            icon: PIXEL_RESOURCE_TYPES.STONE,
            title: "石矿收益",
            value: 1213,
        },
    ]
    return (
        <div className="px-[15px] pt-[70px]">

            {/* 顶部标题 */}
            <FixedHeader>
                {/* 用户头像 */}
                <UserAvatarButton />
            </FixedHeader>

            {/* 黄金通证卡片 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="my-[20px] p-[2px] rounded-[15px]"
                style={{
                    background: "linear-gradient(to bottom, #684927, #827359, #684927)"
                }}
            >
                <div className="bg-gradient-to-b from-[#151412] to-[#252421] rounded-[15px] p-[20px]">
                    <div className='flex flex-col gap-[20px]'>
                        <div className='flex items-center gap-[6px]'>
                            <span>
                                黄金通证(TDB)
                            </span>

                            {/* 刷新 */}
                            <Image
                                width={14}
                                height={14}
                                alt="refresh"
                                src={refetchImg}
                                className={refreshing ? "icon-spin" : ""}
                                style={{
                                    width: 14,
                                    height: 14,
                                }}
                                onClick={handleRefresh}
                            />
                        </div>
                        <div className='text-[24px] text-[#F07C1F]'>
                            1,685.72
                            <span className='text-[12px]'>
                                TDB
                            </span>
                        </div>
                        <div className='text-[#999999] text-[12px]'>
                            ≈0.01克黄金/枚
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* 订单快速入口 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='flex items-center justify-around gap-[10px]'
            >
                <div className='flex flex-col items-center gap-[15px]' onClick={() => {
                    router.push(pathMap.HOME_TDBSHOP)
                }}>
                    <div className='w-[50px] h-[50px] bg-gradient-to-b from-[#151412] to-[#252421] rounded-[15px] p-[12px]'>
                        {/* 图标 */}
                    </div>
                    <div className='text-[#E7E7E7] text-[14px]'>
                        购买
                    </div>
                </div>
                <div className='flex flex-col items-center gap-[15px]'>
                    <div className='w-[50px] h-[50px] bg-gradient-to-b from-[#151412] to-[#252421] rounded-[15px] p-[12px]'>
                        {/* 图标 */}
                    </div>
                    <div className='text-[#E7E7E7] text-[14px]'>
                        转账
                    </div>
                </div>
                <div className='flex flex-col items-center gap-[15px]' onClick={() => {
                    router.push(pathMap.TDBSHOP_TDBORDER)
                }}>
                    <div className='w-[50px] h-[50px] bg-gradient-to-b from-[#151412] to-[#252421] rounded-[15px] p-[12px]'>
                        {/* 图标 */}
                    </div>
                    <div className='text-[#E7E7E7] text-[14px]'>
                        订单
                    </div>
                </div>
            </motion.div>

            {/* 轮播图 */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className='my-[20px] mx-auto rounded-[16px]'
            >
                <Swiper
                    slidesPerView={1}
                    modules={[Pagination]}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {
                        SwiperList.map(item => {
                            return (
                                <SwiperSlide key={item.id} style={{
                                    height: 150,
                                    backgroundColor: '#151412',
                                }}>{item.name}</SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </motion.div>

            {/* 挖矿快速入口 */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='flex items-center justify-between gap-[10px]'
            >
                <div className='w-[30%] p-[12px] bg-[#1A1A1A] rounded-[8px] flex flex-col gap-[15px]'>
                    {
                        getPixelResourceIcon(PIXEL_RESOURCE_TYPES.FARMLAND, {
                            iconSize: 34,
                            haveBackgroundWarper: true,
                            glowColors: ["#F7921B", "#F7921B80", "#f7901b13"],
                        })
                    }
                    <div className='text-[#E7E7E7] text-[14px]'>
                        购买土地&nbsp;&nbsp;&gt;
                    </div>
                </div>
                <div className='w-[30%] p-[12px] bg-[#1A1A1A] rounded-[8px] flex flex-col gap-[15px]'>
                    {
                        getPixelResourceIcon(PIXEL_RESOURCE_TYPES.PICKAXE, {
                            iconSize: 34,
                            haveBackgroundWarper: true,
                            glowColors: ["#62A6F2", "#62A6F280", "#62a5f210"],
                        })
                    }
                    <div className='text-[#E7E7E7] text-[14px]'>
                        开始挖矿&nbsp;&nbsp;&gt;
                    </div>
                </div>
                <div className='w-[30%] p-[12px] bg-[#1A1A1A] rounded-[8px] flex flex-col gap-[15px]'>
                    {
                        getPixelResourceIcon(PIXEL_RESOURCE_TYPES.CITY, {
                            iconSize: 34,
                            haveBackgroundWarper: true,
                            glowColors: ["#EEF01F", "#EEF01F80", "#ecf01f15"],
                        })
                    }
                    <div className='text-[#E7E7E7] text-[14px]'>
                        建设商铺&nbsp;&nbsp;&gt;
                    </div>
                </div>
            </motion.div>


            {/* 数据统计 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap my-[20px] p-[20px] bg-[#1A1A1A] rounded-[8px]"
            >
                {
                    statisticsList.map((item, index) => {
                        return <div className="relative w-1/3 flex flex-col items-center gap-[12px]" key={index}>
                            <div className="text-[18px] font-bold"
                                style={{
                                    color: item.color
                                }}
                            >
                                {item.value}
                            </div>
                            <div className="text-[12px] text-[#CCCCCC]">
                                {item.title}
                            </div>
                            {/* 分割线样式 */}
                            {
                                index !== statisticsList.length - 1 &&
                                <div className="absolute right-0 top-0 w-[1px] h-[100%] bg-[#66666633]"></div>
                            }
                        </div>
                    })
                }

            </motion.div>

            {/* 收益统计 */}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="my-[20px] p-[15px] bg-[#1A1A1A] rounded-[12px]"
            >
                {
                    incomeList.map((item, index) => {
                        return <div className='w-full flex items-center' key={index}>
                            {
                                getPixelResourceIcon(item.icon, {
                                    iconSize: 34,
                                    haveBackgroundWarper: true,
                                })
                            }
                            <div className='border-b border-[#66666640] pl-[10px] py-[20px] flex items-center justify-between flex-grow'>
                                <div className='text-[#CCCCCC] text-[15px]'>
                                    {item.title}
                                </div>
                                <div className='text-[#F07C1F] text-[15px]'>
                                    {item.value}
                                </div>
                            </div>
                        </div>
                    })
                }
            </motion.div>
        </div>
    );
}

export default Home;