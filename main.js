function studIdNumberIdentify(nationality, idNumber) {
	
  studIdNumber = idNumber.toUpperCase();

  //本國人
  if(nationality == 1){

    //驗證填入身分證字號長度及格式
    if(studIdNumber.length != 10){
      alert("您輸入的證號格式錯誤, 請重新輸入");
      return false;
    }

    var idHeader = "ABCDEFGHJKLMNPQRSTUVXYWZIO"; //按照轉換後權數的大小進行排序
    //這邊把身分證字號轉換成準備要對應的
    studIdNumber = (idHeader.indexOf(studIdNumber.substring(0,1))+10) +''+ studIdNumber.substr(1,9);
    //開始進行身分證數字的相乘與累加，依照順序乘上1987654321
    s = parseInt(studIdNumber.substr(0,1)) + 
    parseInt(studIdNumber.substr(1,1)) * 9 + 
    parseInt(studIdNumber.substr(2,1)) * 8 + 
    parseInt(studIdNumber.substr(3,1)) * 7 + 			
    parseInt(studIdNumber.substr(4,1)) * 6 + 
    parseInt(studIdNumber.substr(5,1)) * 5 + 
    parseInt(studIdNumber.substr(6,1)) * 4 + 
    parseInt(studIdNumber.substr(7,1)) * 3 + 
    parseInt(studIdNumber.substr(8,1)) * 2 + 
    parseInt(studIdNumber.substr(9,1));

    var checkNum1 = parseInt(studIdNumber.substr(10,1));
    //模數 - 總和/模數(10)之餘數若等於第九碼的檢查碼，則驗證成功

    var cn= 10 - s % 10;		
    if((cn==10 && checkNum1==0) || (cn!=10 && cn==checkNum1)){
      //alert("格式正確!");
      return true;
    }
    else{
      alert("您輸入的證號格式錯誤, 請重新輸入!");
      return false;
    }

  }
  //外籍生，居留證號
  else if(nationality == 2){

    //驗證填入身分證字號長度及格式
    if(studIdNumber.length != 10){
      alert("您輸入的證號格式錯誤, 請重新輸入");
      return false;
    }

    // 依據 110年1月2日 移民署 外來人口統一證號申請及換發送件須知 修正程式，分為新版跟舊版
    // 舊版AA00000000
    if (/[A-Z]{1}[A-D]{1}[0-9]{8}/.test(studIdNumber)) {
      //驗證填入身分證字號長度及格式

          //格式，用正則表示式比對第一個字母是否為英文字母
          if (isNaN(studIdNumber.substr(2, 8)) ||
              (!/^[A-Z]$/.test(studIdNumber.substr(0, 1))) ||
              (!/^[A-Z]$/.test(studIdNumber.substr(1, 1)))) {
            return  "您輸入的證號格式錯誤, 請重新輸入!";
          }

          var idHeader = "ABCDEFGHJKLMNPQRSTUVXYWZIO"; //按照轉換後權數的大小進行排序
          //這邊把身分證字號轉換成準備要對應的
          studIdNumber = (idHeader.indexOf(studIdNumber.substring(0, 1)) + 10) +
              '' + ((idHeader.indexOf(studIdNumber.substr(1, 1)) + 10) % 10) + '' + studIdNumber.substr(2, 8);
          //開始進行身分證數字的相乘與累加，依照順序乘上1987654321

          s = parseInt(studIdNumber.substr(0, 1)) +
              parseInt(studIdNumber.substr(1, 1)) * 9 +
              parseInt(studIdNumber.substr(2, 1)) * 8 +
              parseInt(studIdNumber.substr(3, 1)) * 7 +
              parseInt(studIdNumber.substr(4, 1)) * 6 +
              parseInt(studIdNumber.substr(5, 1)) * 5 +
              parseInt(studIdNumber.substr(6, 1)) * 4 +
              parseInt(studIdNumber.substr(7, 1)) * 3 +
              parseInt(studIdNumber.substr(8, 1)) * 2 +
              parseInt(studIdNumber.substr(9, 1));

          var checkNum1 = parseInt(studIdNumber.substr(10, 1));
          //模數 - 總和/模數(10)之餘數若等於第九碼的檢查碼，則驗證成功

          var cn= 10 - s % 10;  
      if((cn==10 && checkNum1==0) || (cn!=10 && cn==checkNum1))
      {
        return "";
      }
      else
      {
        return "您輸入的證號格式錯誤, 請重新輸入!";
      }
    // 新版A800000000
    } else if(/[A-Z]{1}[0-9]{9}/.test(studIdNumber)) {
      var idHeader = "ABCDEFGHJKLMNPQRSTUVXYWZIO"; //按照轉換後權數的大小進行排序
      var checkNum1 = parseInt(studIdNumber.substr(9,1));
      studIdNumber = (idHeader.indexOf(studIdNumber.substring(0,1))+10) + 
       + '' + studIdNumber.substr(1,8);

      let multiplyNum = [1,9,8,7,6,5,4,3,2,1];
      var checkNum = 0;
      for(var i = 0; i <= 9; i++) {
        var baseNum = studIdNumber.substr(i,1) * multiplyNum[i];
        if(baseNum >= 10) {
          baseNum = '' + baseNum;
          baseNum = parseInt(baseNum.substr(baseNum.length - 1));
        }
        checkNum += baseNum;
      }

      if((10 - checkNum) !== checkNum1) {
        alert("您輸入的證號格式錯誤, 請重新輸入!");
        return false;
      } else {
        return true;
      }

    }
    alert("您輸入的證號格式錯誤, 請重新輸入!");
    return false;
  }
  return false;
}
