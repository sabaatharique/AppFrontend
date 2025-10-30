import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { StyledButton } from '../../../components/StyledButton';
import { StyledScrollView as ScrollView } from '../../../components/StyledScrollView'; 
import { useRouter } from 'expo-router';
import { StyledTitle as Title } from '../../../components/StyledTitle';
import { StyledText as Text } from '../../../components/StyledText';
import rides from '../../../data/rideData.json'


const partnerFeedback = () => {
  const router = useRouter();

  const currentRide = rides[0];
  const [partners, setPartners] = useState(currentRide.partners);

  const handleRating = (partnerId, rating) => {
    setPartners(
      partners.map((p) => (p.id === partnerId ? { ...p, rating } : p))
    );
  };

  const Star = ({ filled, onClick }) => (
    <TouchableOpacity onPress={onClick}>
      <Text style={{ fontSize: 30, color: filled ? "gold" : "gray" }}>★</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <Title>Buddy feedback</Title>
      {partners.map((partner) => (
        <View key={partner.id} style={{ marginTop: 10, marginBottom: 5 }}>
          <View style={styles.creatorRow}>
            <Text style={{ fontSize: 36 }}>👤 </Text>
            <View>
              <Text style={{fontWeight: 'semibold', fontSize: 18}}>{partner.name}</Text>
              <Text style={styles.handle}>{partner.handle}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                filled={i <= partner.rating}
                onClick={() => handleRating(partner.id, i)}
              />
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 5}} onPress={() => router.push("/(dashboard)/dash")}>
        <Text style={{fontSize: 16, fontWeight: 'semibold'}}>Skip</Text>
      </TouchableOpacity>
    
      <StyledButton
        title="Finish"
        onPress={() => router.push("/(dashboard)/dash")}
        style={{ width: '100%' }}
       />
    </ScrollView>
  );
};

export default partnerFeedback;

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto', 
        marginTop: 15,
        width: '100%',
    },
    handle: {
        color: '#888',
        fontSize: 14,
        flex: 1,
      },
      creatorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        width: '70%',
      },
});
