var dbUserResults = [
  { id: "000000001", name: "王大明", id_number: "A123456789", phone: "0912345678", email: "mail@icloud.com", email_verify: true, sex: 1, address: "台北市blabla...", birthday: "1990-01-01", signup: "2022-01-01", expire: "2027-01-01", is_expired: false, is_ad: true, dismiss: 0 },
  { id: "000000002", name: "李小華", id_number: "B123456789", phone: "0987654321", email: "mail@gmail.com", email_verify: false, sex: 2, address: "新北市blabla...", birthday: "1990-12-31", signup: "2017-01-01", expire: "2022-01-01", is_expired: true, is_ad: false, dismiss: 0 },
  { id: "000000003", name: "陳中德", id_number: "C123456789", phone: "0911111111", email: "mail@outlook.com", email_verify: true, sex: 1, address: "桃園市blabla...", birthday: "1991-01-01", signup: "2022-01-01", expire: "2027-01-01", is_expired: false, is_ad: false, dismiss: 1 }
];
var dbPriductResults = [
  { name: "衣服", product_code: "a1234", ean: "12345678", price: "299", size: "S", color: "黑", length: 25, width: 45, height: 80, weight: 60, total: 2, image: 3, dismiss: 0 },
  { name: "衣服", product_code: "a2345", ean: "23456789", price: "299", size: "S", color: "紅", length: 25, width: 45, height: 80, weight: 60, total: 2, image: 0, dismiss: 0 },
  { name: "褲子", product_code: "b1234", ean: "87654321", price: "199", size: "L", color: "白", length: 80, width: 45, height: 60, weight: 60, total: 0, image: 2, dismiss: 0 },
  { name: "裙子", product_code: "c1234", ean: "98765432", price: "399", size: "M", color: "粉", length: 40, width: 45, height: 60, weight: 60, total: 0, image: 2, dismiss: 1 },
];
var dbOrderResults = [
  { id: "000000001", name: "王大明", phone: "0912345678", email: "mail@icloud.com", create_date: "2022-01-01 00:00:00", pay_date: "2022-01-01 00:15:00", ship_date: "2022-01-01 00:30:00", refund_date: null, dismiss: 0 },
  { id: "000000002", name: "王大明", phone: "0912345678", email: "mail@icloud.com", create_date: "2022-01-02 00:00:00", pay_date: null, ship_date: null, refund_date: null, dismiss: 0 },
  { id: "000000003", name: "李小華", phone: "0987654321", email: "mail@gmail.com", create_date: "2022-01-02 00:00:00", pay_date: "2022-01-02 00:15:00", ship_date: null, refund_date: null, dismiss: 0 },
  { id: "000000004", name: "陳中德", phone: "0911111111", email: "mail@outlook.com", create_date: "2022-01-02 00:00:00", pay_date: "2022-01-02 00:15:00", ship_date: null, refund_date: null, dismiss: 1 },
  { id: "000000005", name: "王大明", phone: "0912345678", email: "mail@icloud.com", create_date: "2022-01-02 00:00:00", pay_date: "2022-01-02 00:15:00", ship_date: null, refund_date: "2022-01-02 00:30:00", dismiss: 1 },
  { id: "000000006", name: "李小華", phone: "0987654321", email: "mail@gmail.com", create_date: "2022-01-02 00:00:00", pay_date: null, ship_date: null, refund_date: null, dismiss: 1 }
]

function tabMainClick(elm) {
  var selectElement = elm.parentElement.parentElement.querySelector('li.default') || elm.parentElement.parentElement.querySelector('li.show');
  if (selectElement && selectElement !== elm.parentElement) {
    selectElement.classList.remove('default');
    selectElement.classList.remove('show');
    selectElement.classList.add('hide');
    var timer = setTimeout(function () {
      clearTimeout(timer);
      selectElement.classList.remove('hide');
    }, 300)
  }
  if (selectElement === elm.parentElement) {
    elm.parentElement.classList.remove('default');
    elm.parentElement.classList.remove('show');
    elm.parentElement.classList.add('hide');
    var timer = setTimeout(function () {
      clearTimeout(timer);
      elm.parentElement.classList.remove('hide');
    }, 300)
    return
  };
  elm.parentElement.classList.add('show');
};

