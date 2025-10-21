/*
 * @Author: yy
 * @Date: 2025-10-13 20:39:34
 * @LastEditTime: 2025-10-13 20:42:54
 * @LastEditors: yy
 * @Description: 
 */

import Image from 'next/image';
import testImg from "@/public/hoeIcon.png";
import { ErrorBoundary } from '@/components/ErrorBoundary';

const GoodsIcon = (props: {
    imgSrc: "",
}) => {

    const { imgSrc } = props;

    return <ErrorBoundary>
        <div className="w-[80px] h-[80px] relative bg-[#1A1A1A] overflow-hidden rounded-[8px]">
            <Image
                width={80}
                height={80}
                alt="land"
                src={testImg}
                style={{
                    width: 80,
                    height: 80,
                }}
            />
            <div className="absolute bottom-0 left-0 p-[5px] text-center w-full bg-[#cd610b85] text-[#E7E7E7] text-[12px]">TDB123</div>
        </div>
    </ErrorBoundary>
}

export default GoodsIcon;