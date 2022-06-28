$(function () {
    init();
})

let init = function () {

    login.init();


    info.init();

    header.title = _title;
    header.init();

    createfeed.userID = login.userID;
    createfeed.init();
}

let createfeed = {
    userID : '',
    init: function () {
        let that = this;
        $(".create_btn").on('click', function () {
            that.click();
        });
    },
    click: function () {
        let data = this.getInput();
        if (data.TITLE == '' || data.CONTENTS == '') {
            alert('제목과 본문을 모두 입력하세요.');
        }
        else if (login.state == false) {
            if (!login.state) {
                alert("로그아웃 상태입니다. 로그인 후 저장이 가능합니다.");
            }
        }
        else {
            this.sendCreate();
        }
    },
    getInput: function () {
        let data = new FormData($('#create_form')[0]);
        data.append('USERIDX', login.idx)
        /*let data = { TITLE: $(".title_window").val(), CONTENTS: $(".contents_window").val()}*/
        return data;
    },
    sendCreate: function () {
        let that = this;
        $.ajax({
            type: "POST",
            url: "/Board/FeedCreate",
            data: this.getInput(),
            contentType: false,
            processData: false,
            success: function (res) {
                console.log("success");
                var json = JSON.parse(res);
                console.log(json);
                that.receiveCreate(json);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("통신 실패.")
            }
        });
    },
    receiveCreate: function (json) {
        if (json.isSuccess) {
            alert("저장을 성공했습니다.");
            movepage("/Board/BoardView");
        }
        else {
            alert("저장을 실패했습니다.");
        }
    }
}