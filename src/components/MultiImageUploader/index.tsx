/*
 * @Author: yy
 * @Date: 2025-10-14 20:52:24
 * @LastEditTime: 2025-10-17 22:05:40
 * @LastEditors: yy
 * @Description: 
 */
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface MultiImageUploaderProps {
    imagesList?: File[];
    max?: number;
    placeholder?: string;
    onChange?: (images: File[]) => void;
}

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({ imagesList, max = 5, placeholder = "点击上传", onChange }) => {
    const [images, setImages] = useState<File[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newImages = files.slice(0, max - images.length); // 限制最大数量
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onChange?.(updatedImages);
        e.target.value = ''; // 允许选择相同文件
    };

    const handleRemove = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        onChange?.(updatedImages);
    };

    useEffect(() => {
        setImages(imagesList ?? []);
    }, [imagesList]);

    return (
        <div className="flex flex-wrap gap-2">
            {/* 图片预览 */}
            {images.map((file, index) => {
                const url = URL.createObjectURL(file);
                return (
                    <div key={index} className="relative w-[85px] h-[85px] rounded overflow-hidden bg-[#00000066]">
                        <Image
                            src={url}
                            alt={`preview-${index}`}
                            width={85}
                            height={85}
                            className="rounded absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                        <button
                            onClick={() => handleRemove(index)}
                            className="absolute top-2 right-2 bg-black bg-opacity-50 p-1 rounded-full"
                        >
                            <X size={16} className="text-white" />
                        </button>
                    </div>
                );
            })}

            {/* 上传按钮 */}
            {images.length < max && (
                <label className="w-24 h-24 bg-gray-700 border-2 border border-gray-600 flex items-center justify-center flex-col text-gray-400 text-xl rounded cursor-pointer hover:border-gray-400">
                    <div className='text-[40px]'>+</div>
                    <div className='text-center text-[15px] text-[#666666]'>
                        {placeholder}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                        className="hidden"
                    />
                </label>
            )}
        </div>
    );
};

export default MultiImageUploader;
