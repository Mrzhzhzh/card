//app.js
//
//
//hello zh!//
import { Token } from 'utils/token.js';
App({
  onLaunch: function () {
    var token = new Token();
    /*token.verify();*/

  },
  globalData: {
    thirdapp_id:1,
    paginate: {
        count: 0,
        currentPage:1,
        pagesize:10,
        is_page:true,
       
    },
    
  },
})