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

function getUniqueKeys(dataTable) {
    var keys = new Set();
    dataTable.forEach(function(row) {
        Object.keys(row).forEach(function(key) {
            keys.add(key);
        });
    });

    return Array.from(keys);
}

function generateColumns(keys) {
    return keys.map(function(key) {
        return {
            field: key,
            title: key.charAt(0).toUpperCase() + key.slice(1),
            sortable: true
        };
    });
}

var div = document.getElementById('systemViewTab');

Object.keys(REPORT_DATA.systemView).forEach(function(nodeId) {
    var nodeData = REPORT_DATA.systemView[nodeId];

    Object.keys(nodeData).forEach(function(viewName) {
        var data = nodeData[viewName];

        var heading = document.createElement('h2');
        heading.className = 'mt-4';
        heading.textContent = viewName + ' - ' + nodeId;

        div.appendChild(heading);

        var uniqueKeys = getUniqueKeys(data);

        var columns = generateColumns(uniqueKeys);

        var table = document.createElement('table');
        table.id = viewName + '-' + nodeId;
        div.appendChild(table);

        $('#' + viewName + '-' + nodeId).bootstrapTable({
            pagination: true,
            search: true,
            columns: columns,
            data: data,
            sortName: uniqueKeys[0],
            sortOrder: 'desc'
        });
    });
});
