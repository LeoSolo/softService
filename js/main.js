'use strict';

document.addEventListener("DOMContentLoaded", function(e) {
    main.getData();
});

var main = {
    balance: 0,
    final: 15,      // чтобы было понятно откуда 15(конечный результат)
    getData: function(){     // берем баланс с сервера
      $.ajax({
          url: 'http://alex.devel.softservice.org/testapi/',
          type: 'GET',
          error: function(){
              console.log('connect error');
          },
          success: function(res){
              main.balance = res.balance_usd;
              main.setBalance();
              main.startProgress();
          }
      });
    },
    setBalance: function(){     // выставляем баланс
        var percent = Math.floor(main.balance/(main.final/100));

        $('.progressBar div').css({width: percent+'%'});
        $('.progressBar span').html('$'+main.balance);

        if(main.balance == main.final){
            $('.infoBlock').css({boxShadow: '0 -60px 90px -40px #00A910 inset'});
            $('.info').css({opacity:0});
        }

    },
    startProgress: function(){      // старт прогресса
        progressInterval = setInterval(function(){
            if(main.balance < main.final){
                main.balance += 0.2;
                main.balance = Number(main.balance.toFixed(1));
                main.setBalance();
            }else{
                clearInterval(progressInterval);
            }
        },2000)
    }
};

var progressInterval;