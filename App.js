import React, { useState, useEffect } from 'react'; // Импортируем необходимые хуки React
import { View, Text, Button, Modal, TextInput } from 'react-native'; // Импортируем компоненты для UI из React Native
import { Calendar } from 'react-native-calendars'; // Импортируем компонент календаря
import * as Notifications from 'expo-notifications'; // Импортируем библиотеку для работы с уведомлениями

export default function App() {
  // Стейт для хранения выбранной даты
  const [selectedDate, setSelectedDate] = useState(null);
  // Стейт для хранения событий, где ключом будет дата, а значением - название события
  const [events, setEvents] = useState({});
  // Стейт для контроля видимости модального окна добавления события
  const [modalVisible, setModalVisible] = useState(false);
  // Стейт для хранения названия события, которое пользователь вводит
  const [eventTitle, setEventTitle] = useState('');

  // Хук для обработки нажатия на день в календаре
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString); // Устанавливаем выбранную дату в стейт
    if (events[day.dateString]) {
      // Если на выбранную дату уже есть событие, показываем его
      alert(`Event on this day: ${events[day.dateString]}`);
    } else {
      // Если события на выбранный день нет, показываем модальное окно для ввода события
      setModalVisible(true);
    }
  };

  // Хук для добавления события
  const handleAddEvent = async () => {
    if (eventTitle && selectedDate) {
      // Если название события и дата выбраны
      const newEvents = { ...events, [selectedDate]: eventTitle }; // Добавляем новое событие в стейт
      setEvents(newEvents); // Обновляем стейт событий
      setModalVisible(false); // Закрываем модальное окно
      setEventTitle(''); // Очищаем поле ввода

      // Планируем уведомление на 9 утра в день события
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Event Reminder', // Заголовок уведомления
          body: `You have an event: ${eventTitle}`, // Текст уведомления
        },
        trigger: { date: new Date(new Date(selectedDate).setHours(9, 0, 0, 0)) }, // Время триггера - 9:00 AM выбранной даты
      });
    }
  };

  // Хук для удаления события
  const handleDeleteEvent = () => {
    if (selectedDate) {
      // Если дата выбрана, удаляем событие для этой даты
      const newEvents = { ...events };
      delete newEvents[selectedDate]; // Удаляем событие из объекта событий
      setEvents(newEvents); // Обновляем стейт событий
    }
  };

  // Рендерим UI компоненты
  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Календарь, который позволяет выбрать дату */}
      <Calendar
        onDayPress={handleDayPress} // Обработчик события нажатия на день
        markedDates={Object.keys(events).reduce((acc, date) => {
          // Отображаем события, помечая выбранные даты
          acc[date] = { selected: true, marked: true, selectedColor: 'blue' };
          return acc;
        }, {})}
      />

      {/* Модальное окно для добавления события */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            {/* Поле ввода для названия события */}
            <TextInput
              placeholder="Enter event title"
              value={eventTitle}
              onChangeText={setEventTitle} // Обработчик изменения текста
              style={{ borderBottomWidth: 1, marginBottom: 10, width: 200 }}
            />
            {/* Кнопка для добавления события */}
            <Button title="Add Event" onPress={handleAddEvent} />
            {/* Кнопка для закрытия модального окна */}
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Отображаем выбранную дату и возможность удалить событие для этой даты */}
      {selectedDate && (
        <View style={{ marginTop: 20 }}>
          <Text>Selected Date: {selectedDate}</Text>
          {/* Кнопка для удаления события */}
          <Button title="Delete Event" onPress={handleDeleteEvent} />
        </View>
      )}
    </View>
  );
}
