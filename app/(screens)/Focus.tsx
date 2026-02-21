import { MotiView } from 'moti'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Nav from '../(screens-components)/nav'

export default function Focus() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      setIsBreak(!isBreak)
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60) // Switch between work and break
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, isBreak])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(25 * 60)
    setIsBreak(false)
  }

  return (
    <SafeAreaView className='w-full h-full bg-slate-900'>
      <MotiView
        from={{
          translateY: -100,
          scale: 0.2,
          opacity: 0
        }}
        animate={{
          translateY: 0,
          scale: 1,
          opacity: 1
        }}
        transition={{
          type: "timing",
          duration: 450,
          delay: 60
        }}
        className='flex-1'
      >
        {/* Header Section */}
        <View>
          <Nav />
        </View>

        {/* Focus Timer Section */}
        <View className='flex-1 items-center justify-center px-10'>
          <Text className='text-2xl font-bold text-white mb-4'>
            {isBreak ? 'Break Time' : 'Focus Time'}
          </Text>

          <View className='bg-slate-800 rounded-full w-64 h-64 items-center justify-center mb-8'>
            <Text className='text-6xl font-bold text-white'>
              {formatTime(timeLeft)}
            </Text>
          </View>

          <View className='flex-row space-x-4'>
            <TouchableOpacity
              className={`px-8 py-4 rounded-lg ${isActive ? 'bg-red-600' : 'bg-blue-600'}`}
              onPress={() => setIsActive(!isActive)}
            >
              <Text className='text-white font-bold text-lg'>
                {isActive ? 'Pause' : 'Start'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className='px-8 py-4 rounded-lg bg-gray-600'
              onPress={resetTimer}
            >
              <Text className='text-white font-bold text-lg'>Reset</Text>
            </TouchableOpacity>
          </View>

          <Text className='text-gray-400 mt-8 text-center'>
            {isBreak
              ? 'Take a short break to recharge'
              : 'Stay focused on your mission'
            }
          </Text>
        </View>
      </MotiView>
    </SafeAreaView>
  )
}
