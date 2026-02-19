class Ship:
    def __init__(self, name: str, country: str):
        self.name = name
        self.country = country

    def __str__(self):
        return f"Ship: {self.name} [{self.country}]"