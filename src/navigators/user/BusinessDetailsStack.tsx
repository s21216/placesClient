import BusinessLocationScreen from '../../screens/shared/BusinessLocationScreen';
import BusinessDetails from '../../screens/user/searchTab/BusinessDetails';
import PostReview from '../../screens/user/searchTab/PostReview';
import ReviewList from '../../screens/user/searchTab/ReviewList';

const BusinessDetailsStack = (Stack: any) => {
  return [
    <Stack.Screen
      key="Details"
      name="Details"
      component={BusinessDetails}
      options={{
        headerShown: true,
        headerTitle: '',
        headerStyle: { backgroundColor: 'white' },
      }}
    />,
    <Stack.Screen
      key="PostReview"
      name="PostReview"
      component={PostReview}
      options={{
        headerShown: true,
        headerTitle: 'Write review',
        headerBackTitleStyle: { color: 'black' },
      }}
    />,
    <Stack.Screen
      key="ReviewList"
      name="ReviewList"
      component={ReviewList}
      options={{
        headerShown: true,
        headerTitle: 'Reviews',
        headerBackTitleStyle: { color: 'black' },
      }}
    />,
    <Stack.Screen
      key="BusinessLocation"
      name="BusinessLocation"
      component={BusinessLocationScreen}
      options={{
        headerShown: true,
        headerTitle: 'Location',
      }}
    />,
  ];
};

export default BusinessDetailsStack;
