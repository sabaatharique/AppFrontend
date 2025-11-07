import { View } from 'react-native';
import { StyledText as Text } from '../../../components/StyledText';
import { StyledTitle as Title } from '../../../components/StyledTitle';
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView'; 
import { StyledNavigatorButton as NavButton } from '../../../components/StyledNavigatorButton'
import RideCard from '../../../components/RideDisplayCard';
import RouteMap from '../../../components/RouteMap';
import rides from '../../../data/rideData.json'
import { useRouter } from 'expo-router';

const JoinRequested = () => {
    const router = useRouter();
    const currentRide = rides[0];

    return (
        <ScrollView>
            <Title>Request sent!</Title>

            <RouteMap ride={currentRide} />

            <RideCard ride={currentRide} />

            <View style={{flexDirection: 'column', alignSelf: 'center', alignItems: 'center', marginVertical: 15}}>
                <Text style={{textAlign: 'center'}}>Your join request has been sent!</Text>
                <Text style={{textAlign: 'center'}}>Check your notifications for confirmation and ride updates.</Text>
            </View>


            <NavButton
                onPress={() => router.back()}
                back={false}
                title="Finish"
                style={{ width: '25%', marginTop: 5, alignSelf: 'flex-end'}}
            />
        </ScrollView>
    );
};

export default JoinRequested;