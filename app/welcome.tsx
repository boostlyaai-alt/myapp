import { router } from "expo-router";
import { MotiText, MotiView } from 'moti';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        <SafeAreaView style={styles.container}>
            {/* Skip Button */}
            <TouchableOpacity 
                onPress={() => router.replace("/(auth)/sign-up")} 
                style={styles.skipButton}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* Swiper Container */}
            <View style={styles.swiperContainer}>
                <Swiper
                    ref={swiperRef}
                    loop={false}
                    dot={
                        <View style={styles.dot} />
                    }
                    activeDot={
                        <View style={styles.activeDot} />
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
                            style={styles.slide}
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
                                style={styles.icon}
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
                                <MotiText style={styles.title}>
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
                                <MotiText style={styles.description}>
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
                style={styles.buttonContainer}
            >
                <TouchableOpacity
                    onPress={() => isLastSlide ? router.replace("/(auth)/sign-up") : swiperRef.current?.scrollBy(1)}
                    activeOpacity={0.8}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        {isLastSlide ? "Get Started" : "Next"}
                    </Text>
                </TouchableOpacity>
            </MotiView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8fafc', // approximate gradient start
    },
    skipButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    skipText: {
        color: '#475569',
        fontSize: 16,
        fontWeight: '600',
    },
    swiperContainer: {
        flex: 1,
        width: '100%',
    },
    dot: {
        width: 8,
        height: 8,
        marginHorizontal: 6,
        backgroundColor: '#cbd5e1',
        borderRadius: 4,
    },
    activeDot: {
        width: 32,
        height: 8,
        marginHorizontal: 6,
        backgroundColor: '#3b82f6',
        borderRadius: 4,
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        paddingHorizontal: 32,
    },
    icon: {
        width: 192,
        height: 192,
        backgroundColor: '#3b82f6', // approximate gradient
        borderRadius: 24,
        marginBottom: 48,
    },
    title: {
        color: '#0f172a',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    description: {
        color: '#475569',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 28,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 24,
    },
    button: {
        backgroundColor: '#3b82f6', // approximate gradient
        borderRadius: 16,
        paddingVertical: 16,
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});