/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function addNewElement(e) {
    e.preventDefault();
    var value = $("form.add-new-element input[type='text']").val();

    if (value) {
        createNewItem(value);
        eventClick("ul#list .trash", "trash", "Elemento eliminado!");
        eventClick("ul#list .edit", "edit", "Elemento actualizado!");

        $("form.add-new-element input[type='text']").val("");
        updateSession($("ul#list>li>div.ui-btn.general-box"));
    }
}

function eventClick(route, type) {
    $(route).last().on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        let element = (event.target.tagName == "I") ? $(event.target).parent() : $(event.target);
        if (type === "trash") {
            if (confirm("Deseas seguir con la operación?")) {
                removeElement(element.parent().parent());
            }
        } else if (type === "edit") {
            const newText = prompt("Introduce el nuevo contenido:");
            if (newText) {
                element.parent().contents().last().replaceWith(newText);
            }
        }
        updateSession($("ul#list>li>div.ui-btn.general-box"));
    });
}

function createNewItem(text) {
    $("ul#list").append(
        `<li class="ui-last-child">
            <div class="ui-btn general-box">
            <div class="ui-input-btn box-btn trash">
            <i class="material-icons icon-trash">delete_forever</i>
            </div>
            <div class="ui-input-btn box-btn edit">
            <i class="material-icons icon-edit">edit</i>
            </div>
            ${text}
            </div>
        </li>`);
}

function getTasks() {
    if (localStorage.getItem("items")) {
        let items = JSON.parse(localStorage.getItem("items"));
        for (const item of items) {
            createNewItem(item);
            eventClick("ul#list .trash", "trash", "Elemento eliminado!");
            eventClick("ul#list .edit", "edit", "Elemento actualizado!");
        }
    }
}

function updateSession(list) {
    var items = [];
    list.each((i) => items.push($(list[i]).contents().last()[0].textContent.replace(/\s+/g, '')));
    localStorage.setItem("items", JSON.stringify(items));
}

function removeElement(element) {
    element.remove();
}


$(function () {
    getTasks();
    $("form.add-new-element").on("submit", (e) => addNewElement(e));
});