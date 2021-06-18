from typing import Type

from tree.models import TreeData
from .csv_service import CSVService


class TreeDataService(CSVService):
    def __init__(self, path: str, name: str, model: Type[TreeData] = TreeData):
        super().__init__(path=path, name=name)
        self.model = model

    @staticmethod
    def push_data_to_db(name: str, text: str, parent: TreeData = None):
        return TreeData.objects.create(name=name, text=text, parent=parent)

    @staticmethod
    def check_exists(text: str, parent: TreeData):
        return TreeData.objects.filter(parent=parent, text=text).exists()

    def get_or_create(self, parent: TreeData, text: str, name: str):
        if self.check_exists(parent=parent, text=text):
            return TreeData.objects.get(parent=parent, text=text)
        return self.push_data_to_db(name=name, text=text, parent=parent)

    def parse_csv(self):
        if not self.check_csv():
            raise TypeError("File is not in csv format")
        self.read_csv()
        column_names = self.data.keys().values
        for index, row in self.data.iterrows():
            parent = None
            for i in range(0, len(column_names)):
                parent = self.get_or_create(
                    parent=parent, text=row[column_names[i]], name=column_names[i]
                )
