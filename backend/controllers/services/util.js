// getDate : 현재 날짜 및 시간 생성
export function getDate() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours() + 9;
  const min = date.getMinutes();
  const sec = date.getSeconds();
  return `${yyyy}년 ${mm}월 ${dd}일 ${hh}:${min}:${sec}`;
}

// filterPsersonal : 주민등록번호 필터링
export function filterPersonal(personal) {
  const filterNumber = new Array(7).fill("*").join("");
  const nofilterNmber = personal.split("-");
  return nofilterNmber[0] + "-" + filterNumber;
}
