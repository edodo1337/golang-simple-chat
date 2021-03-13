String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };


document.addEventListener('DOMContentLoaded', function () {
    if ('WebSocket' in window) {
        var ws = new WebSocket("ws://localhost:8080/ws");

        var
            chatInput = document.getElementById("chat-input-message");
            chatUser = document.getElementById("chat-input-username");
            chatList = document.getElementById("chat-list");
            chatForm = document.getElementById("chat-form");
            chatSubmit = document.getElementById("chat-button-submit");
            chatInfo = document.getElementById("info-place");
            chatError = document.getElementById("error-place");


        chatSubmit.addEventListener("submit", function (e) {
            e.preventDefault();
        }, false);

        chatSubmit.addEventListener("click", function (e) {
            e.preventDefault();
            var msg = chatInput.value;
            var usr = chatUser.value;
            
        	var data = {
        		body: msg,
                user: usr
        	};
        	ws.send(JSON.stringify(data));
        	chatInput.value = '';
        }, false);

        ws.onopen = function () {
            chatInfo.style.display = 'block';
            chatInfo.innerHTML = "Connected";
        };

        ws.onmessage = function (e) {
            try {
                console.log(e.data);
                var data = JSON.parse(e.data);
                console.log(data);
                var randomColor = Math.abs(Math.floor(data.user.hashCode()*16777215)).toString(16).slice(0,6);
                // $('<li>').text(data.body).appendTo(chatList);
                var msg_item = document.createElement("li");
                msg_item.style.color = "#" + randomColor;
                msg_item.style.fontWeight = 'bold';
                console.log(randomColor);
                msg_item.innerText = data.user + " > " + data.body;
                msg_item.classList.toggle('message-item');
                // msg_item.appendTo(chatList);
                chatList.appendChild(msg_item);
            } catch (e) {
                chatError.style.display = 'block';
                chatError.innerHTML = "Error";
            }
        };

        ws.onerror = function (e) {
            if (e.data) {
                chatError.style.display = 'block';
                chatError.innerHTML = e.data;
            } else {
                chatError.style.display = 'block';
                chatError.innerHTML = "Error";
            }
        };

        ws.onclose = function (e) {
            if (e.wasClean) {
                chatError.style.display = 'block';
                chatError.innerHTML = "Disconnected";
                
            } else {
                chatError.style.display = 'block';
                chatError.innerHTML = "Disconnected error";
            }
        };
    } else {
        alert("Websocket is not supported by your browser");
    }
});