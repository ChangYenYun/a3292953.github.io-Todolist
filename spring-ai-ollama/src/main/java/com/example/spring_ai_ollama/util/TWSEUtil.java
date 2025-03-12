package com.example.spring_ai_ollama.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

public class TWSEUtil {
    
    public static List<List<Object>> getData(String date) throws Exception {
        // json url
        String jsonUrlString = "https://www.twse.com.tw/rwd/zh/afterTrading/BWIBBU_d?response=json&date=" + date;

        // 建立 URL 物件
        URL url = new URL(jsonUrlString);

        // 建立連線
        HttpURLConnection connection = (HttpURLConnection)url.openConnection();
        connection.setRequestMethod("GET");

        // 讀取 json 資料
        // connection.getInputStream() 得到 bytes 串流
        // InputStreamReader 將 bytes 串流轉 chars 串流
        // BufferedReader 將 chars 串流放到記憶體中方便 java 可以逐行讀取提高效率
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));

        String inputLine; // 用來存放每一筆所讀取的資料
        StringBuilder response = new StringBuilder(); // 將每一筆逐行資料累積起來

        // 讀到 null 表示檔尾(讀取完畢)
        while ((inputLine = reader.readLine()) != null) {
            response.append(inputLine); // 逐筆將資料新增到 response 字串物件中
        }
        reader.close();

        String jsonString = response.toString();

        Gson gson = new Gson();

        Map<String, Object> jsonMap = gson.fromJson(jsonString, Map.class);

        // 取得 total 數字
        double total = Double.parseDouble(jsonMap.get("total") + "");
        
        return total > 0 ? (List<List<Object>>)jsonMap.get("data") : null;
    }

    public static List<Object> getDataBySymbol(String date, String symbol) throws Exception {
        List<List<Object>> data = getData(date);
        return data.stream()
                   .filter(row -> row.get(0).toString().equals(symbol))
                   .findFirst()
                   .orElseThrow();
    }

    public static void main(String[] args) throws Exception {
        //System.out.println(getData("20250308"));
        //System.out.println(getData("20250307"));
        System.out.println("[證券代號, 證券名稱, 收盤價, 殖利率(%), 股利年度, 本益比, 股價淨值比, 財報年/季]");
        /* 
        String symbol = "2317";
        for(int i = 20250303; i<20250308; i++){
            List<Object> data = getDataBySymbol(i+"", symbol);
            System.out.println(i+"" + data);
            Thread.sleep(1000);
        }
        */
        // 過濾出殖利率(r) > 7%, 15 < 本益比(pe) > 20, 股價淨值比(pb) < 1
        List<List<Object>> data = getData("20250307");
        data.forEach(row -> {
            try {
                Double r = Double.parseDouble(row.get(3)+"");
                Double pe = Double.parseDouble(row.get(5)+"");
                Double pb = Double.parseDouble(row.get(6)+"");
    
                if(r > 7 && (pe > 15 && pe < 25) && pb < 1  ){
                        System.out.println(row);
                }
            } catch (Exception e) {
              
            }
           
            
        });
        
      
        
    }

}