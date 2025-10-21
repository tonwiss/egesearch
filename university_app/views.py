from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth import logout
from .forms import UniversityFacultyForm
from .models import UniversityFaculty #UserSearchData
from django.http import JsonResponse
import uuid
import json

def results(request):
    return render(request, 'results.html')

# ---------- Авторизация ----------
def admin_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        if username == 'admin' and password == '123456789':
            request.session['is_admin'] = True
            return redirect('custom_admin')
        messages.error(request, 'Неверный логин или пароль.')
    return render(request, 'admin_login.html')


def admin_required(view_func):
    def wrapper(request, *args, **kwargs):
        if not request.session.get('is_admin'):
            return redirect('admin_login')
        return view_func(request, *args, **kwargs)
    return wrapper


# ---------- Главная страница ----------
def index(request):
    directions = [
        "Аграрное и природопользование",
        "Естественно-научное",
        "Инженерно-технические",
        "IT и цифровые технологии",
        "Междисциплинарные и современные направления",
        "Медицинское и здравоохранение",
        "Педагогическое",
        "Физико-математическое",
        "Химико-биологическое",
        "Юридическое",
        "Гуманитарное",
        "Экономическое и управленческое",
        "Творческое и искусство",
        "Военное и силовое",
    ]
    directions.sort()
    directions = [(d, d) for d in directions]  # tuple (value, label)
    return render(request, 'index.html', {'directions': directions})


# ---------- Поиск результатов (позже расширишь) ----------
def results(request):
    faculties = UniversityFaculty.objects.all()
    return render(request, 'results.html', {'faculties': faculties})


# ---------- Панель администратора ----------
@admin_required
def custom_admin(request):
    if request.method == 'POST':
        form = UniversityFacultyForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Вуз успешно добавлен!')
            return redirect('custom_admin')
        messages.error(request, 'Ошибка! Проверьте корректность данных.')
    else:
        form = UniversityFacultyForm()

    faculties = UniversityFaculty.objects.all().order_by('-created_at')
    return render(request, 'custom_admin.html', {'form': form, 'faculties': faculties})


# ---------- Редактирование ----------
@admin_required
def edit_university(request, pk):
    faculty = get_object_or_404(UniversityFaculty, pk=pk)
    if request.method == 'POST':
        form = UniversityFacultyForm(request.POST, request.FILES, instance=faculty)
        if form.is_valid():
            form.save()
            messages.success(request, f'Вуз "{faculty.title}" успешно обновлён!')
            return redirect('custom_admin')
    else:
        form = UniversityFacultyForm(instance=faculty)
    return render(request, 'edit_university.html', {'form': form, 'faculty': faculty})

def save_directions(request):
    print(json.loads(request.body))

# ---------- Удаление ----------
@admin_required
def delete_university(request, pk):
    faculty = get_object_or_404(UniversityFaculty, pk=pk)
    if request.method == 'POST':
        faculty.delete()
        messages.success(request, f'Вуз "{faculty.title}" удалён!')
        return redirect('custom_admin')
    return render(request, 'delete_university.html', {'faculty': faculty})


# ---------- Выход ----------
@admin_required
def admin_logout(request):
    logout(request)
    request.session.flush()
    return redirect('admin_login')


# def create_search_data(request):
#     session_id = request.session.get('session_id')
#     if not session_id:
#         session_id = str(uuid.uuid4())
#         request.session['session_id'] = session_id

#     # Проверяем, существует ли уже
#     data, created = UserSearchData.objects.get_or_create(session_id=session_id)

#     return JsonResponse({
#         'message': 'Search data created',
#         'created': created,
#         'session_id': session_id
#     })