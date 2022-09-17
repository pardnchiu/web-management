var tableHeads = {
  id					: "編號",
  name				: "姓名",
  id_number		: "身分證字號",
  phone				: "電話",
  email				: "信箱",
  email_verify: "信箱驗證",
  sex					: "性別",
  address			: "地址",
  birthday		: "生日",
  signup			: "註冊日", 
  expire			: "到期日", 
  ad					: "廣告",
  dismiss		  : "狀態",  
  action			: "動作"
};

(function(){
  var url 			= new URL(location.href);
  var sort 			= String(url.searchParams.get('sort'));
  var sortHead 	= (sort) ? String(sort.split('-')[0]) : null;
  var sortOrder = (sort) ? String(sort.split('-')[1]) : null;

  if (sort) {
    dbUserResults = dbUserResults.sort((a, b) => {
      var targetA = String(a[sortHead]);
      var targetB = String(b[sortHead]);
      var isAsc 	= Boolean(sortOrder === "asc");
      var isGreat = Boolean(targetA < targetB);
      var isLess  = Boolean(targetA > targetB);

      if (isAsc && isGreat) 	return -1;
      if (isAsc && isLess) 		return 1;
      if (!isAsc && isGreat) 	return 1;
      if (!isAsc && isLess) 	return -1;
      return 0;
    });
  };

  (function(){
    var elmRow 	= document.createElement('tr');
    Object.keys(tableHeads).forEach(($1, i) => {
      var isOrder = Boolean(sortHead === $1);
      var isLast 	= Boolean(i === (Object.keys(tableHeads).length - 1));
      var elmHead = document.createElement('th');
      var elmI 		= document.createElement('i');

      if (isOrder) elmHead.className = sortOrder;
      elmHead.innerHTML = tableHeads[$1];
      if (!isLast) elmHead.onclick = function(){
        if (!sortOrder || !isOrder) 				  url.searchParams.set('sort', `${$1}-desc`);
        if (isOrder && sortOrder === 'desc') 	url.searchParams.set('sort', `${$1}-asc`);
        if (isOrder && sortOrder === 'asc') 	url.searchParams.delete('sort');
        location.href = url;
      }

      elmI.className = "fas fa-caret-up";
      if (!isLast) elmHead.appendChild(elmI);

      elmRow.appendChild(elmHead);
    });
    document.getElementById('user-list').children[0].appendChild(elmRow);
  }());
  
  (function(){
    dbUserResults.forEach(($1, i) => {
      var elmRow = document.createElement('tr');
      Object.keys(tableHeads).forEach(($2, j) => {
        var elmData = document.createElement('td');
        var elmI = document.createElement('i');
        if ($2 === "phone") {
          elmI.className = "fas fa-mobile";
          elmData.className = "btn";
          elmData.onclick = function(){
            if (confirm('撥打電話?')) window.open(`tel:${$1[$2]}`, '_self');
          };
          elmData.appendChild(elmI);
        } else if ($2 === "email") {
          elmI.className = "fas fa-envelope";
          elmData.className = "btn";
          elmData.onclick = function(){
            if (confirm('打開郵件?')) window.open(`mailto:${$1[$2]}`, '_self');
          };
          elmData.appendChild(elmI);
        } else if ($2 === "address") {
          elmI.className = "fas fa-map-marker-alt";
          elmData.className = "btn";
          elmData.onclick = function(){
            if (confirm('打開地圖?')) window.open(`https://www.google.com/maps?q=${$1[$2]}`, '_blank');
          };
          elmData.appendChild(elmI);
        };
        if ($2 === "email_verify") {
          elmData.innerHTML = $1[$2] ? "已驗證" : "";
        } else if ($2 === "sex") {
          if ($1[$2] === 1) elmData.innerHTML = "男";
          if ($1[$2] === 2) elmData.innerHTML = "女";
        } else if ($2 === "dismiss") {
          elmData.innerHTML = "有效";
          if ($1.is_expired) elmData.innerHTML = "已過期";
          if ($1.dismiss) elmData.innerHTML = "已停權";
        } else if ($2 === "ad") {
          elmData.innerHTML = $1.is_ad ? "允許" : "";
        } else if ($2 === "action") {
          var elmEdit 		= document.createElement('button');
          var elmReport 	= document.createElement('button');
          var elmEnd 			= document.createElement('button');
          var elmRecover 	= document.createElement('button');
          elmEdit.innerText = "編輯";
          elmEdit.onclick = function(){
            alert('編輯');
          };
          elmReport.innerText = "通知";
          elmReport.onclick = function(){
            alert('通知');
          };
          elmEnd.className = "offline";
          elmEnd.innerText = "停權";
          elmEnd.onclick = function(){
            alert('停權');
          };
          elmRecover.innerText = "恢復";
          elmEnd.onclick = function(){
            alert('恢復');
          };
          elmData.appendChild(elmEdit);
          if ($1.is_expired) elmData.appendChild(elmReport)
          elmData.appendChild($1.dismiss ? elmRecover : elmEnd);
        } else {
          elmData.innerHTML += $1[$2];
        }

        elmRow.appendChild(elmData);
      });

      if ($1.is_expired) elmRow.className = "report";
      if ($1.dismiss) elmRow.className = "offline";

      document.getElementById('user-list').children[1].appendChild(elmRow);
    });
  }());

}());