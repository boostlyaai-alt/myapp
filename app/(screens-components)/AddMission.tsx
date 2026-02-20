import { useState } from 'react';
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

type AddMissionProps = {
  onAddMission?: (mission: string) => void;
}

export function AddMissions({ onAddMission }: { onAddMission?: (mission: string) => void }) {
    const [missionText, setMissionText] = useState('');
    const [onEnter, setOnEnter] = useState(false);

    const handleAddMission = () => {
        if (missionText.trim()) {
            onAddMission?.(missionText.trim());
            setMissionText('');
            Alert.alert('Success', 'Mission added successfully!');
        } else {
            Alert.alert('Error', 'Please enter a mission');
        }
    };

    return (
        <View className='w-full h-full bg-slate-950 items-center flex justify-center'>
            <Text className='text-md font-bold text-white mb-4'>Add Your Mission</Text>
             <View className='w-[70%] h-[50%] bg-blue-950 flex items-center justify-center rounded-md'>
                <TextInput 
                className='w-full h-full bg-white/20 rounded-md p-4 text-white'
                placeholder='Enter your mission'
                placeholderTextColor='white'
                value={missionText}
                onChangeText={setMissionText}
                multiline
                />
             </View>
             <TouchableOpacity 
                className='mt-4 bg-blue-600 px-6 py-2 rounded-md'
                onPress={handleAddMission}
             >
                <Text className='text-white font-bold'>Add Mission</Text>
             </TouchableOpacity>
        </View>
    )
}

export default function AddMission({ onAddMission }: AddMissionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [addedMission, setAddedMission] = useState(false);

    const handleAddMission = (mission: string) => {
        onAddMission?.(mission);
        setIsOpen(false);
    };

  return (
    <>
    <TouchableOpacity 
        className='w-[85%] h-20 px-2 py-3 items-center justify-between rounded-md bg-white/60 '
        onPress={() => setIsOpen(true)}
    >
      <View className='items-center m-10'>
         <Text className='text-md font-bold text-slate-900'>Add Mission</Text>
      </View>
    </TouchableOpacity>

    <Modal
        visible={isOpen}
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
    >
        <View className='flex-1'>
            <TouchableOpacity 
                className='absolute top-10 right-10 z-10 bg-red-500 px-4 py-2 rounded-md'
                onPress={() => setIsOpen(false)}
            >
                <Text className='text-white font-bold'>Close</Text>
            </TouchableOpacity>
            <AddMissions onAddMission={handleAddMission} />
        </View>
    </Modal>
    </>
  )
}