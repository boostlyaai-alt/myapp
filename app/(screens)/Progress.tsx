import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
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
    <SafeAreaView style={styles.container}>
      <View
        style={{ flex: 1 }}
      >
        {/* Header Section */}
        <View>
          <Nav />
        </View>

        <ScrollView style={styles.scrollView}>
          {/* Weekly Summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.cardTitle}>This Week</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryNumber, { color: '#60a5fa' }]}>{totalFocusMinutes}</Text>
                <Text style={styles.summaryLabel}>Focus Minutes</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryNumber, { color: '#4ade80' }]}>{totalMissions}</Text>
                <Text style={styles.summaryLabel}>Missions Done</Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summarySubNumber, { color: '#eab308' }]}>{averageFocus}</Text>
                <Text style={styles.summaryLabel}>Avg Focus/Day</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summarySubNumber, { color: '#a78bfa' }]}>{averageMissions}</Text>
                <Text style={styles.summaryLabel}>Avg Missions/Day</Text>
              </View>
            </View>
          </View>

          {/* Daily Progress Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.cardTitle}>Daily Focus Time</Text>
            <View style={styles.chartContainer}>
              {weeklyData.map((day, index) => (
                <View key={index} style={styles.barContainer}>
                  <View
                    style={[styles.bar, { height: `${(day.focusMinutes / maxFocusMinutes) * 100}%`, minHeight: 4 }]}
                  />
                  <Text style={styles.barLabel}>{day.day}</Text>
                  <Text style={styles.barValue}>{day.focusMinutes}m</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Missions Completed Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.cardTitle}>Missions Completed</Text>
            <View style={styles.chartContainer}>
              {weeklyData.map((day, index) => (
                <View key={index} style={styles.barContainer}>
                  <View
                    style={[styles.missionsBar, { height: `${(day.missionsCompleted / 4) * 100}%`, minHeight: 4 }]}
                  />
                  <Text style={styles.barLabel}>{day.day}</Text>
                  <Text style={styles.barValue}>{day.missionsCompleted}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Achievements */}
          <View style={styles.achievementsCard}>
            <Text style={styles.cardTitle}>Achievements</Text>
            <View style={styles.achievementsList}>
              <View style={styles.achievementItem}>
                <View style={[styles.achievementIcon, { backgroundColor: '#eab308' }]}>
                  <Text style={styles.achievementEmoji}>🏆</Text>
                </View>
                <View>
                  <Text style={styles.achievementName}>Focus Master</Text>
                  <Text style={styles.achievementDesc}>Completed 10+ focus sessions</Text>
                </View>
              </View>
              <View style={styles.achievementItem}>
                <View style={[styles.achievementIcon, { backgroundColor: '#3b82f6' }]}>
                  <Text style={styles.achievementEmoji}>📈</Text>
                </View>
                <View>
                  <Text style={styles.achievementName}>Consistent</Text>
                  <Text style={styles.achievementDesc}>7 days in a row</Text>
                </View>
              </View>
              <View style={[styles.achievementItem, { opacity: 0.5 }]}>
                <View style={[styles.achievementIcon, { backgroundColor: '#4b5563' }]}>
                  <Text style={styles.achievementEmoji}>🎯</Text>
                </View>
                <View>
                  <Text style={[styles.achievementName, { color: '#9ca3af' }]}>Mission Complete</Text>
                  <Text style={[styles.achievementDesc, { color: '#6b7280' }]}>Complete 50 missions</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  summaryCard: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 24,
    marginBottom: 24,
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  summarySubNumber: {
    fontSize: 18,
    fontWeight: '600',
  },
  summaryLabel: {
    color: '#9ca3af',
  },
  chartCard: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 24,
    marginBottom: 24,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 128,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    backgroundColor: '#2563eb',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    width: 32,
    marginBottom: 8,
  },
  missionsBar: {
    backgroundColor: '#16a34a',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    width: 32,
    marginBottom: 8,
  },
  barLabel: {
    color: '#9ca3af',
    fontSize: 12,
  },
  barValue: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  achievementsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 24,
  },
  achievementsList: {
    // space-y-3 equivalent
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementEmoji: {
    color: 'black',
    fontWeight: 'bold',
  },
  achievementName: {
    color: 'white',
    fontWeight: '600',
  },
  achievementDesc: {
    color: '#9ca3af',
    fontSize: 14,
  },
});
