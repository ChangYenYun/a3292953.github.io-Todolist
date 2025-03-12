// 取得股票資料
function fetchStockData() {
    const symbol = document.getElementById('symbol').value; // 取得使用者所輸入的股票代號
    
    // 發送 api 請求
    const url = `http://localhost:8080/api/stock/symbol/${symbol}`;
    fetch(url)
        .then(response => {
            console.log(response.status);
            return response.json();
        }) // 將回應資料解析為 json 格式
        .then(data => {
            console.log(data);
            // 取得表格的 <tbody> 元素
            const tableBody = document.querySelector('#stockTable tbody');
            
            // 清空現有表格資料
            tableBody.innerHTML = '';
            
            // 若沒有資料顯示"無資料"
            if(data.length === 0) {
                const noDataRow = document.createElement('tr');
                noDataRow.innerHTML = '<td colspan="9">無資料</td>';
                tableBody.appendChild(noDataRow);
                return;
            }
            
            // 遍歷回傳的資料並將其添加到表格
            data.forEach(stock => {
                // 創建一列
                const row = document.createElement('tr');
                
                // 創建並填充每一個欄位
                row.innerHTML = `
                    <td>${stock.date}</td>
                    <td>${stock.symbol}</td>
                    <td>${stock.name}</td>
                    <td>${stock.price}</td>
                    <td>${stock.yield}</td>
                    <td>${stock.year}</td>
                    <td>${stock.pe}</td>
                    <td>${stock.pb}</td>
                    <td>${stock.period}</td>
                `;
                
                // 將 row 添加在表格中
                tableBody.appendChild(row);
            });
            
            // 繪圖
            drawPriceChart(data);
            drawYieldChart(data);
            drawPEChart(data);
            drawPBChart(data);
            
            // 產生給 AI 的詢問資訊
            //var ask = '請問這檔股票是否值得投資?';
            var ask = '請試著預估這檔股票的明日價格為何?一定要給我一個數字參考 !';
            data.forEach(stock => {
                ask += `
                    日期: ${stock.date},
                    股票代號: ${stock.symbol},
                    股票名稱: ${stock.name},
                    收盤價: ${stock.price},
                    本益比(PE): ${stock.pe},
                    股價淨值比(PB): ${stock.pb},
                    殖利率: ${stock.yield}
                    `;
            });
            document.getElementById('question').innerHTML = ask;
        })
        .catch(error => {
            alert('無法載入資料: ' + error);
        });
    
}

google.charts.load('current', {'packages':['corechart', 'line']});
			
function drawPriceChart(data) {
    var dataArray = [['日期', '收盤價']]; // 表頭
    data.forEach(item => {
        dataArray.push([item.date, item.price]);
    });

    var data = google.visualization.arrayToDataTable(dataArray);

    var options = {
        title: '收盤價走勢',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: { title: '日期' },
        vAxis: { title: '收盤價 (Price)' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_price_chart'));
    chart.draw(data, options);
}

function drawYieldChart(data) {
    var dataArray = [['日期', '殖利率(%)']]; // 表頭
    data.forEach(item => {
        dataArray.push([item.date, item.yield]);
    });

    var data = google.visualization.arrayToDataTable(dataArray);

    var options = {
        title: '殖利率(%)走勢',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: { title: '日期' },
        vAxis: { title: '殖利率(%) (Yield)' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_yield_chart'));
    chart.draw(data, options);
}

function drawPEChart(data) {
    var dataArray = [['日期', '本益比']]; // 表頭
    data.forEach(item => {
        dataArray.push([item.date, item.pe]);
    });

    var data = google.visualization.arrayToDataTable(dataArray);

    var options = {
        title: '本益比走勢',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: { title: '日期' },
        vAxis: { title: '本益比 (PE)' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_pe_chart'));
    chart.draw(data, options);
}

function drawPBChart(data) {
    var dataArray = [['日期', '股價淨值比']]; // 表頭
    data.forEach(item => {
        dataArray.push([item.date, item.pb]);
    });

    var data = google.visualization.arrayToDataTable(dataArray);

    var options = {
        title: '股價淨值走勢',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: { title: '日期' },
        vAxis: { title: '股價淨值 (PB)' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_pb_chart'));
    chart.draw(data, options);
}

// symbol 輸入框按下 enter 就可以查詢
document.getElementById('symbol').addEventListener('keydown', function(event) {
    if(event.key === 'Enter') { // 當 enter 按下時觸發
        fetchStockData();
    }
});

function copy() {
    const questionText = document.getElementById('question').textContent;
    // 利用 Clipboard API 來複製文字
    navigator.clipboard.writeText(questionText).then(function(){
        alert('複製成功');
    });
}