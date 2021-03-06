let login = {
    idx: 0,
    userid: "",
    usernm: "",
    state: false,
    init: function () {
        $(".login_btn").on('click', function () {
            if (!login.state) login.click();
        });

        $(".logout_btn").on('click', function () {
            if (login.state) login.click();
        });

        if (typeof (_login) != "undefined") {
            login.state = _login.isLogin;
            login.setLoginInfo(_login.IDX, _login.USERID, _login.USERNM);
        }
        login.refresh();
    },
    refresh: function () {
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
    setLoginInfo: function (idx, id, nm) {
        this.idx = idx;
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
            this.setLoginInfo(json.IDX, json.USERID, json.USERNM);
            //this.refresh();
            let befourl = "로그인페이지이전 URL";
            window.location.href = befourl;
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
        this.refresh();
    },
    loginStateView: function () {

        $(".login_box").hide();

        $(".username").text(this.usernm);
        $(".logout_box").show();
    },
    logoutStateView: function () {

        $(".logout_box").hide();

        this.setInput("", "");
        $(".login_box").show();
    }
}