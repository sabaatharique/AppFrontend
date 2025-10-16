import React, { createContext, useContext, useState } from 'react';
import user from '../data/userData.json';

const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const [rideData, setRideData] = useState({
    creator: {name: user[0].name, handle: user[0].handle},
    start: { name: '', coords: null },
    destination: { name: '', coords: null },
    transport: '',
    date: {day: '', time: ''},
    totalPassengers: 0,
    fare: '',
    partners: [],
    gender: '',
    preferences: '',
  });

  return (
    <RideContext.Provider value={{ rideData, setRideData }}>
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => useContext(RideContext);
