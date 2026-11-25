// Tổng thời gian ban đầu: 10 phút = 600 giây.
const INITIAL_TIME = 10 * 60;

let remainingSeconds = INITIAL_TIME;
let timerInterval = null;

const timerDisplay = document.getElementById("timer");
const statusText = document.getElementById("status");

const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");

const timeUpModal = document.getElementById("timeUpModal");
const closeModalButton = document.getElementById("closeModalButton");

// Chuyển số giây thành định dạng MM:SS.
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return String(minutes).padStart(2, "0") + ":" +
           String(secs).padStart(2, "0");
}

// Cập nhật nội dung và hiệu ứng của đồng hồ.
function updateDisplay() {
    timerDisplay.textContent = formatTime(remainingSeconds);

    // Khi còn dưới 1 phút, thêm hiệu ứng cảnh báo.
    if (remainingSeconds < 60 && remainingSeconds > 0) {
        timerDisplay.classList.add("warning");
    } else {
        timerDisplay.classList.remove("warning");
    }
}

// Dừng interval nếu nó đang chạy.
function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Hàm được gọi mỗi giây.
function countDown() {
    remainingSeconds--;

    if (remainingSeconds <= 0) {
        remainingSeconds = 0;
        updateDisplay();

        stopTimer();
        statusText.textContent = "Đã hết thời gian";
        timeUpModal.hidden = false;
        closeModalButton.focus();
        return;
    }

    updateDisplay();
}

// Bắt đầu đồng hồ.
function startTimer() {
    // Tránh tạo nhiều interval khi nhấn Bắt đầu liên tục.
    if (timerInterval !== null || remainingSeconds <= 0) {
        return;
    }

    statusText.textContent = "Đồng hồ đang chạy";
    timerInterval = setInterval(countDown, 1000);
}

// Tạm dừng đồng hồ.
function pauseTimer() {
    if (timerInterval === null) {
        return;
    }

    stopTimer();
    statusText.textContent = "Đồng hồ đã tạm dừng";
}

// Đặt lại về 10 phút.
function resetTimer() {
    stopTimer();

    remainingSeconds = INITIAL_TIME;
    updateDisplay();

    statusText.textContent = "Đồng hồ đã được đặt lại";
    timeUpModal.hidden = true;
}

// Đóng thông báo hết giờ.
function closeModal() {
    timeUpModal.hidden = true;
}

// Gắn sự kiện cho các nút.
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
closeModalButton.addEventListener("click", closeModal);

// Dọn dẹp interval khi người dùng rời khỏi trang.
window.addEventListener("pagehide", stopTimer);

// Hiển thị thời gian ban đầu khi mở trang.
updateDisplay();
