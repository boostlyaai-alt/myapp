import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MotiView } from 'moti'
import Nav from '../(screens-components)/nav'
import StatusBox from '../(screens-components)/StatusBox'

export default function dashboard() {
  return (
    <SafeAreaView className='w-full h-full bg-slate-900'>
      <MotiView
      from={{
        translateY:-100,
        scale:0.2,
        opacity:0
      }}
      animate={{
        translateY:0,
        scale:1,
        opacity:1
      }}
      transition={{ type: "timing",
         duration: 450,
          delay: 60 
     }}
     className=''
      >
        {/* Header Section */}
        <View>
         <Nav />
        </View>
       {/* Todays's status section */}
       <View className='px-10 py-2'>
        <StatusBox FocusMinutes={120} DoneMissions={3} AllMisions={5} UpcomingCount={2} />
       </View>
      </MotiView>
    </SafeAreaView>
  )
};