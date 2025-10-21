from django import forms
from .models import UniversityFaculty

class UniversityFacultyForm(forms.ModelForm):
    class Meta:
        model = UniversityFaculty
        fields = [
            'title', 'short_description', 'direction', 'is_budget',
            'required_score_budget', 'required_score_paid',
            'price_rub', 'photo', 'site_url'
        ]
        widgets = {
            'short_description': forms.Textarea(attrs={'rows': 3}),
        }