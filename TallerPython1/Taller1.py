import copy

class DataStructureManager:
    """
    Class designed to manage advanced operations on arrays and matrices.
    Implements OOP principles, circular logic, and sorting algorithms.
    """
    
    def __init__(self):
        # 1a. One-dimensional list (Size 5 - Array of strings/pointers)
        self.unidimensional_list = ["Python", "Java", "C++", "Kotlin", "Swift"]
        
        # 1b. Two-dimensional list (3x3 Matrix)
        self.matrix = [
            [10, 20, 30],
            [40, 50, 60],
            [70, 80, 90]
        ]

    def access_elements(self):
        print("--- 2. Accessing Elements ---")
        # 2a. Access second element (index 1)
        print(f"2a. Second element of the list: {self.unidimensional_list[1]}")
        
        # 2b. Access element at row 2, column 2 (index [1][1])
        value = self.matrix[1][1]
        print(f"2b. Element at Matrix [2][2]: {value}")

    def insertion_and_deletion(self):
        print("\n--- 3. Insertion and Deletion ---")
        # 3a. Insert "Data Structure" at position 3
        self.unidimensional_list.insert(3, "Data Structure")
        # Append an element to the end
        self.unidimensional_list.append("Go")
        print(f"List after insertion: {self.unidimensional_list}")
        
        # 3b. Delete element at 3rd row, 3rd column (index [2][2])
        # Using 'del' for specific position
        try:
            del self.matrix[2][2]
            print(f"Matrix after 'del' at [2][2]: {self.matrix}")
        except IndexError:
            print("Error: Position not found.")

        # Using 'remove' to delete by value
        if "Java" in self.unidimensional_list:
            self.unidimensional_list.remove("Java")
            
        # Using 'pop' to delete the last element
        last_item = self.unidimensional_list.pop()
        print(f"List after 'remove' and 'pop' ({last_item}): {self.unidimensional_list}")

    def search_elements(self):
        print("\n--- 4. Searching Elements ---")
        # 4a. Search for "Data Structure"
        target = "Data Structure"
        if target in self.unidimensional_list:
            index = self.unidimensional_list.index(target)
            print(f"4a. '{target}' found at index: {index}")

        # 4b. Search in the second row of the matrix
        row_two = self.matrix[1]
        search_val = 50
        if search_val in row_two:
            col_index = row_two.index(search_val)
            print(f"4b. Value {search_val} found in Row 2 at Column index: {col_index}")

    def sorting_algorithms(self):
        print("\n--- 5 & 6. Sorting ---")
        # Manual Bubble Sort Implementation
        # Sorting a numeric array to demonstrate logic
        arr = [64, 34, 25, 12, 22, 11, 90]
        n = len(arr)
        for i in range(n):
            for j in range(0, n - i - 1):
                if arr[j] > arr[j + 1]:
                    # Swap pointers
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
        print(f"Manual Bubble Sort result: {arr}")

        # Native .sort() method
        self.unidimensional_list.sort()
        print(f"Native .sort() result: {self.unidimensional_list}")

    def circular_logic_demo(self, steps):
        """
        Simulates a circular array using the modulo (%) operator.
        """
        print(f"\n--- Extra: Circular Array Traversal ({steps} steps) ---")
        n = len(self.unidimensional_list)
        for i in range(steps):
            circular_index = i % n
            print(f"Index {circular_index}: {self.unidimensional_list[circular_index]}")

# --- Execution ---
if __name__ == "__main__":
    manager = DataStructureManager()
    manager.access_elements()
    manager.insertion_and_deletion()
    manager.search_elements()
    manager.sorting_algorithms()
    manager.circular_logic_demo(8)