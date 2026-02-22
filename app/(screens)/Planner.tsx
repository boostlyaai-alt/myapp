import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
      case 'high': return '#ef4444'
      case 'medium': return '#eab308'
      case 'low': return '#22c55e'
      default: return '#6b7280'
    }
  }

  const completedCount = missions.filter(m => m.completed).length
  const totalCount = missions.length

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ flex: 1 }}
      >
        {/* Header Section */}
        <View>
          <Nav />
        </View>

        {/* Progress Summary */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>Mission Progress</Text>
          <Text style={styles.progressDesc}>
            {completedCount} of {totalCount} missions completed
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }]}
            />
          </View>
        </View>

        {/* Add Mission */}
        <View style={styles.addContainer}>
          <AddMission onAddMission={addMission} />
        </View>

        {/* Missions List */}
        <ScrollView style={styles.missionsList}>
          <Text style={styles.missionsTitle}>Your Missions</Text>
          {missions.map((mission) => (
            <TouchableOpacity
              key={mission.id}
              style={[styles.missionItem, { opacity: mission.completed ? 0.6 : 1 }]}
              onPress={() => toggleMission(mission.id)}
            >
              <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(mission.priority) }]} />
              <View style={styles.missionContent}>
                <Text style={[styles.missionText, mission.completed && styles.completedText]}>
                  {mission.title}
                </Text>
                <Text style={styles.priorityText}>{mission.priority} priority</Text>
              </View>
              <View style={[styles.checkbox, mission.completed && styles.checkedCheckbox]}>
                {mission.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          ))}
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
  progressContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  progressTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressDesc: {
    color: '#9ca3af',
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#374151',
    borderRadius: 4,
    height: 8,
    marginTop: 8,
  },
  progressFill: {
    backgroundColor: '#2563eb',
    height: 8,
    borderRadius: 4,
  },
  addContainer: {
    paddingHorizontal: 24,
  },
  missionsList: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  missionsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  missionItem: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  missionContent: {
    flex: 1,
  },
  missionText: {
    color: 'white',
    fontWeight: '500',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  priorityText: {
    color: '#9ca3af',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#2563eb',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
  },
});
