/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function getUniqueKeys(data) {
    var keys = new Set();
    data.forEach(function(row) {
        Object.keys(row).forEach(function(key) {
            keys.add(key);
        });
    });
    return Array.from(keys);
}

// Функция для генерации столбцов на основе ключей
function generateColumns(keys) {
    return keys.map(function(key) {
        return {
            field: key,
            title: key.charAt(0).toUpperCase() + key.slice(1), // Преобразование первой буквы в верхний регистр
            sortable: true
        };
    });
}

// Получение div элемента
var div = document.getElementById('systemViewTab');

// Итерация по объекту REPORT_DATA.systemView
Object.keys(REPORT_DATA.systemView).forEach(function(view) {
    var data = REPORT_DATA.systemView[view];

    // Создание элемента <h2>
    var heading = document.createElement('h2');
    heading.className = 'mt-4'; // Добавление класса
    heading.textContent = view; // Установка текста

    // Добавление элемента <h2> в div
    div.appendChild(heading);

    // Получение уникальных ключей
    var uniqueKeys = getUniqueKeys(data);
    console.log(uniqueKeys);

    // Генерация столбцов
    var columns = generateColumns(uniqueKeys);
    console.log(columns);

    // Создание таблицы и добавление её в div
    var table = document.createElement('table');
    table.id = view; // Используем ключ view как идентификатор таблицы
    div.appendChild(table);

    // Инициализация таблицы
    $('#' + view).bootstrapTable({
        pagination: true,
        search: true,
        columns: columns,
        data: data,
        sortName: uniqueKeys[0], // Сортировка по первому столбцу
        sortOrder: 'desc'
    });
});
