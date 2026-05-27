import { Colors } from '@/constants/theme';
import React, { ReactNode } from 'react';
import { Modal, TouchableOpacity, useColorScheme, View } from 'react-native';
import { IconSymbol } from './icon-symbol';

const AppModalPopup = ({ children, show, setShow }: {
  children: ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'light'];
  return (
    <Modal
      animationType="slide"
      visible={show}
      transparent={true}
      onRequestClose={() => {
        setShow(false);
      }}
    >
      <View className="flex-1 justify-center items-center" style={{
        backgroundColor: colors.overlay
      }}>
        <View className='items-center bg-white rounded-3xl w-10/12 py-4'>
          <View className="flex-row justify-end w-full px-4">
            <TouchableOpacity onPress={() => setShow(false)}>
              <IconSymbol color={colors.overlay} name="xmark.circle.fill" size={20} />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  )
}

export default AppModalPopup