// ฟังก์ชันแสดง popup
function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    
    popupMessage.textContent = message; // ตั้งค่าข้อความที่จะแสดง
    popup.style.display = 'flex'; // แสดง popup

    // ปิด popup เมื่อกดปุ่มปิด
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.onclick = function() {
        popup.style.display = 'none';
    }

    // ปิด popup เมื่อคลิกภายนอก
    window.onclick = function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    }
}

function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUf0d25c778650983159c407176aacb8135c25f1c99fee3bb610cf3ed618d7ae09a54d156d6b30b62192347c658e403a6a'
        },
        body: JSON.stringify({ "UserName": username, "PassWord": password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === true) {
            const popupMessage = `
                <strong>สถานะ:</strong> ${data.status ? "สำเร็จ" : "ไม่สำเร็จ"}<br>
                <strong>ประเภท:</strong> ${data.type}<br>
                <strong>ชื่อผู้ใช้:</strong> ${data.username}<br>
                <strong>สถานะที่ TU:</strong> ${data.tu_status}<br>
                <strong>รหัสสถานะ:</strong> ${data.statusid}<br>
                <strong>ชื่อภาษาไทย:</strong> ${data.displayname_th}<br>
                <strong>ชื่อภาษาอังกฤษ:</strong> ${data.displayname_en}<br>
                <strong>อีเมล:</strong> ${data.email}<br>
                <strong>ภาควิชา:</strong> ${data.department}<br>
                <strong>คณะ:</strong> ${data.faculty}
            `;

            document.getElementById('popup-message').innerHTML = popupMessage;
            document.getElementById('popup').style.display = 'block'; // Show popup
        } else {
            document.getElementById('message').innerText = "Login failed. Please try again.";
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to close popup
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

// ฟังก์ชันปิด popup
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Set canvas size to match the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create particle object
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - size * 2) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - size * 2) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        let color = '#fff';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Animate particles
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();

document.addEventListener('mousemove', (event) => {
    const light = document.createElement('div');
    light.className = 'mouse-light';
    light.style.left = `${event.pageX}px`;
    light.style.top = `${event.pageY}px`;
    document.body.appendChild(light);

    setTimeout(() => {
        light.remove();
    }, 500); // ลบเอฟเฟกต์แสงหลังจากแสดง 0.5 วินาที
});


