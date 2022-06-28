

$(function () {

    init();
})

let init = function () {

    login.init();
    $(".join_btn").on('click', function () {
        if (login.state) {
            alert("로그인 상태입니다. 로그아웃 후 회원가입이 가능합니다.");
        }
        else movepage("/Board/JoinView");
    });

    $(".createFeed_btn").on('click', function () {
        if (!login.state) {
            alert("로그아웃 상태입니다. 로그인 후 글쓰기가 가능합니다.");
        }
        else movepage("/Board/CreateView");
    });

    info.init();

    header.title = _title;
    header.init();
}

let board = {
    title: "제목",
    totalRowCount: 200,//전체 글의 수
    nowRowCount: 0, //현재 표시중인 글의 수
    setRowCount: 0, //현재 표시중인 글의 수
    rowSize: 5,// 한 번에 표시할 글의 수
    searchvalue: "",
    searchcolum: "",
    order: "IDX",
    isDesc: "y",
    init: function () {
        this.nowRowCount = 0;
        this.setRowCount = this.getSetRowCount();
        refresh();
    },
    refresh: function() {
        this.getlist();
    },
    getSetRowCount: function () {
        let rowCount = this.nowRowCount + this.rowSize;
        if (rowCount > this.totalRowCount) rowCount = this.totalRowCount;
        return rowCount;
    },
    getPage: function () {
        let rowCount = this.nowRowCount + this.rowSize;
        if (rowCount > this.totalRowCount) rowCount = this.totalRowCount;
        return rowCount;
    },
    setCountView: function () {
        $("#feed_count span").text(this.total);
    },
    setBoardView: function () {
        $(".table_box").html("");
        $(".table_box").append('<div class="tr table_head"></div>');
        $(".table_head").append('<div onclick="clickOrder(this)" orderName="IDX" isdesc ="y">번호<div>');
        $(".table_head").append('<div onclick="clickOrder(this)" orderName="TITLE" isdesc ="n">제목<div>');
        $(".table_head").append('<div>작성자<div>');
        $(".table_head").append('<div onclick="clickOrder(this)" orderName="IDX" isdesc ="y">작성일<div>');
    },
    setBoardBodyView: function (json) {
        let num = 0;

        $.each(obj, function (idx, item) {
            let num = 0;
            $(".table_box").append('<div class="tr"><div>' + num.toString() + '</div onclick="window.location.href = \'/Board/ReadView/?board_id=' + item["IDX"] + '\'">' + item["TITLE"] + '</div><div>' + item["USERNM"] + '</div><div>' + item["REGDATESTRING"] + '</div></div>');
        });
    },
    getBoardData: function () {
        var params = {
            now: this.nowRowCount,
            size: this.rowSize,
            colum: this.searchcolum,
            param: this.searchvalue,
            order: this.order,
            isDesc: this.isDesc
        }
        return param;
    },
    getlist: function () {
        let param = this.getBoardData();
        var that = this;

        $.ajax({
            type: "POST",
            url: "/Board/GetFeedList",
            data: params,            
            success: function (res) { 
                // 응답코드 > 0000
                console.log("success");
                var list = JSON.parse(res);
                console.log(list);
                that.setlist(list);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { 
                alert("통신 실패.");
            }
        });
    },
    setlist: function (obj) {
        $("#board tbody").html("");
        let that = this;
        let count = 0;
        $.each(obj, function (idx, item) {
            let num = 0;
            if (that.isDesc == "y") {
                num = that.total - ((that.setpage - 1) * that.pagesize) - count;
            }
            else {
                num = ((that.setpage - 1) * that.pagesize) + count + 1;
            }
            $("#board tbody").append('<tr><td>' + num.toString() + '</td><td onclick="window.location.href = \'/Board/ReadView/?board_id=' + item["IDX"] + '\'">' + item["TITLE"] + '</td><td>' + item["REGDATESTRING"] + '</td></tr>');
            count++;
        });
        this.nowRowCount = this.setRowCount;
        this.setpagebtnlist();
    },
    search: function () {
        let colum = $("#search-dropdown").val();
        let param = $("#search-input").val();

        if (colum == "") alert("검색기준을 선택해 주세요.");
        else if (param == "") alert("검색할 내용을 입력해 주세요.");
        else {
            this.searchcolum = colum;
            this.searchvalue = param;
            this.init();
        }
    }
}

let clickOrder = function ($this) {

    console.log("click order");

    let order = $($this).attr('orderName');
    if (board.order == order) {
        let desc = $($this).attr('isdesc');
        if (desc != board.isDesc) $($this).attr('isdesc', board.isDesc);
        if (desc == "y") $($this).attr('isdesc', "n");
        else $($this).attr('isdesc', "y");
    }
    else board.order = order;
    board.isDesc = $($this).attr('isdesc');
    board.init();
}



