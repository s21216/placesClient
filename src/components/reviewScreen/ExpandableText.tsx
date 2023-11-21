import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ReviewResult } from '../../helpers/utils/types';

const ExpandableText = ({ item }: { item?: ReviewResult }) => {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e: any) => {
    setLengthMore(e.nativeEvent.lines.length > 5);
  }, []);

  return (
    <View style={styles.container}>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : 5}
        style={styles.text}>
        {item?.description}
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
