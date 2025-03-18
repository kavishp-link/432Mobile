import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../assets/colors/Colors";
import { PoppinsFonts } from "../../assets/fonts";

interface CustomPopupProps {
  visible: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
  visible,
  title = "Alert",
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            {onCancel && (
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelText}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "75%",
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: PoppinsFonts.SemiBold,
    color: Colors.black,
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    fontFamily: PoppinsFonts.Regular,
    color: Colors.black,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.black,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  confirmButton: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.black,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 14,
    fontFamily: PoppinsFonts.Medium,
    color: Colors.black,
  },
  confirmText: {
    fontSize: 14,
    fontFamily: PoppinsFonts.Medium,
    color: Colors.white,
  },
});

export default CustomPopup;
