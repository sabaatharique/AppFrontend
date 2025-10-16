import { useRouter, Link } from 'expo-router';
import { StyledScrollView as ScrollView } from '../../components/StyledScrollView';
import { StyledTitle as Title } from '../../components/StyledTitle';
import { StyledSearchBar as TextInput } from '../../components/StyledSearchBar';
import RideCard from '../../components/ActiveRideCard';
import rides from '../../data/rideData.json';

const AvailableRides = () => {
  const router = useRouter();

  return (
    <ScrollView>
      <Title>Search for a Ride</Title>

      {/* search field */}
      <TextInput
        placeholder="Where to today?"
        onFocus={() => {
          router.push('/searchRides');
        }}
      />

      <Title>Latest Rides</Title>

      {rides.map((ride, index) => (
          <RideCard 
            key={index}
            ride={ride}
            onPress={() => router.push(`/ride/${ride.id}`)}
            showRequestButton={true}
            onPressRequest={() => router.push('/joinRequest')}
          />
      ))}
    </ScrollView>
  );
};

export default AvailableRides;
