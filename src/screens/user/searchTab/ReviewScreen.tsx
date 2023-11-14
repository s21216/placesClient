import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const ReviewScreen = () => {
  const [score, setScore] = useState(5);
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : 0}>
        <View>
          <Picker selectedValue={score} onValueChange={(itemValue) => setScore(itemValue)}>
            {values.map((scoreValue) => (
              <Picker.Item key={scoreValue} label={scoreValue.toString()} value={scoreValue} />
            ))}
          </Picker>
          <TextInput
            style={{
              margin: 20,
              height: 200,
              textAlignVertical: 'top',
            }}
            placeholder="Write your review here"
            multiline
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({});
