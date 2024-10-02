import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { Picker } from '@react-native-picker/picker'; 

function CustomInputText({ placeholder = '', type = 'text' }) {
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('1');

  const getKeyboardType = () => {
    switch (type) {
      case 'date':
        return 'numeric';
      case 'email':
        return 'email-address';
      case 'phone':
        return 'phone-pad';
      default:
        return 'default'; // for text input or other unspecified types
    }
  };

  return (
    <View style={styles.container}>
      {type === 'phone' && (
        <View style={styles.phoneInputContainer}>
          <CountryPicker
            countryCode={countryCode}
            withFilter
            withFlag
            withCallingCode
            withCallingCodeButton
            onSelect={(country) => {
              setCountryCode(country.cca2);
              setCallingCode(country.callingCode[0]);
            }}
          />
          <Text style={styles.callingCode}>+{callingCode}</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder={placeholder}
            placeholderTextColor="gray"
            keyboardType={getKeyboardType()}
          />
        </View>
      )}
      {type !== 'phone' && (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="gray"
          keyboardType={getKeyboardType()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 14,
  },
  input: {
    height: 40,
    borderColor: 'transparent',
    backgroundColor: '#eaeaea',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 40,
  },
  phoneInput: {
    flex: 1,
    marginLeft: 10,
    height: '100%',
  },
  callingCode: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 10,
  },
});

export default CustomInputText;