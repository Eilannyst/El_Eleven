import datetime
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django.urls import reverse
from django.shortcuts import render, redirect, get_object_or_404
from django.core import serializers
from main.forms import ProductForm
from main.models import Product
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.utils.html import strip_tags

@login_required(login_url='/login/') 
def show_main(request):
    filter_type = request.GET.get("filter", "all") 

    if filter_type == "all":
        products = Product.objects.all()
    else: 
        products = Product.objects.filter(user=request.user)
    
    last_login_time = request.COOKIES.get('last_login', 'Never')
    if last_login_time != 'Never':
        try:
            dt_object = datetime.datetime.fromisoformat(last_login_time)
            last_login_time = dt_object.strftime("%d %b %Y, %H:%M:%S")
        except ValueError:
            pass 

    context = {
        'nama': request.user.username, 
        'kelas': 'PBP B', 
        'products': products,
        'last_login': last_login_time, 
        'current_filter': filter_type,
    }
    return render(request, "product.html", context)

@login_required(login_url='/login/')
def create_product(request):
    form = ProductForm(request.POST or None)

    if form.is_valid() and request.method == "POST":
        product = form.save(commit=False) 
        product.user = request.user 
        product.save() 
        messages.success(request, 'Product has been successfully added!')
        return redirect('main:show_main')

    context = {'form': form}
    return render(request, "create_product.html", context)

@login_required(login_url='/login/')
def show_product(request, id):
    product = get_object_or_404(Product, pk=id)
    context = {
        'product': product
    }
    return render(request, "product_detail.html", context)

@login_required(login_url='/login/')
def edit_product(request, id):
    product = get_object_or_404(Product, pk=id)

    if product.user != request.user:
        messages.error(request, "Anda tidak memiliki izin untuk mengedit produk ini.")
        return redirect('main:show_main')

    form = ProductForm(request.POST or None, instance=product)

    if form.is_valid() and request.method == 'POST':
        form.save()
        messages.success(request, 'Produk berhasil diperbarui!')
        return redirect('main:show_main')

    context = {
        'form': form,
        'product': product,  
    }
    return render(request, "edit_product.html", context)

@login_required(login_url='/login/')
@csrf_exempt
def delete_product(request, id):
    product = get_object_or_404(Product, pk=id)
    
    if product.user != request.user:
        messages.error(request, "Anda tidak memiliki izin untuk menghapus produk ini.")
        return redirect('main:show_main')
        
    product.delete()
    messages.success(request, 'Produk berhasil dihapus!')
    return HttpResponseRedirect(reverse('main:show_main'))

def show_xml(request):
    products = Product.objects.all()
    xml_data = serializers.serialize("xml", products)
    return HttpResponse(xml_data, content_type="application/xml")

def show_json(request):
    products = Product.objects.all()
    json_data = serializers.serialize("json", products)
    return HttpResponse(json_data, content_type="application/json")

def show_xml_by_id(request, product_id):
    try:
        product_item = Product.objects.filter(pk=product_id)
        xml_data = serializers.serialize("xml", product_item)
        return HttpResponse(xml_data, content_type="application/xml")
    except Product.DoesNotExist:
        return HttpResponse(status=404)

def get_products_json(request):
    filter_type = request.GET.get("filter", "all") 
    if filter_type == "my" and request.user.is_authenticated:
        products = Product.objects.filter(user=request.user).order_by('-created_at')
    else: 
        products = Product.objects.all().order_by('-created_at')

    data = []
    for product in products:
        data.append({
            'id': product.id,
            'user_id': product.user.id if product.user else None,
            'user_username': product.user.username if product.user else "Anonymous",
            'name': product.name,
            'price': product.price,
            'description': product.description,
            'thumbnail': product.thumbnail if product.thumbnail else '',
            'category': product.category,
            'is_featured': product.is_featured,
            'created_at': product.created_at.isoformat(),
        })
    return JsonResponse(data, safe=False)

