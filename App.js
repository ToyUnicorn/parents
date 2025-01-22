import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import * as Notifications from 'expo-notifications';
import LottieView from 'lottie-react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements'; // Импортируем компонент Icon из React Native Elements

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState(new Date());
  const [editingEvent, setEditingEvent] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeTab, setActiveTab] = useState('calendar'); // Стейт для активной вкладки

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    if (events[day.dateString] && events[day.dateString].length > 0) {
      setEditingEvent(null);
    } else {
      setModalVisible(true);
    }
  };

  const handleAddEvent = async () => {
    // Если дата не выбрана, создаем событие на текущий день
    const dateToUse = selectedDate || new Date().toISOString().split('T')[0];
    if (eventTitle && dateToUse) {
      const newEvent = { title: eventTitle, time: eventTime.toLocaleTimeString() };
      const newEvents = { ...events };
      
      if (newEvents[dateToUse]) {
        newEvents[dateToUse].push(newEvent);
      } else {
        newEvents[dateToUse] = [newEvent];
      }
      
      setEvents(newEvents);
      setModalVisible(false);
      setEventTitle('');
      setEventTime(new Date());
      const notificationTime = new Date(`${dateToUse}T${eventTime.toLocaleTimeString()}`);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Напоминание о событии',
          body: `У вас событие: ${eventTitle}`,
        },
        trigger: { date: notificationTime },
      });
    }
  };

  const handleDeleteEvent = (eventIndex) => {
    if (selectedDate) {
      const newEvents = { ...events };
      newEvents[selectedDate].splice(eventIndex, 1);
      if (newEvents[selectedDate].length === 0) {
        delete newEvents[selectedDate];
      }
      setEvents(newEvents);
    }
  };

  const handleEditEvent = (eventIndex) => {
    const eventToEdit = events[selectedDate][eventIndex];
    setEventTitle(eventToEdit.title);
    setEventTime(new Date(`${selectedDate}T${eventToEdit.time}`));
    setEditingEvent(eventIndex);
    setModalVisible(true);
  };

  const showTimePickerHandler = () => {
    setShowTimePicker(true);
  };

  const onTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setEventTime(selectedDate);
    }
  };

  // Компоненты для вкладок
  const renderCalendarTab = () => {
    return (
      <View style={styles.container}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={Object.keys(events).reduce((acc, date) => {
            acc[date] = { selected: true, marked: true, selectedColor: 'blue' };
            return acc;
          }, {})}
          style={styles.calendar}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={40} color="white" /> {/* Иконка "+" для создания события */}
        </TouchableOpacity>

        {selectedDate && events[selectedDate] && events[selectedDate].length > 0 && (
          <ScrollView style={styles.eventList}>
            <Text style={styles.eventTitle}>События на {selectedDate}:</Text>
            {events[selectedDate].map((event, index) => (
              <View key={index} style={styles.eventItem}>
                <Text>{event.title} в {event.time}</Text>
                <View style={styles.iconButtons}>
                  <Ionicons
                    name="pencil"
                    size={24}
                    color="blue"
                    onPress={() => handleEditEvent(index)}  // Карандаш вместо редактирования
                  />
                  <MaterialIcons
                    name="delete"
                    size={24}
                    color="red"
                    onPress={() => handleDeleteEvent(index)} // Кнопка удаления
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <LottieView
                source={require('./assets/animation.json')}  // Убедитесь, что путь к анимации правильный
                autoPlay
                loop
                style={styles.lottie}
              />
              <TextInput
                placeholder="Введите название события"
                value={eventTitle}
                onChangeText={setEventTitle}
                style={styles.input}
              />
              <TouchableOpacity onPress={showTimePickerHandler}>
                <Text style={styles.timeText}>Выберите время: {eventTime.toLocaleTimeString()}</Text>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  value={eventTime}
                  mode="time"
                  is24Hour={true}
                  onChange={onTimeChange}
                />
              )}

              <Button title={editingEvent !== null ? "Сохранить событие" : "Добавить событие"} onPress={handleAddEvent} />
              <Button title="Отмена" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const renderProfileTab = () => {
    return (
      <View style={styles.container}>
        <Text>Имя пользователя: John Doe</Text>
        <Text>Фото пользователя:</Text>
        {/* В будущем сюда можно будет добавить фото пользователя */}
      </View>
    );
  };

  const renderFaqTab = () => {
    return (
      <View style={styles.container}>
        <Text>FAQ - Полезные советы</Text>
        {/* Заглушка, в будущем можно добавить информацию */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {activeTab === 'calendar' && renderCalendarTab()}
      {activeTab === 'profile' && renderProfileTab()}
      {activeTab === 'faq' && renderFaqTab()}

      {/* Нижняя панель с навигацией */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('calendar')}>
          <Icon name="calendar" type="font-awesome" size={30} color={activeTab === 'calendar' ? 'blue' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('profile')}>
          <Icon name="user" type="font-awesome" size={30} color={activeTab === 'profile' ? 'blue' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('faq')}>
          <Icon name="question-circle" type="font-awesome" size={30} color={activeTab === 'faq' ? 'blue' : 'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0, // Убираем лишние отступы со всего контейнера
    backgroundColor: 'white',
  },
  calendar: {
    marginTop: 20,
  },
  eventList: {
    marginTop: 20,
  },
  eventTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 100,
  },
  addButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#007BFF', // Синий фон для кнопки
    padding: 15,
    borderRadius: 50, // Круглая кнопка
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    width: '100%',
  },
  timeText: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginBottom: 0, // Убираем лишний отступ снизу
  },
  navItem: {
    alignItems: 'center',
    padding: 10, // Добавляем небольшой отступ для кнопок
  },
});
