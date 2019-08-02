// (function () {
    const numbers = [];
    let currentNumber = 1,
        startTime,
        endTime;

    const canvas = document.getElementById("canvas"),
        box = document.getElementById("libox"),
        scorePage = document.getElementById("scorePage"),
        score = document.getElementById("score"); 
    const titleArray = ["棒棒哒！","超过全国%98的用户！"];

    const screenWidth = document.documentElement.clientWidth - 10,
        screenHeight = document.documentElement.clientHeight - 30;

    canvas.style.width = screenWidth + "px";
    canvas.style.height = screenHeight + "px";

    let boxLenth = screenWidth < screenHeight ? screenWidth : screenHeight;
    boxLenth = Math.floor(boxLenth / 5) * 5;

    box.style.width = boxLenth + "px";
    box.style.height = boxLenth + "px";

    box.style.marginLeft = "-" + (boxLenth / 2) + "px";
    box.style.marginTop = "-" + (boxLenth / 2) + "px";

    function initArray(array) {
        for (let index = 1; index <= 25; index++) array.push(index);
    }

    function breakSort(array) {

        for (var i = 0, len = array.length; i < len; i++) {
            // 随机选择一个队友
            var randomIndex = i + Math.floor(Math.random() * (len - i));
            // 咱俩换换，找别人换过的相当于出列了，因此上面的 randomIndex 需要在剩下的人当中挑选
            var temp = array[i];
            array[i] = array[randomIndex];
            array[randomIndex] = temp;
        }
    }

    function init() {
        initArray(numbers);
        breakSort(numbers);
        createLi();
        // document.getElementById("item_1").className = "clickLi";
        document.getElementById("item_1").addEventListener("touchstart", addNumber);
    }
    function addNumber() {
        if (currentNumber === 1) {
            startTime = Date.now();
        }
        if (currentNumber >= 25) {
            endTime = Date.now();
            score.innerText = `${(new Number((endTime - startTime) / 1000))} 秒`;
            
            document.getElementById("myModalLabel").innerText = titleArray[Math.floor(Math.random()*titleArray.length)];
            scorePage.style.display = "block";
            scorePage.style.opacity = 1;
            
            // $("#scorePage").modal('show');
        }

        document.getElementById(`item_${(currentNumber - 1) || 1}`).className = ""
        document.getElementById(`item_${currentNumber}`).className = "clickLi";
        // setTimeout(() =>
        //     document.getElementById(`item_${currentNumber}`).className = "",
        //     500
        // );
        currentNumber++;

        // document.getElementById(`item_${currentNumber}`).className = "clickLi";
        document.getElementById(`item_${currentNumber - 1}`).removeEventListener("touchstart", addNumber);
        document.getElementById(`item_${currentNumber}`).addEventListener("touchstart", addNumber);
    }
    function createLi() {
        const liLength = (boxLenth / 5) - 2;
        for (const number of numbers) {
            const newLi = document.createElement('li');
            newLi.innerText = number;
            newLi.style.width = liLength + "px";
            newLi.style.height = liLength + "px";
            newLi.style.lineHeight = liLength + "px";
            newLi.id = `item_${number}`;
            box.appendChild(newLi);
        }
    }
    init();
// })();