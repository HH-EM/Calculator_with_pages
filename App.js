import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, TextInput } from 'react-native-gesture-handler';

function CalculatorScreen({ navigation }) {
  const [result, setResult] = useState('');
  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [data, setData] = useState([]);

  const initialFocus = useRef(null);

  const calculate = operator => {
    const [number1, number2] = [Number(operand1), Number(operand2)];
    
    if (isNaN(number1) || isNaN(number2)) {
      setResult(0);
    } else {
      let result = 0;
      switch (operator) {
        case '+':
          result = number1 + number2;
          break;
        case '-':
          result = number1 - number2;
          break;
      }
      setResult(result);

      const text = `${number1} ${operator} ${number2} = ${result}`;
      setData([...data, { key: String(data.length), text: text }]);
    }
    setOperand1('');
    setOperand2('');
    initialFocus.current.focus();
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput 
        style={styles.input}
        onChangeText={text => setOperand1(text)}
        value={operand1}
        keyboardType='numeric'
        ref={initialFocus}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setOperand2(text)} 
        value={operand2}
        keyboardType='numeric'
      />
      <View style={styles.button}>
        <Button onPress={() => calculate('+')} title='+' />
        <Button onPress={() => calculate('-')} title='-' />
        <Button onPress={() => navigation.navigate('History', {history: data})} title='History' />
      </View>
    </View>
  );
}

function HistoryScreen({ route, navigation }) {
  const { history } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => <Text style={{ alignSelf: 'center' }}>History</Text>}
        data={history}
        renderItem={({ item }) =>
          <Text>{item.text}</Text>}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calculator">
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1, 
    padding: 5,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    width: 200,
  }
});