def get_product_json_by_id(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    return JsonResponse({
        "id": product.id,
        "name": product.name,
        "price": product.price,
        "description": product.description,
        "category": product.category,
        "thumbnail": product.thumbnail,
        "is_featured": product.is_featured,
        "created_at": product.created_at.isoformat(),  
        "user_username": product.user.username if product.user else "Anonymous",
    })


def show_json_by_id(request, product_id):
    try:
        product_item = Product.objects.get(pk=product_id)
        json_data = serializers.serialize("json", [product_item])
        return HttpResponse(json_data, content_type="application/json")
    except Product.DoesNotExist:
        return HttpResponse(status=404)

@csrf_exempt
@require_POST
@login_required(login_url='/login/')
def create_product_ajax(request):
    form = ProductForm(request.POST)
    if form.is_valid():
        product = form.save(commit=False)
        product.user = request.user
        product.name = strip_tags(product.name) 
        product.description = strip_tags(product.description) 
        product.save()
        return JsonResponse({'status': 'success', 'message': 'Product added successfully!', 'product_id': product.id}, status=201)
    return JsonResponse({'status': 'error', 'message': 'Invalid form data.', 'errors': form.errors}, status=400)

@csrf_exempt
@require_POST
@login_required(login_url='/login/')
def edit_product_ajax(request, id):
    product = get_object_or_404(Product, pk=id)

    if product.user != request.user:
        return JsonResponse({'status': 'error', 'message': 'You do not have permission to edit this product.'}, status=403)

    form = ProductForm(request.POST, instance=product)
    if form.is_valid():
        edited_product = form.save(commit=False)
        edited_product.name = strip_tags(edited_product.name)
        edited_product.description = strip_tags(edited_product.description) 
        edited_product.save()
        return JsonResponse({'status': 'success', 'message': 'Product updated successfully!', 'product_id': product.id}, status=200)
    return JsonResponse({'status': 'error', 'message': 'Invalid form data.', 'errors': form.errors}, status=400)

@csrf_exempt
@require_POST
@login_required(login_url='/login/')
def delete_product_ajax(request, id):
    product = get_object_or_404(Product, pk=id)

    if product.user != request.user:
        return JsonResponse({'status': 'error', 'message': 'You do not have permission to delete this product.'}, status=403)

    product.delete()
    return JsonResponse({'status': 'success', 'message': 'Product deleted successfully!'}, status=200)

@csrf_exempt
def register_ajax(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 'success', 'message': 'Account created successfully!'}, status=201)
        return JsonResponse({'status': 'error', 'message': 'Invalid registration data.', 'errors': form.errors}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)    

@csrf_exempt
def login_user_ajax(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            response_data = {'status': 'success', 'message': f'Welcome, {user.username}!', 'username': user.username}
            return JsonResponse(response_data, status=200)
        return JsonResponse({'status': 'error', 'message': 'Invalid username or password.'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)

@login_required(login_url='/login/')
def logout_user_ajax(request):
    logout(request)
    return JsonResponse({'status': 'success', 'message': 'You have been logged out.'}, status=200)

def register(request):
    form = UserCreationForm()
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your account has been successfully created!')
            return redirect('main:login')
    context = {'form': form}
    return render(request, 'register.html', context)


def login_user(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST) 
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            response = HttpResponseRedirect(reverse("main:show_main"))
            response.set_cookie('last_login', str(datetime.datetime.now()))
            messages.success(request, f"Welcome, {user.username}!")
            return response
        else:
            messages.error(request, "Invalid username or password.")
    else:
        form = AuthenticationForm(request)
    context = {'form': form}
    return render(request, 'login.html', context)

def logout_user(request):
    logout(request)
    response = HttpResponseRedirect(reverse('main:login'))
    response.delete_cookie('last_login')
    messages.info(request, "You have been logged out.")
    return response

