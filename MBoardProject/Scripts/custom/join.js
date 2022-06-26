$(function () {
    init();
})

let init = function () {

    $(".join_btn").on('click', function () {
        if ($(".name_window").val() == '' || $(".id_window").val() == '' || $(".pw_window").val() == '') {
            alert('모두 입력하세요.');
        }
        else {
            sendConfirmJoin();
        }
    });
}

let sendConfirmJoin = function () {
    $.ajax({
        type: "POST",
        url: "/Board/UserJoin",
        data: { USERNM: $(".name_window").val(), USERID: $(".id_window").val(), USERPW: $(".pw_window").val() },
        success: function (res) {
            console.log("success");
            var json = JSON.parse(res);
            console.log(json);
            comfirmJoin(json);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("통신 실패.")
        }
    });
}

let comfirmJoin = function (json) {
    if (json.isJoin) {
        alert("가입을 성공했습니다.");
        movepage("/Board/BoardView");
    }
    else {
        if (json.isExist) alert("이미 존재하는 아이디거나 사용자 이름입니다.");
        else alert("가입에 실패했습니다.");
    }
}