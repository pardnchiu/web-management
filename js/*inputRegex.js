(function(){
  var elms = document.querySelectorAll('input[regex="1"]');
  elms.forEach((elm) => {
    elm.onchange = function(){
      if (this.value) this.classList.add("unempty");
      else this.classList.remove("unempty");
    };
    elm.oninput = function(){
      var elmHint = this.parentElement.lastElementChild;
      var disableZh = this.getAttribute('zh') ? !Number(this.getAttribute('zh')) : false;
      var disableEn = this.getAttribute('en') ? !Number(this.getAttribute('en')) : false;
      var disableNum = this.getAttribute('num') ? !Number(this.getAttribute('num')) : false;
      var disableSpace = this.getAttribute('space') ? !Number(this.getAttribute('space')) : false;
      var disableSymbol = this.getAttribute('symbol') ? !Number(this.getAttribute('symbol')) : false;
      if (disableZh && /[\u4e00-\u9fa5\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]{1,}/.test(this.value)) return (
        this.parentElement.classList.add('report'),
        elmHint.classList.add('show'),
        elmHint.innerText = "不允許中文"
      );
      if (disableEn && /[A-Za-z]{1,}/.test(this.value)) return (
        this.parentElement.classList.add('report'),
        elmHint.classList.add('show'),
        elmHint.innerText = "不允許英文"
      );
      if (disableNum && /[0-9]{1,}/.test(this.value)) return (
        this.parentElement.classList.add('report'),
        elmHint.classList.add('show'),
        elmHint.innerText = "不允許數字"
      );
      if (disableSpace && /[\s]{1,}/.test(this.value)) return (
        this.parentElement.classList.add('report'),
        elmHint.classList.add('show'),
        elmHint.innerText = "不允許空格"
      );
      if (disableSymbol && /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~.]{1,}/.test(this.value)) return (
        this.parentElement.classList.add('report'),
        elmHint.classList.add('show'),
        elmHint.innerText = "不允許符號"
      );
      this.parentElement.classList.remove('report');
      elmHint.classList.remove('show');
      elmHint.innerText = "";

    };
    elm.onblur = function(){
      var elmHint = this.parentElement.lastElementChild;
      var isIdCard = this.getAttribute('idCard') ? Number(this.getAttribute('idCard')) : false;
      var isEmail = this.getAttribute('email') ? Number(this.getAttribute('email')) : false;
      if (!this.value.replace(/\s/g, '')) return this.value = "";
      if (isIdCard && !/^[A-Za-z]{1}[0-9]{9}$/.test(this.value)) return (
        this.parentElement.classList.add('report'),
        elmHint.classList.add('show'),
        elmHint.innerText = "身分證格式有誤"
      );
      if (isEmail && !/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(this.value)) return (
        this.parentElement.classList.add('report'),
        elmHint.classList.add('show'),
        elmHint.innerText = "信箱格式有誤"
      );
    };
  })
}());

(function(){
  var elms = document.querySelectorAll('select');
  elms.forEach((elm) => {
    elm.onchange = function(){
      this.style["color"] = Number(this.value) ? "var(--col-system)" : "#aaa"
    }
  });
}());