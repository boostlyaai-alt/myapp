import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Nav from '../(screens-components)/nav'

export default function Focus() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {
    let interval: number | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      setIsBreak(!isBreak)
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60) // Switch between work and break
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, isBreak])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(25 * 60)
    setIsBreak(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ flex: 1 }}
      >
        {/* Header Section */}
        <View>
          <Nav />
        </View>

        {/* Focus Timer Section */}
        <View style={styles.timerContainer}>
          <Text style={styles.title}>
            {isBreak ? 'Break Time' : 'Focus Time'}
          </Text>

          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>
              {formatTime(timeLeft)}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isActive ? '#dc2626' : '#2563eb' }]}
              onPress={() => setIsActive(!isActive)}
            >
              <Text style={styles.buttonText}>
                {isActive ? 'Pause' : 'Start'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={resetTimer}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.hint}>
            {isBreak
              ? 'Take a short break to recharge'
              : 'Stay focused on your mission'
            }
          </Text>
        </View>
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
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  timerCircle: {
    backgroundColor: '#1e293b',
    borderRadius: 128,
    width: 256,
    height: 256,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  timerText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  resetButton: {
    backgroundColor: '#4b5563',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  hint: {
    color: '#9ca3af',
    marginTop: 32,
    textAlign: 'center',
  },
});
