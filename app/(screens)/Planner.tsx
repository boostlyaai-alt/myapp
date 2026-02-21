import { MotiView } from 'moti'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddMission from '../(screens-components)/AddMission'
import Nav from '../(screens-components)/nav'

type Mission = {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

export default function Planner() {
  const [missions, setMissions] = useState<Mission[]>([
    { id: '1', title: 'Complete project proposal', completed: false, priority: 'high' },
    { id: '2', title: 'Review team feedback', completed: true, priority: 'medium' },
    { id: '3', title: 'Update documentation', completed: false, priority: 'low' },
  ])

  const addMission = (title: string) => {
    const newMission: Mission = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority: 'medium'
    }
    setMissions([...missions, newMission])
  }

  const toggleMission = (id: string) => {
    setMissions(missions.map(mission =>
      mission.id === id ? { ...mission, completed: !mission.completed } : mission
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const completedCount = missions.filter(m => m.completed).length
  const totalCount = missions.length

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

        {/* Progress Summary */}
        <View className='px-6 py-4'>
          <Text className='text-white text-lg font-bold mb-2'>Mission Progress</Text>
          <Text className='text-gray-400'>
            {completedCount} of {totalCount} missions completed
          </Text>
          <View className='w-full bg-gray-700 rounded-full h-2 mt-2'>
            <View
              className='bg-blue-600 h-2 rounded-full'
              style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
            />
          </View>
        </View>

        {/* Add Mission */}
        <View className='px-6'>
          <AddMission onAddMission={addMission} />
        </View>

        {/* Missions List */}
        <ScrollView className='flex-1 px-6 mt-4'>
          <Text className='text-white text-lg font-bold mb-4'>Your Missions</Text>
          {missions.map((mission) => (
            <TouchableOpacity
              key={mission.id}
              className={`bg-slate-800 rounded-lg p-4 mb-3 flex-row items-center ${
                mission.completed ? 'opacity-60' : ''
              }`}
              onPress={() => toggleMission(mission.id)}
            >
              <View className={`w-4 h-4 rounded-full mr-3 ${getPriorityColor(mission.priority)}`} />
              <View className='flex-1'>
                <Text className={`text-white font-medium ${mission.completed ? 'line-through' : ''}`}>
                  {mission.title}
                </Text>
                <Text className='text-gray-400 text-sm capitalize'>{mission.priority} priority</Text>
              </View>
              <View className={`w-6 h-6 rounded-full border-2 border-white items-center justify-center ${
                mission.completed ? 'bg-blue-600' : ''
              }`}>
                {mission.completed && <Text className='text-white text-sm'>✓</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </MotiView>
    </SafeAreaView>
  )
}
