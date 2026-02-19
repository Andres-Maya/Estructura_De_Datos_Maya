from QuickSave import Ship
from Manager import NarrowDock

def main():
    my_port = NarrowDock(capacity=2)

    s1 = Ship("Sea Star", "Panama")
    s2 = Ship("The Kraken", "Norway")
    s3 = Ship("Odyssey", "Greece")

    print("--- Iniciando Operaciones ---")
    my_port.push_ship(s1)
    my_port.push_ship(s2)
    
    my_port.show_status()

    my_port.push_ship(s3)
    
    my_port.show_status()

if __name__ == "__main__":
    main()