// Aquí está tu cola

class Queue<T> {
    private items: T[] = [];

    // Enqueue: Adds an item to the back of the queue
    public enqueue(item: T): void {
        this.items.push(item);
    }

    // Dequeue: Removes and returns the item from the front
    public dequeue(): T | undefined {
        return this.items.shift();
    }

    // Front: Returns the first item without removing it
    public front(): T | undefined {
        return this.items[0];
    }

    // Rear: Returns the last item without removing it
    public rear(): T | undefined {
        if (this.items.length === 0) return undefined;
        return this.items[this.items.length - 1];
    }

    // Size: Returns the total number of items
    public size(): number {
        return this.items.length;
    }

    // Helper: Checks if the queue is empty
    public isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Helper: Returns all items for UI rendering
    public getItems(): T[] {
        return [...this.items];
    }
}

// 2. Domain Model: Space Debris
class SpaceDebris {
    public readonly id: string;
    public readonly type: string;
    public readonly massKg: number;

    constructor(type: string, massKg: number) {
        // Generates a simple random ID like "OBJ-8F3A"
        this.id = `OBJ-${Math.floor(Math.random() * 0xffff).toString(16).toUpperCase()}`;
        this.type = type;
        this.massKg = massKg;
    }
}

// 3. User Interface Controller
class SpaceDebrisController {
    private debrisQueue: Queue<SpaceDebris>;
    
    // UI Elements
    private debrisTypeInput: HTMLInputElement;
    private debrisMassInput: HTMLInputElement;
    private captureButton: HTMLButtonElement;
    private incinerateButton: HTMLButtonElement;
    private queueDisplay: HTMLElement;
    private statsDisplay: HTMLElement;

    constructor() {
        this.debrisQueue = new Queue<SpaceDebris>();
        
        // DOM Element Binding
        this.debrisTypeInput = document.getElementById('debrisType') as HTMLInputElement;
        this.debrisMassInput = document.getElementById('debrisMass') as HTMLInputElement;
        this.captureButton = document.getElementById('btnCapture') as HTMLButtonElement;
        this.incinerateButton = document.getElementById('btnIncinerate') as HTMLButtonElement;
        this.queueDisplay = document.getElementById('queueDisplay') as HTMLElement;
        this.statsDisplay = document.getElementById('statsDisplay') as HTMLElement;

        this.initializeEvents();
        this.updateUI();
    }

    private initializeEvents(): void {
        this.captureButton.addEventListener('click', () => this.handleCapture());
        this.incinerateButton.addEventListener('click', () => this.handleIncineration());
    }

    private handleCapture(): void {
        const type = this.debrisTypeInput.value.trim();
        const mass = parseFloat(this.debrisMassInput.value);

        if (!type || isNaN(mass) || mass <= 0) {
            alert("Por favor, ingrese un tipo válido y una masa mayor a 0.");
            return;
        }

        const newDebris = new SpaceDebris(type, mass);
        this.debrisQueue.enqueue(newDebris);
        
        // Clear inputs
        this.debrisTypeInput.value = '';
        this.debrisMassInput.value = '';

        this.updateUI();
    }

    private handleIncineration(): void {
        if (this.debrisQueue.isEmpty()) {
            alert("La cámara de contención está vacía. No hay nada que incinerar.");
            return;
        }

        const incineratedDebris = this.debrisQueue.dequeue();
        alert(`¡Pew pew! Se ha incinerado el objeto: ${incineratedDebris?.id} (${incineratedDebris?.type})`);
        
        this.updateUI();
    }

    private updateUI(): void {
        this.renderQueue();
        this.renderStats();
    }

    private renderQueue(): void {
        this.queueDisplay.innerHTML = '';
        const items = this.debrisQueue.getItems();

        if (items.length === 0) {
            this.queueDisplay.innerHTML = '<p class="empty-msg">Cámara de contención vacía.</p>';
            return;
        }

        items.forEach((debris, index) => {
            const debrisCard = document.createElement('div');
            debrisCard.className = 'debris-card';
            
            // Highlight front and rear visually
            if (index === 0) debrisCard.classList.add('front-item');
            if (index === items.length - 1) debrisCard.classList.add('rear-item');

            debrisCard.innerHTML = `
                <strong>${debris.id}</strong><br>
                Tipo: ${debris.type}<br>
                Masa: ${debris.massKg} kg
            `;
            this.queueDisplay.appendChild(debrisCard);
        });
    }

    private renderStats(): void {
        const frontItem = this.debrisQueue.front();
        const rearItem = this.debrisQueue.rear();

        this.statsDisplay.innerHTML = `
            <ul>
                <li><strong>Objetos en Cola (Size):</strong> ${this.debrisQueue.size()}</li>
                <li><strong>Próximo a incinerar (Front):</strong> ${frontItem ? frontItem.id : 'Ninguno'}</li>
                <li><strong>Último capturado (Rear):</strong> ${rearItem ? rearItem.id : 'Ninguno'}</li>
            </ul>
        `;
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SpaceDebrisController();
});