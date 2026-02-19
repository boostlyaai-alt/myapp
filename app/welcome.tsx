import { router } from "expo-router";
import { MotiText, MotiView } from 'moti';
import { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { onboarding } from './constans';

export default function Welcome() {
    const swiperRef = useRef<Swiper>(null);
    const [isAnimating, setIsAnimating] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === onboarding.length - 1;

    useEffect(() => {
        setIsAnimating(true);
    }, [activeIndex]);

    return (
        <SafeAreaView className='flex h-full items-center justify-between bg-gradient-to-b from-slate-50 to-blue-50'>
            {/* Skip Button */}
            <TouchableOpacity 
                onPress={() => router.replace("/(auth)/sign-up")} 
                className='w-full flex justify-end items-end px-5 py-4'
            >
                <Text className='text-slate-600 text-base font-semibold'>Skip</Text>
            </TouchableOpacity>

            {/* Swiper Container */}
            <View className='flex-1 w-full'>
                <Swiper
                    ref={swiperRef}
                    loop={false}
                    dot={
                        <View className='w-2 h-2 mx-1.5 bg-slate-300 rounded-full' />
                    }
                    activeDot={
                        <View className='w-8 h-2 mx-1.5 bg-blue-500 rounded-full' />
                    }
                    onIndexChanged={(index) => {
                        setActiveIndex(index);
                        setIsAnimating(true);
                    }}
                    paginationStyle={{ bottom: 30 }}
                >
                    {onboarding.map((item) => (
                        <View 
                            key={item.id} 
                            className='flex items-center justify-center w-full h-full px-8'
                        >
                            {/* Icon/Illustration Placeholder */}
                            <MotiView
                                from={{
                                    opacity: 0,
                                    scale: 0.5,
                                    translateY: 40,
                                }}
                                animate={{
                                    opacity: isAnimating ? 1 : 0,
                                    scale: isAnimating ? 1 : 0.5,
                                    translateY: isAnimating ? 0 : 40,
                                }}
                                transition={{
                                    type: 'spring',
                                    damping: 10,
                                    mass: 1,
                                }}
                                className='w-48 h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl mb-12'
                            />

                            {/* Title */}
                            <MotiView
                                from={{
                                    opacity: 0,
                                    translateY: 30,
                                }}
                                animate={{
                                    opacity: isAnimating ? 1 : 0,
                                    translateY: isAnimating ? 0 : 30,
                                }}
                                transition={{
                                    type: 'spring',
                                    damping: 12,
                                    delay: 100,
                                }}
                            >
                                <MotiText className='text-slate-900 text-4xl font-bold text-center mb-6'>
                                    {item.title}
                                </MotiText>
                            </MotiView>

                            {/* Description */}
                            <MotiView
                                from={{
                                    opacity: 0,
                                    translateY: 30,
                                }}
                                animate={{
                                    opacity: isAnimating ? 1 : 0,
                                    translateY: isAnimating ? 0 : 30,
                                }}
                                transition={{
                                    type: 'spring',
                                    damping: 12,
                                    delay: 200,
                                }}
                            >
                                <MotiText className='text-slate-600 text-lg text-center leading-relaxed'>
                                    {item.disc}
                                </MotiText>
                            </MotiView>
                        </View>
                    ))}
                </Swiper>
            </View>

            {/* Action Button */}
            <MotiView
                from={{
                    opacity: 0,
                    scale: 0.8,
                    translateY: 50,
                }}
                animate={{
                    opacity: isAnimating ? 1 : 0,
                    scale: isAnimating ? 1 : 0.8,
                    translateY: isAnimating ? 0 : 50,
                }}
                transition={{
                    type: 'spring',
                    damping: 10,
                    delay: 300,
                }}
                className='w-full px-6'
            >
                <TouchableOpacity
                    onPress={() => isLastSlide ? router.replace("/(auth)/sign-up") : swiperRef.current?.scrollBy(1)}
                    activeOpacity={0.8}
                    className='bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl py-4 mb-8 shadow-lg'
                >
                    <Text className='text-white text-center text-lg font-bold'>
                        {isLastSlide ? "Get Started" : "Next"}
                    </Text>
                </TouchableOpacity>
            </MotiView>
        </SafeAreaView>
    );
};