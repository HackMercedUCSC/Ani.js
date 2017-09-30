const browserify = require('browserify');
const fs = require('fs');

if (!fs.existsSync('build')) {
  fs.mkdirSync('build');
}

browserify('src', {
  standalone: 'Ani'
})
  // .transform('babelify', { presets: ['es2015'] })
  // .transform({ global: true }, 'uglifyify')
  .bundle()
  .pipe(fs.createWriteStream('build/ani.js'));
