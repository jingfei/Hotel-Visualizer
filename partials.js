var fs = require("fs");

module.exports= function (hbs) {
  // register partials
  hbs.registerPartial('head', getPartials('head'));
  hbs.registerPartial('header', getPartials('header'));
  hbs.registerPartial('footer', getPartials('footer'));

  // manager
  hbs.registerPartial('header-manager', getPartials('header-manager'));
  // staff
  hbs.registerPartial('header-staff', getPartials('header-staff'));
  // customer
  hbs.registerPartial('header-customer', getPartials('header-customer'));
};

function getPartials(filename) {
  var template = fs.readFileSync('./layout/'+filename+'.html', 'utf8');
  template = template.replace(/[\t\n]/g, '');
  return template;
}
