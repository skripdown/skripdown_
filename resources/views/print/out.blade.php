<!DOCTYPE HTML>
<html lang="{{env('APP_LANG')}}">
    <head>
        <title>OUT</title>
        <script src="{{asset(env('LIB_PATH').'extra/paged_js/paged.js')}}"></script>
        @include('print.'.$result[0].'.'.$result[1])
    </head>
    <body>
        {!! $result[2] !!}
        <script>
            setTimeout(()=>{
                print();
            },{{env('PARSER_TIMEOUT')}});
        </script>
    </body>
</html>
