import os

from django.conf import settings
from django.core.management import BaseCommand

from services.tree_data_service import TreeDataService


class Command(BaseCommand):
    @staticmethod
    def read_data_folder():
        data_path = f"{settings.BASE_DIR}/data"
        [
            TreeDataService(data_path, file).parse_csv()
            for file in os.listdir(data_path)
            if os.path.isfile(os.path.join(data_path, file))
        ]

    def handle(self, *args, **options):
        self.read_data_folder()
