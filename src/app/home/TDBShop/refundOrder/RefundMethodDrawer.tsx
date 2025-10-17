import PixelBottomDrawer from "@/components/shared/PixelBottomDrawer"
import { PixelButton } from "@/components/shared/PixelButton";
import { cn } from "@/lib/utils";
import PaymentMethodSelector, { MethodType } from "../PaymentMethodSelector";
import { useEffect, useState } from "react";
import MultiImageUploader from "@/components/MultiImageUploader";

interface refundMethodDrawerProps {
    /** 抽屉显示状态 */
    refundMethodDrawerOpen: boolean;
    /** 设置抽屉显示状态 */
    setRefundMethodDrawerOpen: (open: boolean) => void;
    /** 设置支付方式 */
    setSelectedPaymentMethod: (method: MethodType) => void;
    /** 退款方式提交成功回调 */
    onRefundMethodSubmit: () => void;
}

interface contactInfoType {
    /** 上传的图片 */
    images: File[];
    /** 账户名称 */
    accountName?: string;
    /** 开户银行 */
    bankName?: string;
    /** 银行账号 */
    bankAccount?: string;
    /** 联系方式 */
    contact?: string;
}

const RefundMethodDrawer = (props: refundMethodDrawerProps) => {
    const { refundMethodDrawerOpen, setRefundMethodDrawerOpen, setSelectedPaymentMethod, onRefundMethodSubmit } = props;

    // 选中的支付方式
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<MethodType>('alipay');
    // 收款信息
    const [contactInfo, setContactInfo] = useState<contactInfoType>({
        images: [],
        accountName: "",
        bankName: "",
        bankAccount: "",
        contact: "",
    });

    // 是否为银行卡支付方式
    const isBankPayment = selectedPaymentStatus === 'bank'

    // 处理退款提交
    const handleRefundMethodSubmit = () => {
        setRefundMethodDrawerOpen(false);
        setSelectedPaymentMethod(selectedPaymentStatus);
    }

    // 验证对应支付方式收款信息是否为空
    const validateContactInfoHasEmpty = () => {
        // 判断字段是否为空
        const isEmpty = (value: string | undefined) => value === void 0 || (value?.trim ? value?.trim() === '' : false);

        // 若为银行支付方式
        if (isBankPayment) {
            return isEmpty(contactInfo.accountName)
                || isEmpty(contactInfo.bankName)
                || isEmpty(contactInfo.bankAccount)
                || isEmpty(contactInfo.contact)
        } else {
            return isEmpty(contactInfo.contact) || !contactInfo?.images?.length
        }
    }

    useEffect(() => {
        // 关闭时重置收款信息
        if (!refundMethodDrawerOpen) {
            setContactInfo(
                {
                    images: [],
                    accountName: "",
                    bankName: "",
                    bankAccount: "",
                    contact: "",
                }
            )
        }
    }, [refundMethodDrawerOpen]);

    // 提交退款按钮是否禁用
    const refundMethodButtonDisabled = validateContactInfoHasEmpty();
    // 待填信息渲染信息
    const renderContactInfo =
        isBankPayment ? [
            {
                name: '账户名称',
                value: contactInfo.accountName,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setContactInfo(prev => ({ ...prev, accountName: e.target.value }))
            },
            {
                name: '开户银行',
                value: contactInfo.bankName,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setContactInfo(prev => ({ ...prev, bankName: e.target.value }))
            },
            {
                name: '银行账号',
                value: contactInfo.bankAccount,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setContactInfo(prev => ({ ...prev, bankAccount: e.target.value }))
            },
            {
                name: '联系方式',
                value: contactInfo.contact,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setContactInfo(prev => ({ ...prev, contact: e.target.value }))
            }
        ]
            : [
                {
                    name: '联系方式',
                    value: contactInfo.contact,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setContactInfo(prev => ({ ...prev, contact: e.target.value }))
                }
            ]
    return <>
        <PixelBottomDrawer
            title="退款方式"
            isVisible={refundMethodDrawerOpen}
            onClose={() => setRefundMethodDrawerOpen(false)}
        >
            <div className="w-full pb-[60px]">

                <div className="bg-[#212121] rounded-xl p-4 max-w-md mx-auto space-y-4 mb-[15px]">
                    {/* 支付方式 */}
                    <PaymentMethodSelector selected={selectedPaymentStatus} onSelect={setSelectedPaymentStatus} />
                </div>

                <div className="text-[15px] text-[#E7E7E7] mb-[15px]">
                    收款信息
                </div>

                <div style={{
                    display: isBankPayment ? 'none' : 'block'
                }}>
                    <MultiImageUploader max={2} placeholder={"上传收款码"} onChange={(images) => {
                        setContactInfo(prev => ({ ...prev, images }))
                    }} />
                </div>

                <div className="bg-[#212121] rounded-xl p-4 max-w-md mx-auto space-y-4 my-[15px]">
                    {
                        renderContactInfo?.map((item, index) => {
                            return <div key={index} className="flex items-center justify-between gap-[10px]">
                                <div className="text-[15px] text-[#E7E7E7]">
                                    <span className="text-[#F7921B]">*</span>
                                    {item?.name}
                                </div>
                                <div className="flex-1 flex items-center justify-end">
                                    <input
                                        type="text"
                                        className="bg-transparent text-end text-[#E7E7E7] text-[15px] w-full"
                                        placeholder="请输入"
                                        value={item?.value}
                                        onChange={item?.onChange}
                                    />
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>

            <PixelButton
                variant="primary"
                className={cn(
                    "w-[calc(100%-32px)] h-[44px] rounded-full text-[#fff] text-[15px] fixed left-[16px] bottom-[16px]",
                    refundMethodButtonDisabled ? 'bg-[#999999] cursor-not pointer-events-none' : 'bg-[#F7921B] cursor-pointer'
                )}
                disabled={refundMethodButtonDisabled}
                onClick={handleRefundMethodSubmit}
            >
                确认
            </PixelButton>
        </PixelBottomDrawer>
    </>
}

export default RefundMethodDrawer;