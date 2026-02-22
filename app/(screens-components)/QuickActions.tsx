import React, { useState } from 'react';
import { Alert, Modal, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const QuickActions = () => {
  const [missionModalVisible, setMissionModalVisible] = useState(false);
  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [blockedModalVisible, setBlockedModalVisible] = useState(false);
  const [missionText, setMissionText] = useState('');
  const [courseText, setCourseText] = useState('');
  const [blockedText, setBlockedText] = useState('');

  const handleAddMission = () => {
    if (missionText.trim()) {
      Alert.alert('Success', 'Mission added successfully!');
      setMissionText('');
      setMissionModalVisible(false);
    } else {
      Alert.alert('Error', 'Please enter a mission');
    }
  };

  const handleAddCourse = () => {
    if (courseText.trim()) {
      Alert.alert('Success', 'Course added successfully!');
      setCourseText('');
      setCourseModalVisible(false);
    } else {
      Alert.alert('Error', 'Please enter a course');
    }
  };

  const handleBlockedApps = () => {
    if (blockedText.trim()) {
      Alert.alert('Success', 'App blocked successfully!');
      setBlockedText('');
      setBlockedModalVisible(false);
    } else {
      Alert.alert('Error', 'Please enter an app to block');
    }
  };

  const actions = [
    {
      id: 'add-mission',
      title: 'Add Mission',
      icon: 'add-circle-outline',
      onPress: () => setMissionModalVisible(true),
    },
    {
      id: 'add-course',
      title: 'Add Course',
      icon: 'school-outline',
      onPress: () => setCourseModalVisible(true),
    },
    {
      id: 'blocked-apps',
      title: 'Blocked Apps',
      icon: 'ban-outline',
      onPress: () => setBlockedModalVisible(true),
    },
    {
      id: 'placeholder',
      title: 'Coming Soon',
      icon: 'time-outline',
      onPress: () => Alert.alert('Coming Soon', 'This feature is under development'),
    },
  ];

  return (
    <View className="px-6 py-4">
      <Text className="text-white text-xl font-bold mb-4">Quick Actions</Text>
      <View className="flex-row flex-wrap justify-between">
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            onPress={action.onPress}
            className="bg-slate-800 rounded-lg p-4 w-[48%] mb-4 items-center justify-center"
          >
            <Ionicons name={action.icon as any} size={32} color="white" />
            <Text className="text-white text-sm mt-2 text-center">{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add Mission Modal */}
      <Modal
        visible={missionModalVisible}
        animationType="slide"
        onRequestClose={() => setMissionModalVisible(false)}
      >
        <View className="flex-1 bg-slate-900 justify-center items-center p-6">
          <TouchableOpacity
            onPress={() => setMissionModalVisible(false)}
            className="absolute top-10 right-10 bg-red-500 px-4 py-2 rounded"
          >
            <Text className="text-white font-bold">Close</Text>
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold mb-4">Add Your Mission</Text>
          <TextInput
            className="w-full bg-slate-800 text-white p-4 rounded mb-4"
            placeholder="Enter your mission"
            placeholderTextColor="gray"
            value={missionText}
            onChangeText={setMissionText}
            multiline
          />
          <TouchableOpacity
            onPress={handleAddMission}
            className="bg-blue-500 px-6 py-3 rounded"
          >
            <Text className="text-white font-bold">Add Mission</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Add Course Modal */}
      <Modal
        visible={courseModalVisible}
        animationType="slide"
        onRequestClose={() => setCourseModalVisible(false)}
      >
        <View className="flex-1 bg-slate-900 justify-center items-center p-6">
          <TouchableOpacity
            onPress={() => setCourseModalVisible(false)}
            className="absolute top-10 right-10 bg-red-500 px-4 py-2 rounded"
          >
            <Text className="text-white font-bold">Close</Text>
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold mb-4">Add Your Course</Text>
          <TextInput
            className="w-full bg-slate-800 text-white p-4 rounded mb-4"
            placeholder="Enter your course"
            placeholderTextColor="gray"
            value={courseText}
            onChangeText={setCourseText}
            multiline
          />
          <TouchableOpacity
            onPress={handleAddCourse}
            className="bg-blue-500 px-6 py-3 rounded"
          >
            <Text className="text-white font-bold">Add Course</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Blocked Apps Modal */}
      <Modal
        visible={blockedModalVisible}
        animationType="slide"
        onRequestClose={() => setBlockedModalVisible(false)}
      >
        <View className="flex-1 bg-slate-900 justify-center items-center p-6">
          <TouchableOpacity
            onPress={() => setBlockedModalVisible(false)}
            className="absolute top-10 right-10 bg-red-500 px-4 py-2 rounded"
          >
            <Text className="text-white font-bold">Close</Text>
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold mb-4">Block an App</Text>
          <TextInput
            className="w-full bg-slate-800 text-white p-4 rounded mb-4"
            placeholder="Enter app name to block"
            placeholderTextColor="gray"
            value={blockedText}
            onChangeText={setBlockedText}
          />
          <TouchableOpacity
            onPress={handleBlockedApps}
            className="bg-blue-500 px-6 py-3 rounded"
          >
            <Text className="text-white font-bold">Block App</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default QuickActions;