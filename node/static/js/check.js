const serverURL = '/api';

let cookies = {};

const cookiesArray = document.cookie.split(';');

cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.trim().split('=');
    cookies[key] = value;
});

let role = cookies["role"];
let tokenStr = cookies["token"];
let userId = cookies["userId"];
let H = { headers: {"Authorization" : `Bearer ${tokenStr}`} }

const matches = {
    keys: [null,"NEW", "AT WORK", "CANCELLED", "COMPLETED", "PSYCHO", "HUMANITARIAN", "ADDRESS", "OTHER","STATUSSTATISTICS","ASSISTANCESTATISTICS","COMPLEXSTATISTICS","MODERATION","PUBLISHED","REJECTED"],
    values: ["Не установлен","Новая", "В работе", "Отменена", "Выполнена", "Психологическая", "Гуманитарная", "Адресная", "Иная","По статусу","По типу помощи", "По статусу и типу помощи","Модерация", "Опубликован","Отклонен"],
}