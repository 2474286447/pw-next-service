import { ErrorBoundary } from "@/components/ErrorBoundary"
import PixelBottomDrawer from "@/components/shared/PixelBottomDrawer"
import { PixelButton } from "@/components/shared/PixelButton"
import { PixelTipsModal } from "@/components/shared/PixelTipsModal";
import { cn } from "@/lib/utils"
import { getPixelResourceIcon, PIXEL_RESOURCE_TYPES } from "@/utils/pixelResourceTool";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface BuyDrawerProps {
    BuyDrawerOpen: boolean;
    setBuyDrawerOpen: (open: boolean) => void;
}

/** 购买弹窗 */
const BuyDrawer = (props: BuyDrawerProps) => {
    const { BuyDrawerOpen, setBuyDrawerOpen } = props;

    // 购买数量
    const [buyAmount, setbuyAmount] = useState(1);
    // 二次确认状态
    const [confirm, setConfirm] = useState(false);
    // 购买成功提示框显示状态
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [shouldAnimate, setShouldAnimate] = useState(false);
    // 处理确认事件
    const handleConfirm = () => {
        if (confirm) {
            // TODO: 调用购买接口
            setConfirm(false);
            setShowSuccessModal(true);
            setBuyDrawerOpen(false);
        } else {
            if (buyAmount <= 0) {
                toast.error("购买数量必须大于0");
                return;
            }
            if (buyAmount > 100) {
                toast.error("购买数量必须小于100");
                return;
            }

            setConfirm(true)
        }
    }
    // 处理购买工具数量改变事件
    const handleBuyAmountCountChange = (value: string) => {
        // 匹配数字
        const reg = /^\d+$/;
        if (!reg.test(value)) {
            setbuyAmount(1);
            return;
        }
        // 转换为数字
        const count = parseInt(value);
        // 判断是否大于0
        if (count <= 0) {
            setbuyAmount(1);
            return;
        }
        setbuyAmount(count);
    }

    useEffect(() => {
        // 当confirm状态改变时触发动画
        setShouldAnimate(confirm);
        // 动画结束后重置状态
        const timer = setTimeout(() => setShouldAnimate(!confirm), 300);
        return () => clearTimeout(timer);
    }, [confirm]);

    return <ErrorBoundary>
        <PixelBottomDrawer
            header={
                !confirm ? <>
                    {/* 标题 */}
                    <div className="absolute top-4 left-1/2 text-[#E0E0E0] text-[14px] font-bold translate-x-[-50%]">
                        购买
                    </div>
                    {/* 关闭按钮 */}
                    <button
                        onClick={() => setBuyDrawerOpen(false)}
                        className="absolute top-4 right-4 w-[20px] h-[20px] bg-[#353535] rounded-full flex items-center justify-center text-white text-[10px]"
                    >
                        ✕
                    </button>
                </>
                    : <>
                        {/* 关闭按钮 */}
                        <button
                            onClick={() => setConfirm(false)}
                            className="absolute top-4 left-4 w-[20px] h-[20px] flex items-center justify-center text-white text-[10px]"
                        >
                            &lt;
                        </button>
                        {/* 标题 */}
                        <div className="absolute top-4 left-1/2 text-[#E0E0E0] text-[14px] font-bold translate-x-[-50%]">
                            确认订单
                        </div>
                    </>
            }
            height={confirm ? "50vh" : "70vh"}
            isVisible={BuyDrawerOpen}
            onClose={() => setBuyDrawerOpen(false)}
        >
            <div className="relative">
                {shouldAnimate && <motion.div
                    key={confirm ? 'default1' : 'default2'}
                    initial={{ x: confirm ? "0%" : "-150%" }}
                    animate={{ x: confirm ? "-150%" : "0%" }}
                    exit={{ x: confirm ? "0%" : "-150%" }}
                    className="w-full pb-[60px] absolute top-0 left-0"
                >
                    <div className="text-[15px] text-[#E7E7E7] mt-[20px] mb-[10px]">
                        铁矿
                    </div>
                    <div className="rounded-[5px] bg-[#272727] p-[15px] mb-[15px]">
                        <div className="flex items-center justify-between gap-[15px]">
                            <div className="flex items-center gap-[10px]">
                                {
                                    getPixelResourceIcon(PIXEL_RESOURCE_TYPES.IRON_ORE, {
                                        iconSize: 34,
                                        haveBackgroundWarper: true,
                                    })
                                }
                                <div className="text-[14px] text-[#E7E7E7]">铁矿</div>
                            </div>
                            <div className="text-[#F07C1F] text-[15px]">
                                1234.12
                                <span className="text-[12px]">
                                    TDB/个
                                </span>
                            </div>
                        </div>
                        <div className="mt-[14px] text-[#999999] text-[14px]">
                            剩余数量：231523
                        </div>
                    </div>
                    <div className="rounded-[5px] bg-[#272727] px-[10px] pt-[15px] pb-[20px] mb-[15px]">
                        <div className="flex items-center justify-between border-b-[0.5px] border-[#666666] w-full pb-[15px] mb-[15px]">
                            <div className="text-[#E7E7E7] text-[15px]">
                                合成数量
                            </div>
                            <div className="h-[40px] bg-[#353535] rounded-full p-[6px] px-[30px] relative">
                                <input
                                    className="w-[80px] text-center bg-[#353535] text-[#E7E7E7] text-[18px]"
                                    type="text"
                                    inputMode="numeric"
                                    value={buyAmount}
                                    onChange={e => handleBuyAmountCountChange(e.target.value)}
                                />
                            </div>
                            <PixelButton
                                variant="secondary"
                                className="w-[80px] h-[30px] p-0 rounded-full text-[#F7921B] text-[12px]"
                                onClick={() => handleBuyAmountCountChange(`${100}`)}
                            >
                                最大
                            </PixelButton>
                        </div>
                        <div className="flex items-center justify-between mb-[18px]">
                            <div className="text-[#CCCCCC] text-[14px]">
                                合计金额
                            </div>
                            <div className="text-[#F07C1F] text-[15px]">
                                1234.12
                                <span className="text-[12px]">
                                    TDB
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-[#CCCCCC] text-[14px]">
                                账户余额
                            </div>
                            <div className="text-[#F07C1F] text-[15px]">
                                121234.12
                                <span className="text-[12px]">
                                    TDB
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>}

                {!shouldAnimate && <motion.div
                    key={confirm ? 'confirm1' : 'confirm2'}
                    initial={{ x: confirm ? "150%" : "0%" }}
                    animate={{ x: confirm ? "0%" : "150%" }}
                    exit={{ x: confirm ? "150%" : "0%" }}
                    className="w-full pb-[60px] absolute top-0 left-0"
                >
                    <div className="rounded-[5px] bg-[#272727] px-[10px] pt-[15px] pb-[20px] mt-[10px] mb-[15px]">

                        <div className="flex items-center justify-between mb-[18px]">
                            <div className="text-[#999999] text-[14px]">
                                购买商品
                            </div>
                            <div className="text-[#E7E7E7] text-[14px]">
                                铁矿
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-[18px]">
                            <div className="text-[#999999] text-[14px]">
                                购买数量
                            </div>
                            <div className="text-[#E7E7E7] text-[14px]">
                                100
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-[18px]">
                            <div className="text-[#999999] text-[14px]">
                                购买单价
                            </div>
                            <div className="text-[#E7E7E7] text-[14px]">
                                1234.39
                                <span className="text-[12px]">
                                    TDB
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-t-[0.5px] border-[#666666] w-full pt-[15px] mt-[15px]">
                            <div className="text-[#E7E7E7] text-[15px]">
                                合计金额
                            </div>
                            <div className="text-[#F07C1F] text-[15px]">
                                121234.12
                                <span className="text-[12px]">
                                    TDB
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>}
            </div>

            <PixelButton
                variant="primary"
                className={cn(
                    "w-[calc(100%-32px)] h-[44px] rounded-full text-[#fff] text-[15px] fixed left-[16px] bottom-[16px]",
                )}
                onClick={handleConfirm}
            >
                {!confirm ? "确认" : "确认购买"}
            </PixelButton>
        </PixelBottomDrawer>

        <PixelTipsModal
            isVisible={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
        >
            <div className="bg-[#1E1C1B] py-[18px] px-[50px] text-[#E7E7E7] text-[15] rounded-[15px]">
                购买成功
            </div>
        </PixelTipsModal>
    </ErrorBoundary>
}

export default BuyDrawer;