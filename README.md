# Полезные команды

- npm run android
- npm run ios # you need to use macOS to build the iOS project - use the Expo app if you need to do iOS development without a Mac
- npm run web

# Концепция

"Родительский помощник" — это мобильное приложение, созданное для помощи родителям в организации времени, улучшении взаимодействия с детьми, доступе к полезной информации и услугам телемедицины. Оно объединяет в себе функции календаря, системы напоминаний, образовательных материалов и платформы для общения с детскими психологами и педиатрами.

Цели:
Помочь родителям эффективно планировать задачи и события, связанные с детьми.
Обеспечить доступ к экспертным рекомендациям и образовательным материалам для воспитания и обучения.
Предоставить удобный способ взаимодействия с детскими специалистами через телемедицину.
Упростить выполнение повседневных задач с помощью уведомлений и системы напоминаний.
Ключевые функции:
Календарь с напоминаниями:

Интерактивный календарь с возможностью добавления событий.
Уведомления за несколько часов до важного события.
Цветовая кодировка для разных типов задач (учеба, здоровье, отдых и т.д.).
Образовательные материалы:

Раздел с полезными советами и статьями по воспитанию детей.
Курсы для родителей (например, по детской психологии, обучению навыкам общения, здоровому питанию).
Ежедневные или еженедельные рекомендации.
Телемедицина:

Видеозвонки и чаты с детскими психологами и педиатрами.
Запись на консультации.
Хранение истории общения и рекомендаций специалистов.
Родительская библиотека:

Список проверенных книг, статей и видео для родителей.
Сохранение избранных материалов.
Система напоминаний:

Напоминания о предстоящих событиях, прививках, медицинских осмотрах.
Персонализированные уведомления, связанные с развитием ребенка.
Сообщество для родителей (в будущем):

Возможность обмениваться опытом, участвовать в обсуждениях.
Форумы и группы по интересам.
Платформы:
iOS и Android.
Возможность использования на iPad для удобства чтения образовательных материалов.
Технологический стек:
Frontend: React Native.
Уведомления: Notifee для локальных уведомлений.
Локальное хранилище: JSON (для MVP).
Бэкенд (в разработке): Python (Django/Flask) для управления данными, телемедициной и рекомендациями.
Целевая аудитория:
Родители детей возрастом от 0 до 12 лет.
Родители, которые хотят больше вовлеченности в воспитание и развитие детей.
Люди, ищущие профессиональную помощь через телемедицину.
Потенциальные направления развития:
Интеграция с умными устройствами (например, термометры, камеры).
Расширение на платформы для веба.
Разработка премиум-функций (расширенные консультации, эксклюзивные материалы).
Анализ данных и рекомендаций на основе поведения и привычек пользователя.


# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
