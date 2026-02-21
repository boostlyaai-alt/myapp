import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function Nav() {
  return (
    <View className='w-full h-[125px] bg-slate-500 flex items-center justify-center'>
        <View className='my-5 px-5'>
         <View className='flex justify-between items-center'>
          <Text className='text-base font-bold text-white'>Hello user</Text>
          <Text className='text-base font-bold text-white'>Date : </Text>
          <Text className='text-base font-bold text-white'>Strike : </Text>
          <TouchableOpacity
          className='w-20 h-20 rounded-full px-2 py-2 '
          >
            Settings
          </TouchableOpacity>
         </View>
        </View>
       </View>
  )
}