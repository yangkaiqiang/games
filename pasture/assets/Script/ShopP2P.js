const Data = require("Data");
const Func = Data.func;

cc.Class({
  extends: cc.Component,

  properties: {
    target: {
      default: null,
      type: cc.Prefab
    },
    //商品
    goods_Prefab: {
      default: null,
      type: cc.Prefab
    },
    //可上下架商品
    goods2_Prefab: {
      default: null,
      type: cc.Prefab
    },
    pageIndex: 1,
    hasLoad: 1,
    pageSize: 9,
    WholeCount: 0,
    goodsType: 1,
    projectList: []
  },
  goodsListNode: null,
  fillterListNode: null,
  onLoad() {
    let self = this;
    //商品类型 1全部  2我的商品 3鸡蛋 4 贵妃鸡
    self.fillterClickEvent();
    self.goodsType = Config.shopP2P;
    self.initfillterButton(self.goodsType);
    self.getInitIndicatorInIt(0, 9, self.goodsType);
  },
  start() {
    let self = this;
  },
  //筛选按钮自定义模态弹框
  fillterClickEvent() {
    let self = this;
    self.fillterButton = cc.find("bg/mygoods", self.node);
    self.fillterButton.on("click", event => {
      Alert.show("0", null, null, null, null, null, "Prefab/Modal/Shop/filterGoods", function() {
        let selfAlert = this;
        cc.loader.loadRes(Alert._newPrefabUrl, cc.Prefab, function(error, prefab) {
          if (error) {
            cc.error(error);
            return;
          }
          // 实例
          let alert = cc.instantiate(prefab);
          Alert._alert = alert;
          //动画
          selfAlert.ready();
          Alert._alert.parent = cc.find("Canvas");
          selfAlert.startFadeIn();
          selfAlert.newButtonEvent(alert, "close");
          //绑定四个筛选按钮的筛选事件
          self.bindClickEvent(cc.find("alertBackground/scrollview/view/content/item1", alert));
          self.bindClickEvent(cc.find("alertBackground/scrollview/view/content/item2", alert));
          self.bindClickEvent(cc.find("alertBackground/scrollview/view/content/item3", alert));
          self.bindClickEvent(cc.find("alertBackground/scrollview/view/content/item4", alert));
        });
      });
    });
  },
  //筛选按钮事件绑定
  bindClickEvent(obj) {
    let self = this;
    obj.on("click", function() {
      Config.shopP2P = Number(obj._name.slice(4));
      cc.director.loadScene("shopP2P");
    });
  },

  //初始化筛选按钮
  initfillterButton(type) {
    let self = this;
    let buttonVal = cc.find("bg/mygoods/text", self.node).getComponent(cc.Label);
    switch (type) {
      case 1:
        buttonVal.string = "全部商品";
        break;
      case 2:
        buttonVal.string = "我的商品";
        break;
      case 3:
        buttonVal.string = "鸡蛋";
        break;
      case 4:
        buttonVal.string = "贵妃鸡";
        break;
    }
  },
  //渲染商品数据
  dataFetch(index, size, data, type) {
    var self = this;
    const goodsList = data.List;
    let box = cc.find("bg/PageView/view/content", this.node);
    let goodsListNode = cc.find("page_" + index + "/goodsList", box);
    for (let i = 0; i < goodsList.length; i++) {
      const goods = goodsList[i];
      let goodsNode, onSell, goodSprite, goodsLabel, priceLabel, count, clicknode;

      if (type == 2) {
        goodsNode = cc.instantiate(this.goods2_Prefab);
        clicknode = cc.find("xia", goodsNode);
        onSell = cc.find("xia/text", goodsNode);
        onSell.getComponent(cc.Label).string = "下架";
        //绑定我的商品的 点击事件
        self.bindSellEvent(clicknode, goods.OffType, goods.ID);
      } else {
        // goodsNode = cc.instantiate(self.goods2_Prefab);
        //绑定其余的购买商品的点击事件
        goodsNode = self.bindGoodsEvent(type, goods);
      }
      goodSprite = cc.find("pic-box/pic", goodsNode).getComponent(cc.Sprite);
      goodsLabel = cc.find("price-box/goods_label", goodsNode).getComponent(cc.Label);
      priceLabel = cc.find("price-box/bg-price/price", goodsNode).getComponent(cc.Label);
      count = 1;
      //渲染商品列表
      switch (goods.Type) {
        case 1:
          cc.loader.loadRes("Shop/guifeiji", cc.SpriteFrame, function(err, spriteFrame) {
            goodSprite.spriteFrame = spriteFrame;
          });
          goodsLabel.string = "贵妃鸡" + "x" + goods.NowCount;
          break;
        case 2:
          cc.loader.loadRes("Shop/icon-egg", cc.SpriteFrame, function(err, spriteFrame) {
            goodSprite.spriteFrame = spriteFrame;
          });
          goodsLabel.string = "鸡蛋" + "x" + goods.NowCount;
          break;
      }

      priceLabel.string = goods.NowALLRanchMoney;
      goodsListNode.addChild(goodsNode);
    }
  },

  //下架事件
  bindSellEvent(obj, e, playerid) {
    obj.on("click", event => {
      Func.OffShelf(playerid).then(data => {
        if (data.Code === 1) {
          Msg.show("下架成功");
          setTimeout(function() {
            cc.director.loadScene("shopP2P");
          }, 1000);
        } else {
          Msg.show(data.Message);
        }
      });
    });
  },

  //商品事件绑定
  bindGoodsEvent(type, data) {
    var self = this;
    let goods;
    //选择预置资源类型
    goods = cc.instantiate(this.goods_Prefab);
    goods.on("click", event => {
      Alert.show("0", null, null, null, null, null, "Prefab/Sell", function() {
        let selfAlert = this;
        cc.loader.loadRes(Alert._newPrefabUrl, cc.Prefab, function(error, prefab) {
          if (error) {
            cc.error(error);
            return;
          }
          // 实例
          let alert = cc.instantiate(prefab);
          Alert._alert = alert;
          //动画
          selfAlert.ready();
          Alert._alert.parent = cc.find("Canvas");
          selfAlert.startFadeIn();
          // 关闭按钮
          selfAlert.newButtonEvent(alert, "bg/btn-group/cancelButton");
          self.P2PBuyData(alert, data);
        });
      });
    });
    return goods;
  },
  //初始化轮播分页
  getInitIndicator(index, size, data, type) {
    var self = this;
    self.WholeCount = data.RecordCount;
    let box = cc.find("bg/PageView/view/content", this.node);
    let boxTemp = cc.find("bg/PageView", this.node).getComponent(cc.PageView); //获取pageView组件
    for (let i = 0; i < Math.ceil(self.WholeCount / self.pageSize); i++) {
      let clone = cc.instantiate(this.target);
      clone._name = "page_" + i;

      boxTemp.addPage(clone); //动态添加页面
    }
    self.dataFetch(index, size, data, type);
    boxTemp.node.on("page-turning", function() {
      let goodsListNode = cc.find("page_" + boxTemp.getCurrentPageIndex(), box);
      let indexNum = boxTemp.getCurrentPageIndex();
      let diff = indexNum - self.hasLoad;
      if (diff == 0) {
        self.hasLoad++;
        self.getList(indexNum, 9, self.goodsType);
      }
    });
  },
  //切换数据接口，用于初始化轮播导航
  getInitIndicatorInIt(index, size, e) {
    let self = this;
    if (e == 1) {
      Func.GetSellList(0, index + 1, size).then(data => {
        self.getInitIndicator(index, size, data, e);
      });
    } else if (e == 2) {
      Func.GetShelvesList(index + 1, size).then(data => {
        self.getInitIndicator(index, size, data, e);
      });
    } else if (e == 3) {
      Func.GetSellList(2, index + 1, size).then(data => {
        self.getInitIndicator(index, size, data, e);
      });
    } else if (e == 4) {
      Func.GetSellList(1, index + 1, size).then(data => {
        self.getInitIndicator(index, size, data, e);
      });
    }
  },
  //切换数据接口，用于数据列表
  getList(index, size, e) {
    let self = this;
    if (e == 1) {
      Func.GetSellList(0, index + 1, size).then(data => {
        self.dataFetch(index, size, data, e);
      });
    } else if (e == 2) {
      Func.GetShelvesList(index + 1, size).then(data => {
        self.dataFetch(index, size, data, e);
      });
    } else if (e == 3) {
      Func.GetSellList(2, index + 1, size).then(data => {
        self.dataFetch(index, size, data, e);
      });
    } else if (e == 4) {
      Func.GetSellList(1, index + 1, size).then(data => {
        self.dataFetch(index, size, data, e);
      });
    }
  },
  //购买商品模态框数据绑定
  P2PBuyData(obj, data) {
    //初始总价
    let sumMoney = cc.find("bg/money/value", obj).getComponent(cc.Label);
    let editBox = cc.find("bg/input", obj);
    let value = cc.find("bg/money/value", obj);
    let confirm = cc.find("bg/btn-group/enterButton", obj);
    let valueComp = cc.find("bg/money/value", obj).getComponent(cc.Label);
    let icon = cc.find("guifeiji", obj).getComponent(cc.Sprite);
    let title = cc.find("bg/name", obj).getComponent(cc.Label);
    let count = 1;
    switch (data.Type) {
      case 1: {
        cc.loader.loadRes("Shop/guifeiji__", cc.SpriteFrame, function(err, spriteFrame) {
          icon.spriteFrame = spriteFrame;
        });
        title.string = "贵妃鸡";
        break;
      }
      case 2: {
        cc.loader.loadRes("Shop/icon-egg__", cc.SpriteFrame, function(err, spriteFrame) {
          icon.spriteFrame = spriteFrame;
        });
        title.string = "鸡蛋";
        break;
      }
    }
    valueComp.string = data.NowALLRanchMoney;
    //绑定input变化事件
    editBox.on("text-changed", () => {
      count = Number(editBox.getComponent(cc.EditBox).string);
      valueComp.string = data.NowALLRanchMoney * count;
    });
    //商品购买事件
    confirm.on("click", () => {
      if (count > data.NowCount) {
        Msg.show("您输入的数量不能大于" + data.NowCount);
        return;
      }
      Func.PostBuyP2P(data.ID, count).then(data => {
        if (data.Code === 1) {
          Msg.show("购买成功");
          setTimeout(function() {
            cc.director.loadScene("shopP2P");
          }, 1000);
        } else {
          Msg.show(data.Message);
        }
      });
    });
  },
  //返回
  backEvent() {
    cc.director.loadScene("index");
  },
  //切换系统商城
  gotoPage() {
    cc.director.loadScene("shop");
  }

  // update (dt) {},
});
