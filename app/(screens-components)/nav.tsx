import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Nav() {
  return (
    <View style={styles.container}>
        <View style={styles.innerContainer}>
         <View style={styles.content}>
          <Text style={styles.text}>Hello user</Text>
          <Text style={styles.text}>Date : </Text>
          <Text style={styles.text}>Strike : </Text>
          <TouchableOpacity
          style={styles.button}
          >
            <Text style={styles.text}>Settings</Text>
          </TouchableOpacity>
         </View>
        </View>
       </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 125,
    backgroundColor: '#64748b',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});