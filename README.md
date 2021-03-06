# SimpleScrollbar
Very simple vanilla javascript library for creating a custom scrollbar cross-browser and cross-devices.

## Demo
http://frsgit.github.io/simple-scrollbar

## Benefits

- Extremely lightweight (less than 1KB after gzip and minify)
- It uses the native ([throttled](https://github.com/eligrey/classList.js)) scroll events, so:
  - All the events work and are smooth (mouse wheel, space, page down, page up, arrows etc).
  - The performance is awesome!
- No dependencies, completely vanilla Javascript!

## Browser Support

It was developed for evergreen browsers, but it works on IE11 either.

## Usage
### Binding
If you want to attach SimpleScrollbar to your container you can use the `SimpleScrollbar.initEl` method.

```HTML
<div class="myClass"></div>

<script>
  var el = document.querySelector('.myClass');
  SimpleScrollbar.initEl(el);
</script>
```

## Credits
Inspired by yairEO's jQuery plugin ([fakescroll](https://github.com/yairEO/fakescroll))
