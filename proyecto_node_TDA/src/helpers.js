const hbs = require('hbs')

hbs.registerHelper('obtenerPromedio', (nota1, nota2, nota3) => {
    return (nota1 + nota2 + nota3) / 3;
});

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});