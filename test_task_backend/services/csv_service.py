import pandas as pd


class CSVService:
    def __init__(self, path: str, name: str):
        self.path = path
        self.name = name
        self.data = None

    def check_csv(self) -> bool:
        return self.name.split(".")[-1] == "csv"

    def read_csv(self):
        self.data = pd.read_csv(f"{self.path}/{self.name}")
