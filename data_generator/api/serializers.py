from rest_framework import serializers
from .models import GeneratedJson


class GeneratedJsonSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = GeneratedJson
        fields = "__all__"