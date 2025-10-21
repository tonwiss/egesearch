from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('results/', views.results, name='results'),

    # Админ-панель
    path('admin/login/', views.admin_login, name='admin_login'),
    path('admin/logout/', views.admin_logout, name='admin_logout'),
    path('admin/', views.custom_admin, name='custom_admin'),
    path('admin/edit/<int:pk>/', views.edit_university, name='edit_university'),
    path('admin/delete/<int:pk>/', views.delete_university, name='delete_university'),
    # path('create_search_data/', views.create_search_data, name='create_search_data'),
    path('save_directions/', views.save_directions)
]