import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Keyboard, Modal, PanResponder, Animated, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { GiftedChat, Bubble, InputToolbar, Send, Composer } from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import users from '../../../data/userData.json';
import { StyledText as Text } from '../../../components/StyledText';

const SwipeableBubble = ({ children, message, onReply, position }) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (position === 'left' && gestureState.dx > 0) { // received message, swipe right
          translateX.setValue(gestureState.dx);
        } else if (position === 'right' && gestureState.dx < 0) { // sent message, swipe left
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (position === 'left' && gestureState.dx > 80) { // received message
          onReply(message);
          Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
        } else if (position === 'right' && gestureState.dx < -80) { // sent message
          onReply(message);
          Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
        } else {
          Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={{ transform: [{ translateX }] }}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

export default function ChatScreen() {
  const router = useRouter();
  const { handle } = useLocalSearchParams();
  const user = users.find(u => u.handle === handle);
  const flatListRef = useRef(null);

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);


  const [messages, setMessages] = useState([
    {
      _id: 3,
      text: 'Hi there!',
      createdAt: new Date('2025-10-15T10:00:00'),
      user: { _id: 2, name: user.name, avatar: user.profilePicture },
    },
  ]);

  // Keyboard listener
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Send message
  const onSend = useCallback(
    (newMsgs = []) => {
        if (replyingTo) {
          newMsgs[0].replyTo = replyingTo;
          setReplyingTo(null);
        }

      setMessages(previous => GiftedChat.append(previous, newMsgs));

      if (!newMsgs[0].image && !newMsgs[0].document) {
        // Simulated replies
        setTimeout(() => {
          const replyMessage = {
            _id: Date.now() + 1,
            text: "Hello! Ami saba.",
            createdAt: new Date(),
            user: { _id: 2, name: user.name, avatar: user.profilePicture },
          };
          setMessages(prev => GiftedChat.append(prev, [replyMessage]));
        }, 1500);

        setTimeout(() => {
          const replyMessage2 = {
            _id: Date.now() + 2,
            text: 'Hello! Ami mounotaa.',
            createdAt: new Date(),
            user: { _id: 2, name: user.name, avatar: user.profilePicture },
          };
          setMessages(prev => GiftedChat.append(prev, [replyMessage2]));
        }, 3000);
      }
    },
    [replyingTo, user.name, user.profilePicture]
  );


  const requestLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return false;
    }
    return true;
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera is required!');
      return false;
    }
    return true;
  };

  const pickImageFromCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      onSend([{
        _id: Date.now().toString(),
        createdAt: new Date(),
        user: { _id: 1 },
        image: result.assets[0].uri,
      }]);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (!result.canceled) {
        const asset = result.assets[0];
        const newMessage = {
          _id: Date.now().toString(),
          createdAt: new Date(),
          user: {
            _id: 1,
          },
          document: {
            name: asset.name,
            uri: asset.uri,
            size: asset.size,
          },
        };
        onSend([newMessage]);
      }
    } catch (err) {
      // Handle errors
    }
  };


  // Image picker
  const pickImageFromLibrary = async () => {
    const hasPermission = await requestLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // only images
      allowsEditing: false,  
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      onSend([{
        _id: Date.now().toString(),
        createdAt: new Date(),
        user: { _id: 1 },
        image: result.assets[0].uri,
      }]);
    }
  };

  const handleReplyPress = (message) => {
    const index = messages.findIndex(m => m._id === message._id);
    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  };


  // Get initials
  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  // Avatar rendering (no avatar for sender)
  const renderAvatar = (props) => {
    const { user } = props.currentMessage;
    if (user._id === 1) return null; // remove sender avatar
    if (user.avatar) return <Image source={{ uri: user.avatar }} style={styles.avatar} />;
    return (
      <View style={[styles.avatar, styles.initialsAvatar]}>
        <Text style={styles.initialsText}>{getInitials(user.name)}</Text>
      </View>
    );
  };

  // Bubble styling
  const renderBubble = (props) => {
    return (
      <SwipeableBubble
        message={props.currentMessage}
        onReply={setReplyingTo}
        position={props.position}
      >
        {/* Reply preview */}
        {props.currentMessage.replyTo && (
          <TouchableOpacity onPress={() => handleReplyPress(props.currentMessage.replyTo)}>
            <View style={styles.replyBubble}>
              <Text style={styles.replyName}>Reply to:</Text>
              <Text style={styles.replySnippet}>
                {props.currentMessage.replyTo.text || 'Media message'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <Bubble
          {...props}
          wrapperStyle={{
            left: styles.receivedBubble,
            right: styles.sentBubble,
          }}
          textStyle={{
            left: styles.receivedText,
            right: styles.sentText,
          }}
          timeTextStyle={{
            right: {
              color: '#555',
              fontSize: 11,
              textAlign: 'right',
              marginTop: 2,
              marginRight: 4,
            },
            left: {
              color: '#777',
              fontSize: 11,
              textAlign: 'right',
              marginTop: 2,
              marginRight: 4,
            },
          }}
        />
      </SwipeableBubble>
    );
  };

  // Day label
  const renderDay = (props) => {
    const messageDate = new Date(props.currentMessage.createdAt);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    let label = messageDate.toLocaleDateString();
    if (messageDate.toDateString() === today.toDateString()) label = 'Today';
    else if (messageDate.toDateString() === yesterday.toDateString()) label = 'Yesterday';
    return (
      <View style={styles.dateSeparator}>
        <Text style={styles.dateText}>{label}</Text>
      </View>
    );
  };

  // Actions
  const renderActions = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
      <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={pickDocument}>
        <Ionicons name="attach" size={28} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={pickImageFromCamera}>
        <Ionicons name="camera" size={28} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={pickImageFromLibrary}>
        <Ionicons name="image" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  );

  /*openDocument*/


  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.document) {
      return (
        <TouchableOpacity
          style={styles.fileContainer}
          onPress={() => openDocument(currentMessage.document)}
        >
          <Ionicons name="document-text-outline" size={30} color="#000" />
          <Text style={[styles.fileName, { flexShrink: 1, flexWrap: 'wrap' }]}> 
            {currentMessage.document.name}
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  // Input toolbar
  const renderComposer = (props) => {
    return (
      <Composer
        {...props}
        textInputStyle={{
          flex: 1,
          backgroundColor: '#fff',
          borderWidth: 1,       
          borderColor: '#888',  
          borderRadius: 20,     
          paddingHorizontal: 12,
          paddingVertical: 8,
          fontSize: 16,
          color: '#000',
          marginRight: 10,
        }}
        placeholder="Type a message..."
        placeholderTextColor="#888"
      />
    );
  };

  const renderInputToolbar = (props) => (
    <View>
      {replyingTo && (
        <View style={styles.replyContainer}>
          <Text style={styles.replyLabel}>Replying to:</Text>
          <Text numberOfLines={1} style={styles.replyText}>
            {replyingTo.text || 'Media message'}
          </Text>
          <TouchableOpacity onPress={() => setReplyingTo(null)}>
            <Ionicons name="close" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      )}
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#fff',
          paddingVertical: 4,
          paddingHorizontal: 1,
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          marginBottom: keyboardVisible ? 0 : 30,
        }}
        primaryStyle={{ alignItems: 'center' }}
        renderComposer={renderComposer} 
      />
    </View>
  );

  // Send button
  const renderSend = (props) => (
    <Send {...props} containerStyle={{ justifyContent: 'center', marginRight: 5 }}>
      <Ionicons name="send" size={28} color="#000" />
    </Send>
  );

  const openLightbox = (uri) => {
    setLightboxImage(uri);
    setLightboxVisible(true);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxVisible(false);
  };

  // Message image
  const renderMessageImage = (props) => {
    return (
      <TouchableOpacity onPress={() => openLightbox(props.currentMessage.image)}>
        <Image
          source={{ uri: props.currentMessage.image }}
          style={{ width: 200, height: 150, borderRadius: 13, margin: 3 }}
        />
      </TouchableOpacity>
    );
  };



  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* Avatar or initials */}
        {user.profilePicture ? (
          <Image
            source={{ uri: user.profilePicture }}
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
          />
        ) : (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#E5E5E5',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            <Text style={{ color: '#000', fontWeight: 'bold' }}>{getInitials(user.name)}</Text>
          </View>
        )}

        <View style={{ width: '80%' }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.handle}>{user.handle}</Text>
        </View>

        <View style={styles.rightIcons}>
          <FontAwesome name="phone" size={22} color="#000" style={styles.icon} />
          <Ionicons name="ellipsis-vertical" size={22} color="#000" style={styles.icon} />
        </View>
      </View>

      {/* Gifted Chat */}
      <GiftedChat
        messages={messages}
        onSend={msgs => onSend(msgs)}
        user={{ _id: 1 }}
        inverted={true}
        renderBubble={renderBubble}
        renderDay={renderDay}
        renderAvatar={renderAvatar}
        showUserAvatar={false} 
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderActions={renderActions}
        renderMessageImage={renderMessageImage}
        renderCustomView={renderCustomView}
        listViewProps={{
          ref: flatListRef,
        }}
      />

      {lightboxVisible && (
        <Modal visible={lightboxVisible} transparent={true} onRequestClose={closeLightbox}>
          <View style={styles.lightboxContainer}>
            <TouchableOpacity style={styles.lightboxCloseButton} onPress={closeLightbox}>
              <Ionicons name="close" size={32} color="white" />
            </TouchableOpacity>
            <Image source={{ uri: lightboxImage }} style={styles.lightboxImage} resizeMode="contain" />
          </View>
        </Modal>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
    paddingTop: 40,
  },
  handle: {
    color: '#888',
    flex: 1,
  },
  backButton: {
    marginRight: 10,
  },
  icon: {
    marginLeft: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  sentBubble: {
    backgroundColor: '#DCF8C6',
    borderRadius: 16,
    padding: 8,
    marginBottom: 2,
    maxWidth: '80%',
  },
  receivedBubble: {
    backgroundColor: '#E5E5E5',
    borderRadius: 16,
    padding: 8,
    marginBottom: 2,
    maxWidth: '80%',
  },
  sentText: {
    color: '#000',
    fontSize: 16,
  },
  receivedText: {
    color: '#000',
    fontSize: 16,
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  initialsAvatar: {
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 10,
    color: 'gray',
    marginTop: 2,
    marginHorizontal: 6,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3,
  },
  actionButton: {
    marginHorizontal: 2,
  },
  lightboxContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightboxImage: {
    width: '100%',
    height: '100%',
  },
  lightboxCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  replyBubble: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  replyName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  replySnippet: {
    color: '#555',
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
  },
  replyLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  replyText: {
    flex: 1,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  fileName: {
    marginLeft: 10,
  },
});