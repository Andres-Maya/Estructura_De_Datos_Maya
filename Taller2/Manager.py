from QuickSave import Ship

class NarrowDock:
    def __init__(self, capacity: int):
        self._capacity = capacity
        self._stack: list[Ship] = []  # La Pila interna

    def push_ship(self, ship: Ship) -> None:
        """Agrega un barco siguiendo LIFO (Last In, First Out)."""
        if len(self._stack) >= self._capacity:
            # Si está lleno, saca al último que entró para dejar espacio
            last_out = self.pop_ship()
            print(f"SALIDA FORZADA: {last_out.name} salió para dar espacio a {ship.name}.")
        
        self._stack.append(ship)
        print(f"⚓ ATRACADO: {ship}")

    def pop_ship(self) -> Ship:
        """Elimina y devuelve el barco en la cima (el último en entrar)."""
        if not self._stack:
            raise IndexError("¡El puerto ya está vacío!")
        return self._stack.pop()

    def show_status(self):
        """Muestra qué barcos hay actualmente en la pila."""
        print(f"\n--- Estado del Puerto ({len(self._stack)}/{self._capacity}) ---")
        for s in reversed(self._stack): # Mostramos la cima primero
            print(f"[ CIMA ] {s}" if s == self._stack[-1] else f"         {s}")
        print("---------------------------------\n")