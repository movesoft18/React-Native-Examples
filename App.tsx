/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect } from 'react';
import {View, Text, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function MainScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Главная страница</Text>
      <View style={{margin:20, }}>
        <Button
        title="Перейти к подробностям"
        onPress={() => navigation.navigate('Подробные сведения')}
        />
      </View>
      <View style={{margin:20, }}>
        <Button
          title="О навигации"
          onPress={() => navigation.navigate('About', {info1:"мы учимся переходить между экранами", num: 2})}
        />
      </View>
    </View>
  );
}

function AboutScreen({navigation, route}) {
  const {info1, num} = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Информация о навигации StacknaNigation</Text>
      <Text>{info1}</Text>
      <Text>Экран номер {num}</Text>
      <Button
        title="Назад"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

function DetailScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Подробности...</Text>
      <View style={{margin:20, }}>
        <Button
          title="Перейти к подробностям снова"
          onPress={() => navigation.push('Подробные сведения')}
        />
      </View>
      <View style={{margin:20, }}>
        <Button
          title="На главный по имени маршрута"
          onPress={() => navigation.push('Главная')}
        />
      </View>

      <View style={{margin:20, }}>
        <Button
          title="На главный (наверх)"
          onPress={() => navigation.popToTop()}
        />
      </View>

      <View style={{margin:20, }}>
        <Button
          title="Назад"
          onPress={() => navigation.goBack()}
        />
      </View>

    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function Example() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen
        name="Главная"
        component={MainScreen} />

      <Stack.Screen
       options={{ title: 'Обзор подробностей' }}
        name="Подробные сведения"
        component={DetailScreen} />

      <Stack.Screen
       options={{ title: 'Справка о навигации' }}
        name="About"
        component={AboutScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
