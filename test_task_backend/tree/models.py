from django.db import models


class TreeData(models.Model):
    parent = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True)
    text = models.TextField(max_length=250)
    name = models.CharField(max_length=40)

    class Meta:
        unique_together = [["text", "parent"]]

    def __str__(self) -> str:
        return self.text
