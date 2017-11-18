angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('ProductCtrl', function($scope, Products) {
  $scope.products = Products.all();//获取所有商品

})
.controller('DetailCtrl',function($scope,$stateParams,Products){
  $scope.myDetail= true;//是否隐藏商品信息框
  $scope.myNum=1;//商品初始数量
  $scope.shoplist=[];//购物车里的商品
  $scope.hasProduct=showShopCart();//购物车是否有商品
  $scope.selectAll=isSelectAll();//是否全选
  $scope.sum=calculateSum();//计算总价钱
  $scope.isEdit=false;//是否可编辑
  
  $scope.hide=function(){//隐藏商品信息框
    $scope.myDetail=true;
    $("ion-content").css({"overflow":"auto",
                          "height":"auto"});
    $scope.myNum=1;
  }
  $scope.showDetail=function($stateParams){//显示商品信息框
    $scope.myDetail= false;//显示商品信息框
    $scope.productItem=Products.get($stateParams);//获取商品
    if(isProduct($stateParams)){//如果商品已在购物车
      $scope.myNum=$scope.productItem.num;
    } 
    $("ion-content").height( $(window).height()-$("ion-header-bar").height()).css("overflow","hidden");
    $("#detail-bg").css({"top":$("ion-content").scrollTop(),
                        "height":$(window).height()-$("ion-header-bar").height()+"px"});
    $("#detail-box").css("bottom",0);
    $scope.addProduct=function(){//添加商品到购物车
      if(!isProduct($stateParams)){//如果商品不在购物车       
        $scope.shoplist.push($scope.productItem);
      }
      $scope.productItem.num=$scope.myNum;
      $scope.productItem.checked=true;
      $scope.hasProduct=showShopCart();
      $scope.sum=calculateSum();           
      $scope.hide();
    }
  }
  $scope.plus=function(){//商品信息里增加数量
    $scope.myNum++;
  }
  $scope.plus1=function($stateParams){//购物车里减少数量
    for(var i=0;i<$scope.shoplist.length;i++){
      if($scope.shoplist[i].id==$stateParams){
        $scope.shoplist[i].num++;
      }
    }
    
    $scope.sum=calculateSum();
  }
  $scope.minus1=function($stateParams){//购物车里减少数量
    for(var i=0;i<$scope.shoplist.length;i++){
      if($scope.shoplist[i].id==$stateParams){
        if($scope.shoplist[i].num>1){
          $scope.shoplist[i].num--;
                
        }
      }
      
    }
    $scope.sum=calculateSum();
    
  }
  $scope.minus=function(){//商品信息里减少数量
    if($scope.myNum>1){
      $scope.myNum--;
    }
  }
  $scope.isSelect=function($stateParams){//点击商品checkbox
      for(var i=0;i<$scope.shoplist.length;i++){
        if($scope.shoplist[i].id==$stateParams){
          $scope.shoplist[i].checked=!$scope.shoplist[i].checked;
          $scope.selectAll=isSelectAll();
          $scope.sum=calculateSum();
        }
        
      }
      
  }
  $scope.checkAll=function(){//点击全选
    if($scope.selectAll==true){
      for(var i=0;i<$scope.shoplist.length;i++){
        $scope.shoplist[i].checked=false;
        $scope.selectAll=false;
      }
    }else{
      for(var i=0;i<$scope.shoplist.length;i++){
        $scope.shoplist[i].checked=true;
        $scope.selectAll=true;
      }
    }
    $scope.sum=calculateSum();
  }
  $scope.editProduct=function(){//编辑商品
    $scope.isEdit=true;
    for(var i=0;i<$scope.shoplist.length;i++){
      $scope.shoplist[i].checked=false;
      $scope.selectAll=false;
    }
  }
  $scope.editFinish=function(){//编辑完成
    $scope.isEdit=false;
    for(var i=0;i<$scope.shoplist.length;i++){
      $scope.shoplist[i].checked=true;
      $scope.selectAll=true;
    }
    $scope.sum=calculateSum();
  }
  $scope.deleteProduct=function(){//删除产品
    for(var i=0;i<$scope.shoplist.length;i++){
      if($scope.shoplist[i].checked==true){
        $scope.shoplist.splice(i,1);
        i--;
      }
    }
    if($scope.shoplist.length==0){//如果购物车无商品
      $scope.hasProduct=false;
      $scope.isEdit=false;
    }
  }
  function calculateSum(){//计算总价
    var sum=0;
    for(var i=0;i<$scope.shoplist.length;i++){
      if($scope.shoplist[i].checked==true){
        sum+=$scope.shoplist[i].num*$scope.shoplist[i].price;
      }
    }
    return sum.toFixed(2);
  }
  function isProduct($stateParams){//商品是否在购物车里
    for(var i=0;i<$scope.shoplist.length;i++){
      if($scope.shoplist[i].id==$stateParams){
        return true;
      }
    }return false;
  }
  function showShopCart(){//是否显示购物车
    if($scope.shoplist.length>0){
      return true;
    }else{
      return false;
    }
  }
  function isSelectAll(){//是否全选
    for(var i=0;i<$scope.shoplist.length;i++){
      if($scope.shoplist[i].checked==false){
        return false;
      }
    }return true;
  }


})
.factory('Products', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var products = [{
    id: 0,
    name: '【3对6片】519粘贴式马桶垫保暖坐便套马桶圈坐便垫可反复水洗马桶套坐垫马桶贴 蓝色-3对6片',
    price: '21.80',
    image:'img/img1.jpg',
    shopName:"卡三家居专营店"
  }, {
    id: 1,
    name: '道远亮眼睛 可伸缩可折叠学习办公金属LED台灯 MT302D',
    price: '49.00',
    image:'img/img2.jpg',
    shopName:"京东自营"
  }, {
    id: 2,
    name: '【京东超市】卫龙 休闲零食 辣条 大面筋 65g/袋',
    price: '1.99',
    image:'img/img3.jpg',
    shopName:"小优食品专营店"
  }, {
    id: 3,
    name: '【京东超市】宇仔 休闲零食 素食 大刀肉 （辣条） 258g/袋（新老包装随机发货）',
    price: '6.90',
    image:'img/img4.jpg',
    shopName:"小优食品专营店"
  }, {
    id: 4,
    name: '【京东超市】港荣蒸蛋糕 饼干蛋糕 早餐零食 奶香鸡蛋糕 软面包礼盒 整箱1kg',
    price: '39.90',
    image:'img/img5.jpg',
    shopName:"小优食品专营店"
  },{
    id: 5,
    name: '帝拿 欧式全铜台灯卧室床头灯美式客厅大号台灯书房护眼简约创意婚庆台灯 T2422/A款（ 可调光  配白炽灯）',
    price: '980.00',
    image:'img/img6.jpg',
    shopName:"dinah帝拿旗舰店"
  }];

  return {
    all: function() {
      return products;
    },
    remove: function(product) {
      products.splice(products.indexOf(product), 1);
    },
    get: function(productId) {//获取商品
      for (var i = 0; i < products.length; i++) {
        if (products[i].id === parseInt(productId)) {
          return products[i];
        }
      }
      return null;
    }
  };
});

