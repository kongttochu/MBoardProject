

$(function () {

    init();
})

let init = function () {
    $(".login_btn").on('click', function () {
        if (!login.state) login.click();
    });

    $(".logout_btn").on('click', function () {
        if (login.state) login.click();
    });

    $(".join_btn").on('click', function () {
        if (login.state) {
            alert("로그인 상태입니다. 로그아웃 후 회원가입이 가능합니다.");
        }
        else movepage("/Board/JoinView");
    });

    if (typeof(_login) != "undefined") {
        login.state = _login.isLogin;
        login.setLoginInfo(_login.USERID, _login.USERNM);
    }
    login.init();
}



let login = {
    userid: "",
    usernm: "",
    state: false,
    init: function () {
        if (!this.state) this.logoutStateView();
        else this.loginStateView();
    },
    click: function () {

        if (!this.state) {
            let info = this.getInput();
            if (info.USERID == '' || info.USERPW == '') alert('모두 입력하세요.');
            else this.sendLogin();
        }
        else this.sendLogout();;
    },
    getInput: function () {
        let val = { USERID: $(".id_window").val(), USERPW: $(".pw_window").val() };
        return val;
    },
    setInput: function (id, pw) {
        $(".id_window").val(id);
        $(".pw_window").val(pw);
    },
    setLoginInfo: function (id, nm) {
        this.userid = id;
        this.usernm = nm;
    },
    sendLogin: function () {
        let that = this;
        $.ajax({
            type: "POST",
            url: "/Board/UserLogin",
            data: this.getInput(),
            success: function (res) {
                console.log("success");
                var json = JSON.parse(res);
                console.log(json);
                that.receivLogin(json);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("통신 실패.")
            }
        });
    },
    receivLogin: function (json) {
        if (json.isLogin) {
            this.state = true;
            this.setLoginInfo(json.USERID, json.USERNM);
            this.init();
        }
        else alert("아이디와 비밀번호가 일치하지 않습니다.");
    },
    sendLogout: function () {
        let that = this;
        $.ajax({
            type: "POST",
            url: "/Board/UserLogout",
            data: {},
            success: function (res) {
                console.log("success");
                that.receivLogout();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("통신 실패.")
            }
        });
    },
    receivLogout: function () {
        alert("로그아웃이 완료됐습니다.");
        this.state = false;
        this.setLoginInfo("", "");
        this.init();
    },
    loginStateView: function () {

        $(".login_box").hide();

        $(".logout_box .username").val = this.usernm;
        $(".logout_box").show();
    },
    logoutStateView: function () {

        $(".logout_box").hide();

        this.setInput("", "");
        $(".login_box").show();
    }
}