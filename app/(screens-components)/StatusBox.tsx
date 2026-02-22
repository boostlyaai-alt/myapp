import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type StatusBoxProps = {
    FocusMinutes: number;
    DoneMissions: number;
    AllMisions: number
    UpcomingCount: number
}

export default function StatusBox({FocusMinutes, DoneMissions, AllMisions, UpcomingCount} : StatusBoxProps) {
  return (
    <View style={styles.container}>
        <View style={styles.innerContainer}>
            <Text style={styles.text}>Focus Minutes : {FocusMinutes}</Text>
            <Text style={styles.text}>Done Missions : {DoneMissions}</Text>
            <Text style={styles.text}>All Missions : {AllMisions}</Text>
            <Text style={styles.text}>Upcoming Missions : {UpcomingCount}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '40%',
    backgroundColor: '#64748b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});