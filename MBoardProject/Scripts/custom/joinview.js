$(function () {
    init();
})

let init = function () {

    login.init();
    if (login.state == true) {
        alert("로그인 상태일 때는 회원 가입을 하실 수 없습니다. \n로그아웃 후 진행해 주세요.");
        movepage("/Board/BoardView");
    }

    info.init();

    header.title = _title;
    header.init();

    join.init();
}

let join = {
    init: function () {
        let that = this;
        $(".join_btn").on('click', function () {
            that.click();
        });
    },
    click: function () {
        if (this.validation()) this.sendJoin();
        else alert('모두 입력하세요.');
    },
    sendJoin: function () {
        let that = this;
        $.ajax({
            type: "POST",
            url: "/Board/UserJoin",
            data: $("#form_join").serialize(),
            success: function (res) {
                console.log("success");
                var json = JSON.parse(res);
                console.log(json);
                that.receiveJoin(json);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("통신 실패.")
            }
        });
    },
    receiveJoin: function (json) {
        if (json.isJoin) {
            //alert("가입을 성공했습니다.");
            movepage("/Board/BoardView", "가입을 성공했습니다.");
        }
        else {
            if (json.isExist) alert("이미 존재하는 아이디거나 사용자 이름입니다.");
            else alert("가입에 실패했습니다.");
        }
    },
    getInput: function () {
        return {
            USERNM: $("#form_join .name_window").val(),
            USERID: $("#form_join .id_window").val(),
            USERPW: $("#form_join .pw_window").val()
        };
    },
    validation: function () {
        if ($("#form_join .name_window").val() == ''
            || $("#form_join .id_window").val() == ''
            || $("#form_join .pw_window").val() == '') {
            return true;
        }
        else false;
    }
}