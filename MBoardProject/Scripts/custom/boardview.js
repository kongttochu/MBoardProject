

$(function () {

    init();
})

let init = function () {


    $(".join_btn").on('click', function () {
        if (login.state) {
            alert("로그인 상태입니다. 로그아웃 후 회원가입이 가능합니다.");
        }
        else movepage("/Board/JoinView");
    });

    login.init();

    header.title = _title;
    header.init();
}



