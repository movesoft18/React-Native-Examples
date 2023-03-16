/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Button, TextInput, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


function MainScreen({navigation, route}) {
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
      <View style={{margin:20, }}>
        <Button
          title="К сообщениям"
          onPress={() => navigation.navigate('Message')}
        />
      </View>

      <View style={{margin:20, }}>
        <Button
          title="К сообщениям по умолчанию"
          onPress={() => navigation.navigate('MessageDefs')}
        />
      </View>

      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
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

function MessageScreen({navigation, route}) {
  const [postText, setPostText] = React.useState('');
  return (
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <TextInput
        multiline
        placeholder="Введите сообщение здесь"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Завершить"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Главная',
            params: { post: postText },

          });
        }}
      />
    </View>
  );
}

function MessageScreenWithDefaults({navigation, route}) {
  const [postText, setPostText] = React.useState(route.params.message);
  return (
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <TextInput
        multiline
        placeholder="Введите сообщение здесь"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Завершить"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Главная',
            params: { post: postText },

          });
        }}
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

const Tab = createBottomTabNavigator();

export default function Example() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({

          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >

        <Tab.Screen
          name="Главная"
          component = {MainScreen}
          options={{
            tabBarLabel: 'Дом',
            //tabBarBadge: 3,
            tabBarIcon: ({ focused, color, size }) => {

              return(
                <Ionicons name={"add"} size={20} color={color}/>
              );},
           }}
        />


        <Tab.Screen
          options={{ title: 'Подр.' }}
          name="Подробные сведения"
          component={DetailScreen} />

        <Tab.Screen
          options={{ title: 'Справ.' }}
          name="About"
          component={AboutScreen} />

        <Tab.Screen
          options={{ title: 'Ввод' }}
          name="Message"
          component={MessageScreen} />

        <Tab.Screen
          options={{ title: 'Вывод' }}
          name="MessageDefs"
          initialParams={{ message: 'default text' }}
          component={MessageScreenWithDefaults} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}