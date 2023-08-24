const el_btn_connect = document.getElementById('connect');
const el_log_box = document.getElementById('log');
const el_info_box = document.getElementById('info');
const el_score_box = document.getElementById('score');
const el_collection_box = document.getElementById('collection');
const el_hr_temp = document.createElement('hr');
const el_ipt = document.getElementById('ipt');

const data = {
  address: '',
  network: '',
  isInput: false,
};
const constant = {
  mainNet: 'livenet',
  baseUrl: 'http://192.168.8.104:3030',
};
pageInit();

el_ipt.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    const addr = el_ipt.value;
    reset();
    data['address'] = addr;
    data['network'] = constant.mainNet;
    data['isInput'] = true;
    el_ipt.value = addr;
    accountInit();
  }
});
el_btn_connect.addEventListener('click', async function () {
  log('connect click');
  if (this.disabled) return;
  reset();
  if (typeof window.unisat === 'undefined') {
    window.alert('UniSat Wallet is not installed? Please install it first.');
    return;
  }
  data['isInput'] = false;
  try {
    const network = await unisat.getNetwork();
    if (network !== constant.mainNet) {
      await unisat.switchNetwork(constant.mainNet);
    }
    data.network = constant.mainNet;
    log('connect success address: ' + constant.mainNet);
  } catch (e) {
    alert('connect failed');
  }
  try {
    const address = await unisat.requestAccounts();
    data.address = address[0];
    log('connect success address: ' + address[0]);
    el_btn_connect.innerText = 'Connected';
    el_btn_connect.disabled = true;
    accountInit();
  } catch (e) {
    alert('connect failed');
  }

  unisat.on('accountsChanged', accountsChanged);
  unisat.on('networkChanged', (network) => {
    if (network !== constant.mainNet) {
      alert('Please switch to mainnet');
      window.location.reload();
    }
  });
});

async function pageInit() {
  log('page init');
  getCollections();
}

async function accountInit() {
  if (!data.address) return;
  log('start account init');

  const h1 = document.createElement('h1');
  h1.innerText = 'Base Info: ';
  el_info_box.appendChild(h1);
  info('address: ' + data.address);
  info('network: ' + data.network);
  if (!data.isInput) {
    getBalance();
    getInscription();
  }
  getApiInfo();
  append(el_hr_temp.cloneNode(), el_info_box);
}

async function getInscription() {
  log('start get inscriptions from unisat');
  try {
    const res = await unisat.getInscriptions();
    log('get inscriptions:' + JSON.stringify(res));
    info('get inscriptions from unisat: ' + res.total);
  } catch (e) {
    log('get inscription failed');
  }
}
async function getBalance() {
  log('start get balance from unisat');
  try {
    const res = await unisat.getBalance();
    log('get balance from unisat:' + JSON.stringify(res));
    info('balance: ' + res.total);
  } catch (e) {
    console.log(e);
    log('get balance failed');
  }
}
async function getApiInfo() {
  log('start get api ');
  let apiRes = null;
  try {
    apiRes = await fetch(constant.baseUrl + '/airdrop/' + data.address).then(
      (res) => res.json(),
    );
    log('get api info:' + JSON.stringify(apiRes));
  } catch (err) {
    log('get api info failed,err: ' + err);
  }
  if (apiRes) createScoreEl(apiRes);
}

async function getCollections() {
  let collections = null;
  try {
    log('start get collections');
    collections = await fetch(constant.baseUrl + '/collection').then((res) =>
      res.json(),
    );
    log('get collections count: ' + collections.length);
    console.log(res);
  } catch (err) {
    log('get collections failed,err: ' + err);
  }

  if (collections) createCollectionEl(collections);
}

function log(text) {
  const new_el = document.createElement('div');
  new_el.innerHTML = `<span style="color:#955555;">[${new Date().toLocaleString()}]</span> ${text}`;
  append(new_el, el_log_box);
  el_log_box.scrollTop = el_log_box.scrollHeight;
}

