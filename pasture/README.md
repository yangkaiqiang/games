# hello-world
/T_Base_User/GetWholeData?openID=" + this.openID
{
    Code: 1,
    UserModel: {
        FirstLanding
        RanchMoney
        Grade
        Allfeed
    }
    RanchModel: {
        RanchCleanliness
        RanchRank
        EggCount
    }
}

/T_Base_User/GetFriendsList?openID=" + this.openID + "&orderby=Grade desc" + "&page=" + page
{
    Code: 1,
    Message: '',
    List: [{
        IsFriends;
        path;
        RealName;
        Grade;
        //排名（字段不确定）
        Row ;
        IsClean;
        IsFeed;
    }]
}

/T_Base_User/GetUserListByPage?openID=" + this.openID + "&search=" + search + "&page=" + page
{
    Code: 1,
    Message: '',
    List: [{
        IsFriends;
        path;
        RealName;
        Grade;
        OpenID;
        //排名（字段不确定）
        Row ;
        IsClean;
        IsFeed;
    }]
}

/T_Base_FriendsNotice/PostRequestFriends
{
    Code: 1,
    Message: '',
}

/T_Base_FriendsNotice/PostConfirmFriends
{

}

//通过Id获取小鸡当前的健康值及饥饿度
/T_Base_Chicken/GetModelValue
{
    Code: 1,
    Message: '',
    StarvationValue;
    HealthValue;
    Proportion;
    //判断鸡是否能收取
    CallBack;
    //给小鸡的饥饿度和健康值赋值
    Hungry
    Sick
    Status
}

//获得当月签到的记录数组
/T_Base_SignFlow/GetList?openId=" + this.openID,
{
    Code: 1,
    Message: '',
    List: [{
        IsSign
    }]
}

//获得商城的商品
/T_Base_Property/GetListByPage?page=" + index + "&size=" + size
{
    Code: 1,
    Message: '',
    List: [{
        IsDelete
        PropName
        PropValue
        ID
        RecordCount
    }]
}

//获得交易市场的商品
/T_Base_PlayerTrading/GetTradetLisByPage?type=" +type +"&page=" +index +"&pageSize=" +size
{
    Code: 1,
    Message: '',
    RecordCount;
    List: [{
        OffType
        ID
        Type
        NowCount
        NowALLRanchMoney
    }]
}

//上架列表
/T_Base_PlayerTrading/GetListByPage?openId=" +
          this.openID +
          "&type=" +
          0 +
          "&page=" +
          index +
          "&pageSize=" +
          size,
{
    Code: 1,
    Message: '',
    RecordCount;
    List: [{
        OffType
        ID
        Type
        NowCount
        NowALLRanchMoney
    }]
}

//未读好友消息数量
/T_Base_FriendsNotice/GetRecordCount?openID=" + this.openID + "&type=" + 0
{
    Code: 1,
    Model: ''
}

//获取天气信息
/Curl/Weather?page=" + index + "&pagesize=" + size
{
    data: {
        weatherdata: [{
            tem: 1
            intime: 1
            winds: 1
            windd: 1
            light: 1
            rain: 1
            pa: 1
            co2: 1
            soiltem: 1
            soilwater: 1
            ec: 1
            noi: 1
            power: 1
        }]
    }
}
