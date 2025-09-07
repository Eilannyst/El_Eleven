from django.shortcuts import render

def show_main(request):
    context = {
        'nama': 'Elizabeth Meilanny Sitanggang',
        'kelas': 'PBP B'
    }

    return render(request, "main.html", context)
