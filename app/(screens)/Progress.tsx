import { MotiView } from 'moti'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Nav from '../(screens-components)/nav'

export default function Progress() {
  // Mock data - in a real app, this would come from state management or API
  const weeklyData = [
    { day: 'Mon', focusMinutes: 120, missionsCompleted: 3 },
    { day: 'Tue', focusMinutes: 90, missionsCompleted: 2 },
    { day: 'Wed', focusMinutes: 150, missionsCompleted: 4 },
    { day: 'Thu', focusMinutes: 110, missionsCompleted: 3 },
    { day: 'Fri', focusMinutes: 130, missionsCompleted: 3 },
    { day: 'Sat', focusMinutes: 80, missionsCompleted: 2 },
    { day: 'Sun', focusMinutes: 60, missionsCompleted: 1 },
  ]

  const totalFocusMinutes = weeklyData.reduce((sum, day) => sum + day.focusMinutes, 0)
  const totalMissions = weeklyData.reduce((sum, day) => sum + day.missionsCompleted, 0)
  const averageFocus = Math.round(totalFocusMinutes / 7)
  const averageMissions = Math.round(totalMissions / 7)

  const maxFocusMinutes = Math.max(...weeklyData.map(d => d.focusMinutes))

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

        <ScrollView className='flex-1 px-6'>
          {/* Weekly Summary */}
          <View className='bg-slate-800 rounded-lg p-6 mb-6'>
            <Text className='text-white text-xl font-bold mb-4'>This Week</Text>
            <View className='flex-row justify-between mb-4'>
              <View className='items-center'>
                <Text className='text-2xl font-bold text-blue-400'>{totalFocusMinutes}</Text>
                <Text className='text-gray-400'>Focus Minutes</Text>
              </View>
              <View className='items-center'>
                <Text className='text-2xl font-bold text-green-400'>{totalMissions}</Text>
                <Text className='text-gray-400'>Missions Done</Text>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <View className='items-center'>
                <Text className='text-lg font-semibold text-yellow-400'>{averageFocus}</Text>
                <Text className='text-gray-400'>Avg Focus/Day</Text>
              </View>
              <View className='items-center'>
                <Text className='text-lg font-semibold text-purple-400'>{averageMissions}</Text>
                <Text className='text-gray-400'>Avg Missions/Day</Text>
              </View>
            </View>
          </View>

          {/* Daily Progress Chart */}
          <View className='bg-slate-800 rounded-lg p-6 mb-6'>
            <Text className='text-white text-xl font-bold mb-4'>Daily Focus Time</Text>
            <View className='flex-row justify-between items-end h-32'>
              {weeklyData.map((day, index) => (
                <View key={index} className='items-center flex-1'>
                  <View
                    className='bg-blue-600 rounded-t w-8 mb-2'
                    style={{
                      height: `${(day.focusMinutes / maxFocusMinutes) * 100}%`,
                      minHeight: 4
                    }}
                  />
                  <Text className='text-gray-400 text-xs'>{day.day}</Text>
                  <Text className='text-white text-xs font-semibold'>{day.focusMinutes}m</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Missions Completed Chart */}
          <View className='bg-slate-800 rounded-lg p-6 mb-6'>
            <Text className='text-white text-xl font-bold mb-4'>Missions Completed</Text>
            <View className='flex-row justify-between items-end h-32'>
              {weeklyData.map((day, index) => (
                <View key={index} className='items-center flex-1'>
                  <View
                    className='bg-green-600 rounded-t w-8 mb-2'
                    style={{
                      height: `${(day.missionsCompleted / 4) * 100}%`, // Assuming max 4 missions per day
                      minHeight: 4
                    }}
                  />
                  <Text className='text-gray-400 text-xs'>{day.day}</Text>
                  <Text className='text-white text-xs font-semibold'>{day.missionsCompleted}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Achievements */}
          <View className='bg-slate-800 rounded-lg p-6'>
            <Text className='text-white text-xl font-bold mb-4'>Achievements</Text>
            <View className='space-y-3'>
              <View className='flex-row items-center'>
                <View className='w-8 h-8 bg-yellow-500 rounded-full items-center justify-center mr-3'>
                  <Text className='text-black font-bold'>🏆</Text>
                </View>
                <View>
                  <Text className='text-white font-semibold'>Focus Master</Text>
                  <Text className='text-gray-400 text-sm'>Completed 10+ focus sessions</Text>
                </View>
              </View>
              <View className='flex-row items-center'>
                <View className='w-8 h-8 bg-blue-500 rounded-full items-center justify-center mr-3'>
                  <Text className='text-black font-bold'>📈</Text>
                </View>
                <View>
                  <Text className='text-white font-semibold'>Consistent</Text>
                  <Text className='text-gray-400 text-sm'>7 days in a row</Text>
                </View>
              </View>
              <View className='flex-row items-center opacity-50'>
                <View className='w-8 h-8 bg-gray-600 rounded-full items-center justify-center mr-3'>
                  <Text className='text-white font-bold'>🎯</Text>
                </View>
                <View>
                  <Text className='text-gray-400 font-semibold'>Mission Complete</Text>
                  <Text className='text-gray-500 text-sm'>Complete 50 missions</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </MotiView>
    </SafeAreaView>
  )
}
