let isRunning = false;
const initialTime = 60;
let time = initialTime;
let timer;

//60초 타이머
function timerFun(phone) {
  const timer = setInterval(async () => {
    if (time > 0) {
      let min = Math.floor((time - 1) / 60);
      let sec = String((time - 1) % 60).padStart(2, "0");
      document.getElementById("LimitTime").innerText = `${min}:${sec}`;
      time--;
      console.log(time);
    } else {
      clearInterval(timer);
      await axios.post("http://localhost/tokens/delete", { phone }).then(() => {
        isRunning = false;
        time = initialTime;
        let min = Math.floor(time / 60);
        let sec = String(time % 60).padStart(2, "0");
        document.getElementById("LimitTime").innerText = `${min}:${sec}`;
        alert("인증번호를 새로 요청해주세요");
      });
    }
  }, 1000);
  return timer;
}

// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  console.log("인증 번호 전송");
  const p1 = document.getElementById("PhoneNumber01").value;
  const p2 = document.getElementById("PhoneNumber02").value;
  const p3 = document.getElementById("PhoneNumber03").value;
  const phone = p1 + p2 + p3;

  if (!isRunning) {
    isRunning = true;
    const res = await axios
      .post("http://localhost/tokens/phone", { phone })
      .then((res) => {
        if (res.data == "유효하지 않은 휴대폰번호") {
          isRunning = false;
          return alert("유효하지 않은 휴대폰번호입니다.");
        } else {
          document.querySelector("#ValidationInputWrapper").style.display =
            "flex";
          return true;
        }
      })
      .catch((err) => {
        if (err) console.log(err);
      });
    console.log(res);
    if (res) {
      timer = timerFun(phone);
    }
  } else {
    alert("인증번호를 입력해주세요.");
    return;
  }
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  console.log("핸드폰 인증 완료");
  const p1 = document.getElementById("PhoneNumber01").value;
  const p2 = document.getElementById("PhoneNumber02").value;
  const p3 = document.getElementById("PhoneNumber03").value;
  const phone = p1 + p2 + p3;
  const token = document.getElementById("TokenInput").value;
  const result = await axios
    .patch("http://localhost/tokens/phone", { phone, token })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err) console.log(err);
    });
  console.log(result.data);
  if (!result.data) {
    alert("휴대폰 인증이 되지 않았습니다.");
  } else if (result.data) {
    document.querySelector("#ValidationInputWrapper").style.display = "none";
    document.getElementById("NumberVailidation-Btn").innerText = "인증 완료";
    clearInterval(timer);
  }
};

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log("회원 가입 완료");
  const personal1 = document.getElementById("SignupPersonal1").value;
  const personal2 = document.getElementById("SignupPersonal2").value;
  const personal = personal1 + personal2;
  const p1 = document.getElementById("PhoneNumber01").value;
  const p2 = document.getElementById("PhoneNumber02").value;
  const p3 = document.getElementById("PhoneNumber03").value;
  const phone = p1 + p2 + p3;
  const prefer = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const pwd = document.getElementById("SignupPwd").value;

  const obj = {
    name: document.getElementById("SignupName").value,
    personal,
    phone,
    prefer,
    email,
    pwd,
  };

  const result = await axios
    .post("http://localhost/user", obj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err) console.log(err);
    });
  if (result.data === "에러!! 핸드폰 번호가 인증되지 않았습니다.") {
    alert("휴대폰 번호를 인증해주세요.");
  } else {
    alert("회원가입이 완료되었습니다.");
    location.href = "../menu/index.html";
  }
};
