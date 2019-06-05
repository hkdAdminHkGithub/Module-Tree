@extends('tree::layouts.master')
@section('ajax') <meta name="csrf-token" content="{{ csrf_token() }}"> @stop
@section('title') Tiêu_đề_tree @stop

@section('css_tree') 
{{-- include css --}}
@stop

@section('js_tree') 
<script src="{{ asset('tree_lib/js/manifest.js') }}" type="text/javascript"></script>
<script src="{{ asset('tree_lib/js/vendor.js') }}" type="text/javascript"></script>
<script src="{{ asset('tree_lib/js/tree_s.js') }}" type="text/javascript"></script>
@stop

@section('content')
    <div id="app"></div>
@stop
