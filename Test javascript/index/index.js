let discountButton = document.getElementById('discount-button');
let message = document.getElementById('message');

discountButton.addEventListener('click',() => {
    message.innerHTML = 'ตอนนี้หมดเวลาสนุกของคุณแล้วสิ';
})