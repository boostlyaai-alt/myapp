import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddMission from '../(screens-components)/AddMission'
import Nav from '../(screens-components)/nav'
import QuickActions from '../(screens-components)/QuickActions'
import StatusBox from '../(screens-components)/StatusBox'

export default function dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header Section */}
        <View>
         <Nav />
        </View>
        {/* Missions bar */}
         <AddMission />
       {/* Todays's status section */}
       <View style={styles.statusContainer}>
        <StatusBox FocusMinutes={120} DoneMissions={3} AllMisions={5} UpcomingCount={2} />
       </View>
       {/* Quick Actions */}
       <QuickActions />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0f172a',
  },
  statusContainer: {
    paddingHorizontal: 40,
    paddingVertical: 8,
  },
});