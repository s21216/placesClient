import React, { useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, Text, TextLayoutEventData, View } from 'react-native';

const ExpandableText = ({ text }: { text?: string }) => {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    setLengthMore(e.nativeEvent.lines.length >= 5);
  };

  return (
    <View style={styles.container}>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : 5}
        style={styles.text}>
        {text}
      </Text>
      {lengthMore ? (
        <Text onPress={toggleNumberOfLines} style={styles.readMore}>
          {textShown ? 'Read less...' : 'Read more...'}
        </Text>
      ) : null}
    </View>
  );
};

export default ExpandableText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  text: {
    lineHeight: 21,
  },
  readMore: {
    lineHeight: 21,
    color: '#4285F4',
  },
});