function info(text, className = '') {
  const new_el = document.createElement('div');
  new_el.className = className;
  new_el.innerText = text;
  append(new_el, el_info_box);
}

function append(el, root) {
  root.appendChild(el);
}

function accountsChanged(accounts) {
  log('accountsChanged: ' + accounts);
  reset();
  el_btn_connect.innerText = 'Connected';
  el_btn_connect.disabled = true;
  data.address = accounts[0];
  accountInit();
}
function createCollectionEl(collections) {
  const fragment = document.createDocumentFragment();
  if (collectionOpen.length) {
    const h1 = document.createElement('h1');
    h1.innerText = 'Support Collection: ';
    append(h1, el_collection_box);
  }
  collections.forEach((collection) => {
    fragment.appendChild(mkCollections(collection));
  });
  append(fragment, el_collection_box);
}

function createScoreEl(apiRes) {
  const fragment = document.createDocumentFragment();
  const levelCNName = ['新用户', '普通用户', '优质用户', '头部用户'];

  const h1 = document.createElement('h1');
  h1.innerText = 'User Info: ';
  fragment.appendChild(h1);

  const bananas = document.createElement('div');
  bananas.innerHTML = `your bananas：<span style="color:green;">${apiRes.airdrop[0]}</span> <span style='color:yellow;'>${apiRes.airdrop[1]}</span> <span style="color:red;">${apiRes.airdrop[2]}</span> <span style='color:purple;'>${apiRes.airdrop[3]}</span>`;
  fragment.appendChild(bananas);

  const level = document.createElement('div');
  level.innerText = 'your level: ' + levelCNName[apiRes.level];
  fragment.appendChild(level);

  const count = document.createElement('div');
  count.innerText =
    'your normal inscriptions count: ' +
    apiRes.normalInscriptions.length +
    '\n your blue-chip inscriptions count: ' +
    apiRes.blueChipInscriptions.length;
  fragment.appendChild(count);

  if (apiRes.normalInscriptions.length) {
    const normal = document.createElement('div');
    normal.innerText = 'your normal inscriptions: ';
    apiRes.normalInscriptions.forEach((item) => {
      normal.appendChild(mkInscription(item));
    });
    fragment.appendChild(normal);
  }

  if (apiRes.blueChipInscriptions.length) {
    const blueChip = document.createElement('div');
    blueChip.innerText = 'your blue-chip inscriptions : ';
    apiRes.blueChipInscriptions.forEach((item) => {
      blueChip.appendChild(mkInscription(item));
    });
    fragment.appendChild(blueChip);
  }
  fragment.appendChild(el_hr_temp.cloneNode());

  append(fragment, el_score_box);
}

function mkInscription(inscription) {
  const a = document.createElement('a');
  a.innerText =
    inscription.name || `Inscription #${inscription.meInscriptionNumber}`;
  a.href = `https://ordinals.com/inscription/${inscription.inscriptionId}`;
  a.target = '_blank';
  a.style.marginRight = '10px';
  return a;
}

function mkCollections(collection) {
  const div = document.createElement('div');
  div.innerText = collection.collectionName;
  div.style.marginRight = '10px';
  div.onclick = function () {
    collectionOpen(collection);
  };
  return div;
}

function collectionOpen(collection) {
  console.log('collection: ', collection);
  alert(`
  【${collection.collectionName}】
  【supply：${collection.totalSupply}】
  ${collection.collectionDesc}
  `);
  window.open(
    `https://magiceden.io/ordinals/marketplace/${collection.collectionSymbol}`,
    '_blank',
  );
}

function reset() {
  el_btn_connect.innerText = 'Click Connect Wallet';
  el_btn_connect.disabled = false;

  el_info_box.innerText = '';
  el_score_box.innerText = '';

  el_ipt.value = '';
  data.address = '';
  data.network = '';
  data.isInput = false;
}
