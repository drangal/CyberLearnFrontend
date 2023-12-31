```
D:.
│   App.css # Главный файл стиля
│   App.jsx # Основное приложение
│   index.css
│   main.jsx # Инициализатор приложения
│
├───admin
│   │   MyAdmin.css # Стили для страницы администратора
│   │   MyAdmin.jsx # Страница администратора
│   │
│   ├───AdminFooter # Футер для страницы администратора
│   │       AdminFooter.jsx # Файл футера для страницы администратора
│   │
│   ├───AdminHeader # Хедер для страницы администратора
│   │       AdminHeader.jsx # Файл хедера для страницы администратора
│   │
│   ├───AdminLogIn # Логин для страницы администратора
│   │       AdminLogIn.jsx # Файл логина для страницы администратора
│   │
│   ├───AdminPageContent # Футер для страницы администратора
│   │   │   AdminPageContent.jsx # Файл футера для страницы администратора
│   │   │
│   │   └───contentComponents # Директория компонентов для страницы администратора
│   │           AiTasksPage.jsx # Файл создания из лекции вопросов для страницы администратора
│   │           Chart.jsx # Файл графиков для страницы администратора
│   │           Dangers.jsx # Файл предупреждений для страницы администратора
│   │           Dashboard.jsx # Файл главной страницы для страницы администратора
│   │           Lection.jsx # Файл для создания лекций вручную для страницы администратора
│   │           Questions.jsx # Файл для создания вопросов для страницы администратора
│   │           Users.jsx # Файл для отображения пользователей для страницы администратора
│   │
│   └───AdminSideMenu # Директория для бокового меню для страницы администратора
│           AdminSideMenu.jsx # Файл для бокового меню для страницы администратора
│
├───assets
│       background.jpg
│       react.svg
│
├───common
│       Loader.jsx # Файл для компонента процесса загрузки
│
├───components
│       Api.jsx # Файл для установки адресов серверов бека
│       colors.jsx # Файл для установки цветов
│       LastAlert.jsx # Компонент для последней угрозы
│       TokenController.jsx # Компонент для удобного доставания токена из сессии
│
└───pages
    ├───corporation
    │       CorporationPage.jsx # Файл для компонента страницы корпорации (в разработке)
    │
    ├───images
    │       alert_denied.png # Файл для 404
    │
    ├───login
    │       LoginPage.jsx # Файл с страницей для логина пользователя
    │
    ├───main_page
    │   │   MainPage.jsx # Файл с компонентом лендинга
    │   │
    │   ├───components # Компоненты главной страницы
    │   │       advise_user.jsx
    │   │       banner_info.jsx
    │   │       bubble.jsx
    │   │       content.jsx
    │   │       header.jsx
    │   │
    │   └───css # Стили главной страницы
    │       │   colors.css
    │       │   MainPage.css
    │       │
    │       └───fonts # Шрифты
    │               Comfortaa.ttf
    │               Inter.ttf
    │               RussoOne.ttf
    │
    ├───materials # Директория с файлами для страницы с обучающими материалами
    │       fishtext.jsx
    │       materials.jsx
    │
    ├───payment # Директория с файлами для страницы с оплатой
    │       payment.jsx
    │
    ├───profile # Директория с файлами для страницы пользователя
    │       ProfilePage.jsx
    │
    ├───register # Директория с файлами для страницы регистрации
    │       RegisterPage.jsx
    │
    ├───system # Директория с файлами для страницы 404
    │       NotFoundPage.jsx
    │
    └───tests # Директория с файлами для страницы с тестами
            TestPage.jsx
```
