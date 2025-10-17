/*
 * @Author: yy
 * @Date: 2025-10-13 20:22:36
 * @LastEditTime: 2025-10-13 21:04:53
 * @LastEditors: yy
 * @Description: 
 */
import wechatPayImg from "@/public/icon/payment/wechatPay.png";
import alipayImg from "@/public/icon/payment/alipayPayment.png";
import bankImg from "@/public/icon/payment/bankCardPayment.png";
import { StaticImageData } from "next/image";
import Image from 'next/image'
import { cn } from "@/lib/utils";

export type MethodType = 'wechat' | 'alipay' | 'bank'
// 获取对应支付方式文字
export const getMethodTypeLabel = (methodKey: MethodType) => {
    return {
        wechat: '微信支付',
        alipay: '支付宝支付',
        bank: '银行转账',
    }[methodKey]
}

interface Props {
    selected?: MethodType
    onSelect: (method: MethodType) => void
}

export default function PaymentMethodSelector({ selected, onSelect }: Props) {
    const methods: { key: MethodType; label: string; icon: StaticImageData }[] = [
        { key: 'wechat', label: getMethodTypeLabel('wechat'), icon: wechatPayImg },
        { key: 'alipay', label: getMethodTypeLabel('alipay'), icon: alipayImg },
        { key: 'bank', label: getMethodTypeLabel('bank'), icon: bankImg },
    ]

    return (
        <div className="space-y-2">
            {methods.map(method => {
                const hasSelected = selected === method.key;
                return <div
                    key={method.key}
                    onClick={() => onSelect(method.key)}
                    className={`flex items-center space-x-2 p-2 rounded cursor-pointer `}
                >
                    <Image
                        width={24}
                        height={24}
                        alt="payment method icon"
                        src={method.icon}
                        style={{
                            width: 24,
                            height: 24,
                        }}
                    />
                    <span className="flex-1">{method.label}</span>
                    <div className={cn("text-[12px] text-center border border-[#eeeeee1c] border-[1px] rounded-full w-[22px] h-[22px] scale-x-[-1] rotate-45",
                        hasSelected ? "bg-[#cd610b]" : "")}>
                        {hasSelected && 'L'}
                    </div>
                </div>
            })}
        </div>
    )
}
