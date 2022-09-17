var tableHeads = {
  name				: "品名",
  product_code: "內部編碼",
  ean		      : "商品編碼",
  price				: "價格",
  size				: "尺寸",
  color       : "顏色",
  length      : "長度",
  width       : "寬度", 
  height      : "高度", 
  weight      : "重量", 
  total       : "數量", 
  image       : "圖片", 
  dismiss     : "狀態",
  action      : "動作"
};

(function(){
  var url 			= new URL(location.href);
  var sort 			= String(url.searchParams.get('sort'));
  var sortHead 	= (sort) ? String(sort.split('-')[0]) : null;
  var sortOrder = (sort) ? String(sort.split('-')[1]) : null;

  /**
   * 調整假資料順序
   */
  (function(){
    if (!sort) return;
    dbPriductResults = dbPriductResults.sort((a, b) => {
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
  }());

  /**
   * 插入Head
   */
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
    document.getElementById('product-list').children[0].appendChild(elmRow);
  }());

  /**
   * 插入Data
   */
  (function(){
    dbPriductResults.forEach(($1, i) => {
      var elmRow = document.createElement('tr');
      Object.keys(tableHeads).forEach(($2, j) => {
        var elmData = document.createElement('td');
        var elmI = document.createElement('i');
        if ($2 === "total") {
          var elmAdd = document.createElement('button');
          elmAdd.innerText = "補貨";
          elmAdd.onclick = function(){
            alert('補貨');
          };
          if ($1[$2]) {
            elmData.innerHTML = $1[$2];
          } else {
            elmData.appendChild(elmAdd);
          };
        } else if ($2 === "image") {
          if ($1[$2]) {
            var elmI    = document.createElement('i');
            elmI.className = "fas fa-upload";
            elmData.className = "btn";
            elmData.appendChild(elmI);
            elmData.innerHTML += $1[$2];
            elmData.onclick = function(){
              alert('上傳');
            };
          } else {
            var elmAdd  = document.createElement('button');
            elmAdd.innerText = "上傳"
            elmData.appendChild(elmAdd);
            elmData.onclick = function(){
              alert('上傳');
            };
          };
        } else if ($2 === "dismiss") {
          elmData.innerHTML = "販售中";
          if (!$1.total)   elmData.innerHTML = "已缺貨";
          if ($1.dismiss)  elmData.innerHTML = "已下架";
        } else if ($2 === "action") {
          var elmPreview 	= document.createElement('button');
          var elmEdit 	  = document.createElement('button');
          var elmEnd 			= document.createElement('button');
          var elmRecover 	= document.createElement('button');
          elmPreview.innerText = "預覽";
          elmPreview.onclick = function(){
            alert('預覽');
          };
          elmEdit.innerText = "編輯";
          elmEdit.onclick = function(){
            alert('編輯');
          };
          elmEnd.className = "offline";
          elmEnd.innerText = "下架";
          elmEnd.onclick = function(){
            alert('下架');
          };
          elmRecover.innerText = "重新上架";
          elmRecover.onclick = function(){
            alert('重新上架');
          };
          elmData.appendChild(elmPreview);
          elmData.appendChild(elmEdit);
          elmData.appendChild($1.dismiss ? elmRecover : elmEnd);
        } else {
          elmData.innerHTML += $1[$2];
        }

        elmRow.appendChild(elmData);
      });

      if (!$1.total) elmRow.className = "report";
      if ($1.dismiss) elmRow.className = "offline";

      document.getElementById('product-list').children[1].appendChild(elmRow);
    });
  }());
}());