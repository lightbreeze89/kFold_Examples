
const user_id = document.cookie.match('(^|;)\\s*uid\\s*=\\s*([^;]+)')?.pop() || '';

GM_addStyle(`
#leaderBoard {
  padding-top: 32px;
  position: relative;
}
#lbr-${user_id} {
  position: absolute;
  width: 100%;
  top: 0;
}
`);