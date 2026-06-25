from django.db import models


class GeneratedJson(models.Model):

    prompt = models.TextField()

    generated_data = models.JSONField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Generation #{self.id}"