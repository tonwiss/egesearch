from django.db import models
from django.contrib.auth.models import User


# ---------- Направления ----------
DIRECTION_CHOICES = sorted([
    ('agrarian', 'Аграрное и природопользование'),
    ('art', 'Творческое и искусство'),
    ('chem_bio', 'Химико-биологическое'),
    ('economics', 'Экономическое и управленческое'),
    ('engineering', 'Инженерно-технические'),
    ('humanities', 'Гуманитарное'),
    ('interdisciplinary', 'Междисциплинарные и современные направления'),
    ('it', 'IT и цифровые технологии'),
    ('law', 'Юридическое'),
    ('medical', 'Медицинское и здравоохранение'),
    ('military', 'Военное и силовое'),
    ('natural_science', 'Естественно-научное'),
    ('pedagogical', 'Педагогическое'),
    ('physics_math', 'Физико-математическое'),
], key=lambda x: x[1])  # сортировка по названию


class UniversityFaculty(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название вуза')
    short_description = models.TextField(verbose_name='Краткое описание')
    direction = models.CharField(
        max_length=50,
        choices=DIRECTION_CHOICES,
        verbose_name='Направление подготовки'
    )
    is_budget = models.BooleanField(default=True, verbose_name='Есть бюджетные места')
    required_score_budget = models.PositiveIntegerField(null=True, blank=True, verbose_name='Минимальный балл (бюджет)')
    required_score_paid = models.PositiveIntegerField(null=True, blank=True, verbose_name='Минимальный балл (платно)')
    price_rub = models.PositiveIntegerField(null=True, blank=True, verbose_name='Стоимость обучения (руб)')
    photo = models.ImageField(upload_to='universities/', verbose_name='Фото')
    site_url = models.URLField(blank=True, verbose_name='Сайт вуза')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Факультет / Программа'
        verbose_name_plural = 'Факультеты / Программы'



# class UserSearchData(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
#     session_id = models.CharField(max_length=100, null=True, blank=True)  # если пользователь не авторизован
#     created_at = models.DateTimeField(auto_now_add=True)

#     # поля под критерии
#     ege_scores = models.JSONField(default=dict, blank=True)   # { "math": 85, "russian": 92 }
#     olympiads = models.JSONField(default=list, blank=True)
#     gto = models.BooleanField(default=False)
#     volunteering = models.BooleanField(default=False)
#     chosen_directions = models.JSONField(default=list, blank=True)

#     def __str__(self):
#         return f"SearchData for {self.user or self.session_id}"