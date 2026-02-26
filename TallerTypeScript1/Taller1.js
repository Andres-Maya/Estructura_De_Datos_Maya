// Aquí está tu cola
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Queue = /** @class */ (function () {
    function Queue() {
        this.items = [];
    }
    // Enqueue: Adds an item to the back of the queue
    Queue.prototype.enqueue = function (item) {
        this.items.push(item);
    };
    // Dequeue: Removes and returns the item from the front
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    };
    // Front: Returns the first item without removing it
    Queue.prototype.front = function () {
        return this.items[0];
    };
    // Rear: Returns the last item without removing it
    Queue.prototype.rear = function () {
        if (this.items.length === 0)
            return undefined;
        return this.items[this.items.length - 1];
    };
    // Size: Returns the total number of items
    Queue.prototype.size = function () {
        return this.items.length;
    };
    // Helper: Checks if the queue is empty
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    // Helper: Returns all items for UI rendering
    Queue.prototype.getItems = function () {
        return __spreadArray([], this.items, true);
    };
    return Queue;
}());
// 2. Domain Model: Space Debris
var SpaceDebris = /** @class */ (function () {
    function SpaceDebris(type, massKg) {
        // Generates a simple random ID like "OBJ-8F3A"
        this.id = "OBJ-".concat(Math.floor(Math.random() * 0xffff).toString(16).toUpperCase());
        this.type = type;
        this.massKg = massKg;
    }
    return SpaceDebris;
}());
// 3. User Interface Controller
var SpaceDebrisController = /** @class */ (function () {
    function SpaceDebrisController() {
        this.debrisQueue = new Queue();
        // DOM Element Binding
        this.debrisTypeInput = document.getElementById('debrisType');
        this.debrisMassInput = document.getElementById('debrisMass');
        this.captureButton = document.getElementById('btnCapture');
        this.incinerateButton = document.getElementById('btnIncinerate');
        this.queueDisplay = document.getElementById('queueDisplay');
        this.statsDisplay = document.getElementById('statsDisplay');
        this.initializeEvents();
        this.updateUI();
    }
    SpaceDebrisController.prototype.initializeEvents = function () {
        var _this = this;
        this.captureButton.addEventListener('click', function () { return _this.handleCapture(); });
        this.incinerateButton.addEventListener('click', function () { return _this.handleIncineration(); });
    };
    SpaceDebrisController.prototype.handleCapture = function () {
        var type = this.debrisTypeInput.value.trim();
        var mass = parseFloat(this.debrisMassInput.value);
        if (!type || isNaN(mass) || mass <= 0) {
            alert("Por favor, ingrese un tipo válido y una masa mayor a 0.");
            return;
        }
        var newDebris = new SpaceDebris(type, mass);
        this.debrisQueue.enqueue(newDebris);
        // Clear inputs
        this.debrisTypeInput.value = '';
        this.debrisMassInput.value = '';
        this.updateUI();
    };
    SpaceDebrisController.prototype.handleIncineration = function () {
        if (this.debrisQueue.isEmpty()) {
            alert("La cámara de contención está vacía. No hay nada que incinerar.");
            return;
        }
        var incineratedDebris = this.debrisQueue.dequeue();
        alert("\u00A1Pew pew! Se ha incinerado el objeto: ".concat(incineratedDebris === null || incineratedDebris === void 0 ? void 0 : incineratedDebris.id, " (").concat(incineratedDebris === null || incineratedDebris === void 0 ? void 0 : incineratedDebris.type, ")"));
        this.updateUI();
    };
    SpaceDebrisController.prototype.updateUI = function () {
        this.renderQueue();
        this.renderStats();
    };
    SpaceDebrisController.prototype.renderQueue = function () {
        var _this = this;
        this.queueDisplay.innerHTML = '';
        var items = this.debrisQueue.getItems();
        if (items.length === 0) {
            this.queueDisplay.innerHTML = '<p class="empty-msg">Cámara de contención vacía.</p>';
            return;
        }
        items.forEach(function (debris, index) {
            var debrisCard = document.createElement('div');
            debrisCard.className = 'debris-card';
            // Highlight front and rear visually
            if (index === 0)
                debrisCard.classList.add('front-item');
            if (index === items.length - 1)
                debrisCard.classList.add('rear-item');
            debrisCard.innerHTML = "\n                <strong>".concat(debris.id, "</strong><br>\n                Tipo: ").concat(debris.type, "<br>\n                Masa: ").concat(debris.massKg, " kg\n            ");
            _this.queueDisplay.appendChild(debrisCard);
        });
    };
    SpaceDebrisController.prototype.renderStats = function () {
        var frontItem = this.debrisQueue.front();
        var rearItem = this.debrisQueue.rear();
        this.statsDisplay.innerHTML = "\n            <ul>\n                <li><strong>Objetos en Cola (Size):</strong> ".concat(this.debrisQueue.size(), "</li>\n                <li><strong>Pr\u00F3ximo a incinerar (Front):</strong> ").concat(frontItem ? frontItem.id : 'Ninguno', "</li>\n                <li><strong>\u00DAltimo capturado (Rear):</strong> ").concat(rearItem ? rearItem.id : 'Ninguno', "</li>\n            </ul>\n        ");
    };
    return SpaceDebrisController;
}());
// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    new SpaceDebrisController();
});
