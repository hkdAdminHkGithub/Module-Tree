@extends('themesb::layouts.master')

@section('css_themesb')
	<link href="{{ asset('tree_lib/css/tree.css') }}" rel="stylesheet" media="all" type="text/css" />
	@yield('css_tree')
@endsection

@section('js_themesb')
	<script src="{{ asset('tree_lib/js/tree.js') }}" type="text/javascript"></script>
	@yield('js_tree')
@endsection

