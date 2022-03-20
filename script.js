window.onload = (e) => {
  const hash = e.srcElement.URL.split('#')[1];
  if (hash === 'play') showGameBoard();

  const gameContainer = document.querySelector('#game-container');

  gameContainer.onclick = async (e) => {
    console.log(e.clientY, e.screenY, e.layerY, e.pageY, e.y);
    const hand = document.querySelector('#hand');
    const x = e.clientX - hand.width;
    const y = e.clientY - hand.width;
    await tampol(x, y);
    await counter();
  };

  const imgInp = document.querySelector('input');
  const image = document.querySelector('#korban');

  imgInp.onchange = (e) => {
    if (e.target.files.length < 1) return null;
    const file = e.target.files[0];
    if (!['image/webp', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) return null;
    const reader = new FileReader();
    reader.onloadend = () => {
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  };
};

window.onhashchange = (e) => {
  const hash = e.newURL.split('#')[1];
  if (hash !== 'play') return null;
  showGameBoard();
};

const showGameBoard = () => {
  document.querySelector('#intro').style.display = 'none';
  document.querySelector('#game').style.display = 'block';
};

const playAudio = () => {
  const audio = new Audio();
  audio.src = './assets/slap.mp3';
  audio.play().then((res) => {
    console.log('ok');
  });
};

const tampol = async (x, y) => {
  const hand = document.querySelector('#hand');
  hand.style.marginLeft = `${x}px`;
  hand.style.marginTop = `${y - 50}px`;
  hand.style.transform = `rotate(45deg)`;
  await playAudio();
  setTimeout(() => {
    hand.style.transform = `rotate(0)`;
  }, 300);
};

const counter = async () => {
  const count = document.querySelector('#count');
  var last = parseInt(count.innerText);
  textChanger(last);
  count.innerText = ++last;
};

const textChanger = (last) => {
  const field = document.querySelector('#teks');
  if (last > 1000) return (field.innerHTML = '<span class="text-red-800">BUSET!! HAJAR HANTAM TEROOS!!!!!!!!</span>');
  if (last > 500) return (field.innerHTML = '<span class="text-red-500">kalau ada masalah keluarga, curhat sini! gak usah gabut sampe 500+</span>');
  if (last > 100) return (field.innerHTML = '<span class="text-red-400">kamu kalau ada masalah pribadi, langsung datangin orangnya!</span>');
  if (last > 50) return (field.innerHTML = '<span class="text-gray-700">buset! boleh juga kamu ya!</span>');
  if (last > 10) return (field.innerHTML = '<span class="text-gray-500">Kamu masih pemula dalam baku hantam!</span>');
};
