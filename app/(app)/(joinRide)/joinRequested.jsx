import { View } from 'react-native';
import { StyledText as Text } from '../../../components/StyledText';
import { StyledTitle as Title } from '../../../components/StyledTitle';
import { StyledButton } from '../../../components/StyledButton';
import { useRouter } from 'expo-router';

const JoinRequested = () => {
    const router = useRouter();

    return (
        <View>
            <Title>Request Sent!</Title>
            <Text>Your request to join the ride has been sent to the driver.</Text>
            <StyledButton onPress={() => router.push('/(dashboard)/dash')}>Done</StyledButton>
        </View>
    );
};

export default JoinRequested;