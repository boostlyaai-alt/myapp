import { MotiView } from 'moti'
import React, { useState } from 'react'
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Nav from '../(screens-components)/nav'

export default function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [soundEffects, setSoundEffects] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [focusDuration, setFocusDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)

  const settingsSections = [
    {
      title: 'Notifications',
      items: [
        {
          label: 'Enable Notifications',
          value: notifications,
          onValueChange: setNotifications,
          type: 'switch'
        },
        {
          label: 'Sound Effects',
          value: soundEffects,
          onValueChange: setSoundEffects,
          type: 'switch'
        }
      ]
    },
    {
      title: 'Appearance',
      items: [
        {
          label: 'Dark Mode',
          value: darkMode,
          onValueChange: setDarkMode,
          type: 'switch'
        }
      ]
    },
    {
      title: 'Focus Timer',
      items: [
        {
          label: 'Focus Duration (minutes)',
          value: focusDuration,
          onValueChange: setFocusDuration,
          type: 'number',
          options: [15, 20, 25, 30, 45, 60]
        },
        {
          label: 'Break Duration (minutes)',
          value: breakDuration,
          onValueChange: setBreakDuration,
          type: 'number',
          options: [5, 10, 15, 20]
        }
      ]
    }
  ]

  const renderSettingItem = (item: any) => {
    if (item.type === 'switch') {
      return (
        <View key={item.label} className='flex-row justify-between items-center py-4 border-b border-gray-700'>
          <Text className='text-white text-base'>{item.label}</Text>
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: '#767577', true: '#3b82f6' }}
            thumbColor={item.value ? '#ffffff' : '#f4f3f4'}
          />
        </View>
      )
    } else if (item.type === 'number') {
      return (
        <View key={item.label} className='py-4 border-b border-gray-700'>
          <Text className='text-white text-base mb-2'>{item.label}</Text>
          <View className='flex-row flex-wrap'>
            {item.options.map((option: number) => (
              <TouchableOpacity
                key={option}
                className={`px-4 py-2 rounded-lg mr-2 mb-2 ${
                  item.value === option ? 'bg-blue-600' : 'bg-slate-700'
                }`}
                onPress={() => item.onValueChange(option)}
              >
                <Text className={`text-sm font-medium ${
                  item.value === option ? 'text-white' : 'text-gray-300'
                }`}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )
    }
    return null
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

        <ScrollView className='flex-1 px-6'>
          <Text className='text-white text-2xl font-bold mb-6'>Settings</Text>

          {settingsSections.map((section) => (
            <View key={section.title} className='bg-slate-800 rounded-lg p-4 mb-6'>
              <Text className='text-white text-lg font-semibold mb-4'>{section.title}</Text>
              {section.items.map(renderSettingItem)}
            </View>
          ))}

          {/* Account Section */}
          <View className='bg-slate-800 rounded-lg p-4 mb-6'>
            <Text className='text-white text-lg font-semibold mb-4'>Account</Text>
            <TouchableOpacity className='py-4 border-b border-gray-700'>
              <Text className='text-white text-base'>Export Data</Text>
            </TouchableOpacity>
            <TouchableOpacity className='py-4 border-b border-gray-700'>
              <Text className='text-white text-base'>Import Data</Text>
            </TouchableOpacity>
            <TouchableOpacity className='py-4'>
              <Text className='text-red-400 text-base'>Reset All Data</Text>
            </TouchableOpacity>
          </View>

          {/* About Section */}
          <View className='bg-slate-800 rounded-lg p-4 mb-6'>
            <Text className='text-white text-lg font-semibold mb-4'>About</Text>
            <View className='py-2'>
              <Text className='text-gray-400'>Version</Text>
              <Text className='text-white'>1.0.0</Text>
            </View>
            <TouchableOpacity className='py-4 border-t border-gray-700 mt-2'>
              <Text className='text-blue-400 text-base'>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity className='py-4 border-t border-gray-700'>
              <Text className='text-blue-400 text-base'>Terms of Service</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </MotiView>
    </SafeAreaView>
  )
}
