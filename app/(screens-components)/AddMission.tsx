import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
        <View style={styles.addMissionsContainer}>
            <Text style={styles.addMissionsTitle}>Add Your Mission</Text>
             <View style={styles.inputContainer}>
                <TextInput 
                style={styles.textInput}
                placeholder='Enter your mission'
                placeholderTextColor='white'
                value={missionText}
                onChangeText={setMissionText}
                multiline
                />
             </View>
             <TouchableOpacity 
                style={styles.addButton}
                onPress={handleAddMission}
             >
                <Text style={styles.buttonText}>Add Mission</Text>
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
        style={styles.addMissionButton}
        onPress={() => setIsOpen(true)}
    >
      <View style={styles.addMissionButtonContent}>
         <Text style={styles.addMissionButtonText}>Add Mission</Text>
      </View>
    </TouchableOpacity>

    <Modal
        visible={isOpen}
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
    >
        <View style={styles.modalContainer}>
            <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setIsOpen(false)}
            >
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <AddMissions onAddMission={handleAddMission} />
        </View>
    </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  addMissionsContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#020617',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  addMissionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  inputContainer: {
    width: '70%',
    height: '50%',
    backgroundColor: '#172554',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  textInput: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
    padding: 16,
    color: 'white',
  },
  addButton: {
    marginTop: 16,
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addMissionButton: {
    width: '85%',
    height: 80,
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  addMissionButtonContent: {
    alignItems: 'center',
    margin: 40,
  },
  addMissionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  modalContainer: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 40,
    zIndex: 10,
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});