function _(elm, attrs, children) {
	var dom = document.createElement(elm);
	if (attrs) {
		Object.keys(attrs).forEach(attr => {
			if (attr === "name") return dom.setAttribute('name', attrs.name);
			if (attr === "value") return dom.value = attrs.value;
			if (attr === "id") return dom.id = attrs.id;
			if (attr === "class") return dom.className = attrs.class;
			if (attr === "innerText") return dom.innerText = attrs.innerText;
			if (attr === "innerHTML") return dom.innerHTML = attrs.innerHTML;
			if (attr === "textContent") return dom.textContent = attrs.textContent;
			if (attr === "onscroll") return dom.onscroll = attrs.onscroll;
			if (attr === "onload") return dom.onload = attrs.onload;
			if (attr === "onready") return dom.onreadystatechange = attrs.onready;
			if (attr === "onclick") return dom.onclick = attrs.onclick;
			if (attr === "onkeyup") return dom.onkeyup = attrs.onkeyup;
			if (attr === "onchange") return dom.onchange = attrs.onchange;

			if (attr === "onchange") return dom.onchange = attrs.onchange;
			if (attr === "ondragenter") return dom.ondragenter = attrs.ondragenter;
			if (attr === "ondragover") return dom.ondragover = attrs.ondragover;
			if (attr === "ondragleave") return dom.ondragleave = attrs.ondragleave;
			if (attr === "ondrop") return dom.ondrop = attrs.ondrop;

			if (attr === "onkeydown") return dom.onkeydown = attrs.onkeydown;
			if (attr === "onkeypress") return dom.onkeypress = attrs.onkeypress;
			if (attr === "oninput") return dom.oninput = attrs.oninput;
			if (attr === "onfocus") return dom.onfocus = attrs.onfocus;
			if (attr === "onblur") return dom.onblur = attrs.onblur;
			if (attr === "href") return dom.href = attrs.href;
			if (attr === "alt") return dom.alt = attrs.alt;
			if (attr === "src") return dom.src = attrs.src;
			if (attr === "file") return dom.file = attrs.file;
			if (attr === "placeholder") return dom.placeholder = attrs.placeholder;
			if (attr === "style") return Object.keys(attrs.style).forEach($1 => dom.style[$1] = attrs.style[$1]);
			if (attr === "bgcolor") return dom.style["background-color"] = attrs.bgcolor;
			if (attr === "set") return Object.keys(attrs.set).forEach($1 => dom.setAttribute($1, attrs.set[$1]));
			if (attr === "lazyload") {
				dom.classList.add('lazyload')
				dom.classList.add('loading')
				dom.setAttribute('data-src', attrs.lazyload);
				lazyloadObserver.observe(dom);
				return;
			};
			if (attr === "checked") return dom.checked = attrs.checked;
			if (attr === "selected") return dom.selected = attrs.selected;
			dom.setAttribute(attr, attrs[attr]);
		})
	};
	if (children != null) {
		if (children.length > 0) children.forEach(child => {
			if (child === null) return;
			if (typeof (child) == "object") return dom.appendChild(child);
			dom.innerHTML += child;
		});
	};
	return dom;
};

// function tableSort(elm) {
//   var elmOld = elm.parentElement.querySelector('th.asc,th.desc');
//   if (elm === elmOld) {
//     if (elm.classList.contains('asc')) {
//       elm.classList.remove('asc');
//       elm.classList.add('desc');
//     } else if (elm.classList.contains('desc')) {
//       elm.classList.remove('desc');
//     } else {
//       elm.classList.add('asc');
//       elm.classList.remove('desc');
//     }
//   } else if (elmOld) {
//     elmOld.classList.remove('asc');
//     elmOld.classList.remove('desc');
//     elm.classList.add('asc');
//   } else {
//     elm.classList.add('asc');
//   }
// };

// (function(){
//   var elmThAll = document.querySelectorAll('th');
//   elmThAll.forEach((elm, index) => {
//     var last = (elmThAll.length - 1);
//     if (index != last) elm.onclick = function () {
//       tableSort(this)
//     };
//   })
// }());