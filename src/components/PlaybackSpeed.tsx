import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import {PLAYBACK_SPEEDS} from '../constants/video';

interface PlaybackSpeedProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export const PlaybackSpeed: React.FC<PlaybackSpeedProps> = ({
  speed,
  onSpeedChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSpeedSelect = (newSpeed: number) => {
    onSpeedChange(newSpeed);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>{speed}x</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Playback Speed</Text>
            {PLAYBACK_SPEEDS.map(s => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.speedOption,
                  s === speed && styles.speedOptionSelected,
                ]}
                onPress={() => handleSpeedSelect(s)}>
                <Text
                  style={[
                    styles.speedOptionText,
                    s === speed && styles.speedOptionTextSelected,
                  ]}>
                  {s}x
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 20,
    minWidth: 200,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  speedOption: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 4,
  },
  speedOptionSelected: {
    backgroundColor: '#8B5CF6',
  },
  speedOptionText: {
    color: '#9CA3AF',
    fontSize: 16,
    textAlign: 'center',
  },
  speedOptionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
