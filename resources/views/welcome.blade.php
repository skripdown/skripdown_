<!DOCTYPE html>
<html lang="{{env('APP_LANG')}}">
<head>
    <title>{{env('APP_NAME')}}</title>
    <meta name="viewport" content="{{env('APP_VIEWPORT')}}">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/png" sizes="{{env('ICON_SIZE')}}" href="{{asset(env('ICON_PATH'))}}">
    <link rel="stylesheet" href="{{asset(env('LIB_PATH').'extra/owl-carousel/css/owl.carousel.min.css')}}">
    <link rel="stylesheet" href="{{asset(env('LIB_PATH').'extra/owl-carousel/css/owl.theme.default.css')}}">
    <link rel="stylesheet" href="{{asset(env('LIB_PATH').'mdi/css/materialdesignicons.min.css')}}">
    <link rel="stylesheet" href="{{asset(env('LIB_PATH').'extra/aos/css/aos.css')}}">
    <link rel="stylesheet" href="{{asset(env('CSS_PATH').'landing/style.min.css')}}">
    <link rel="stylesheet" href="{{asset(env('CSS_PATH').'added.css')}}">
</head>
<body id="body" data-spy="scroll" data-target=".navbar" data-offset="100">
<header id="header-section">
    <nav class="navbar navbar-expand-lg pl-3 pl-sm-0" id="navbar">
        <div class="container">
            <div class="navbar-brand-wrapper d-flex w-100">
                <img src="{{asset(env('ICON_PATH'))}}" alt="" width="80">
                <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="mdi mdi-menu navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse navbar-menu-wrapper" id="navbarSupportedContent">
                <ul class="navbar-nav align-items-lg-center align-items-start ml-auto">
                    <li class="d-flex align-items-center justify-content-between pl-4 pl-lg-0">
                        <div class="navbar-collapse-logo">
                            <img src="{{asset(env('ICON_PATH'))}}" alt="" width="80">
                        </div>
                        <button class="navbar-toggler close-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="mdi mdi-close navbar-toggler-icon pl-5"></span>
                        </button>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#header-section">Beranda <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#features-section">How?</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#digital-marketing-section">Fitur</a>
                    </li>
                    <li class="nav-item btn-contact-us pl-4 pl-lg-0">
                        <a href="{{url('/editor')}}" class="btn btn-success">Mulai menulis</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
<div class="banner">
    <div class="container">
        <h1 class="font-weight-semibold">{{env('APP_NAME')}}: {{env('APP_DESCRIPTION')}}</h1>
        <h6 class="font-weight-normal text-muted pb-3">{{env('APP_SUBTITLE')}}</h6>
        <img src="{{asset('asset/banner.svg')}}" alt="" class="img-fluid mt-5 mb-5" style="height: 40vh">
    </div>
</div>
<div class="content-wrapper">
    <div class="container">
        <section class="features-overview" id="features-section" >
            <div class="content-header">
                <h2>Cara kerja Skripdown</h2>
                <h6 class="section-subtitle text-muted">Skripdown didesain khusus untuk mempercepat penulisan skripsi<br>dan membantu mahasiswa tingkat akhir dalam melakukan penelitian.</h6>
            </div>
            <div class="d-md-flex justify-content-between">
                <div class="grid-margin d-flex justify-content-start">
                    <div class="features-width">
                        <h5 class="py-3">Format<br>Otomatis</h5>
                        <p class="text-muted">Mengatur format penulisan skripsi secara otomatis berdasarkan fakultas dan jurusan</p>
                    </div>
                </div>
                <div class="grid-margin d-flex justify-content-center">
                    <div class="features-width">
                        <h5 class="py-3">Generator<br>Isi</h5>
                        <p class="text-muted">Men-generate cover, lembar pengesahan, daftar isi, dan masih banyak lagi.</p>
                    </div>
                </div>
                <div class="grid-margin d-flex justify-content-end">
                    <div class="features-width">
                        <h5 class="py-3">Sintaks<br>Markdown</h5>
                        <p class="text-muted">Penggunaan bahasa markdown sebagai sintaks penulisan dokumen.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="digital-marketing-service" id="digital-marketing-section">
            <div class="row align-items-center">
                <div class="col-12 col-lg-7 grid-margin grid-margin-lg-0" data-aos="fade-right">
                    <h3 class="m-0">Sintaks berbasis Markdown<br>sebagai penulisan dokumen skripsi!</h3>
                    <div class="col-lg-7 col-xl-6 p-0">
                        <p class="py-4 m-0 text-muted">Sintaks berbasis bahasa markdown seperti <span class="text-info">**<strong class="text-dark">bold</strong>**</span>, <span class="text-info">*<em class="text-dark">italic</em>*</span>, <span class="text-info">__<u class="text-dark">underline</u>__</span>.</p>
                        <p class="font-weight-medium text-muted">membuat tabel, memuat gambar dan indeks penomoran.</p>
                    </div>
                </div>
                <div class="col-12 col-lg-5 p-0 img-digital grid-margin grid-margin-lg-0" data-aos="fade-left">
                    <img src="{{asset('asset/fitur-1.svg')}}" alt="" class="img-fluid">
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-12 col-lg-7 text-center flex-item grid-margin" data-aos="fade-right">
                    <img src="{{asset('asset/fitur-2.svg')}}" alt="" class="img-fluid">
                </div>
                <div class="col-12 col-lg-5 flex-item grid-margin" data-aos="fade-left">
                    <h3 class="m-0">Format otomatis dokumen<br>sesuai dengan fakultas dan jurusan.</h3>
                    <div class="col-lg-9 col-xl-8 p-0">
                        <p class="py-4 m-0 text-muted">Penambahan sintaks meta pada markdown membuat informasi tambahan dapat dimuat sehingga penulisan dokumen dapat dibuat lebih spesifik.</p>
                        <p class="pb-2 font-weight-medium text-muted">Selain sintaks meta, heading juga didesain sesuai dengan struktur dokumen skripsi.</p>
                    </div>
                </div>
            </div>
        </section>
        <footer class="border-top">
            <p class="text-center text-muted pt-4">Copyright © 2020. Made with ❤️ by <a href="https://www.instagram.com/malkolp/" class="px-1 font-weight-bold text-dark">malkolp.</a>All rights reserved.</p>
        </footer>
    </div>
</div>
<script src="{{asset(env('LIB_PATH').'core/jquery/dist/jquery.min.js')}}"></script>
<script src="{{asset(env('LIB_PATH').'core/bootstrap/dist/js/bootstrap.js')}}"></script>
<script src="{{asset(env('LIB_PATH').'extra/owl-carousel/js/owl.carousel.min.js')}}"></script>
<script src="{{asset(env('LIB_PATH').'extra/aos/js/aos.js')}}"></script>
<script src="{{asset(env('JS_PATH').'landingpage.js')}}"></script>
</body>
</html>
