import { View, Text } from 'react-native'
import React from 'react'

type StatusBoxProps = {
    FocusMinutes: number;
    DoneMissions: number;
    AllMisions: number
    UpcomingCount: number
}

export default function StatusBox({FocusMinutes, DoneMissions, AllMisions, UpcomingCount} : StatusBoxProps) {
  return (
    <View className='w-[90%] h-[40%] bg-slate-500 items-center justify-center'>
        <View className='w-full h-full flex items-center justify-center'>
            <Text className='text-base font-bold text-white'>Focus Minutes : {FocusMinutes}</Text>
            <Text className='text-base font-bold text-white'>Done Missions : {DoneMissions}</Text>
            <Text className='text-base font-bold text-white'>All Missions : {AllMisions}</Text>
            <Text className='text-base font-bold text-white'>Upcoming Missions : {UpcomingCount}</Text>
        </View>
    </View>
  )
}