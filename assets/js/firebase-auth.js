import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1Bw4S7ZDhVnvlORoASmQxNXblVJg0ELQ",
  authDomain: "ljm-8d094.firebaseapp.com",
  projectId: "ljm-8d094",
  storageBucket: "ljm-8d094.firebasestorage.app",
  messagingSenderId: "966417164354",
  appId: "1:966417164354:web:eabd41d2e8356f645125db"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* 요소 */
const loginModal = document.querySelector("#loginModal");
const signupModal = document.querySelector("#signupModal");

const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");

const signupOpenBtn = document.querySelector("#signupOpenBtn");
const signupCloseBtn = document.querySelector(".signup-modal__close");

const googleLoginBtn = document.querySelector("#googleLoginBtn");
const loginOpenBtns = document.querySelectorAll(".login-open");

/* 회원가입 모달 열기 */
if (signupOpenBtn && signupModal) {
  signupOpenBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signupModal.classList.add("active");
  });
}

/* 회원가입 모달 닫기 */
if (signupCloseBtn && signupModal) {
  signupCloseBtn.addEventListener("click", () => {
    signupModal.classList.remove("active");
  });
}

/* 일반 로그인 */
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#loginEmail").value;
    const password = document.querySelector("#loginPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("로그인되었습니다.");

      if (loginModal) {
        loginModal.classList.remove("active");
      }

    } catch (error) {
      console.error("로그인 오류:", error.code);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found"
      ) {
        alert("등록되지 않은 계정입니다. 회원가입을 진행해주세요.");

        if (signupModal) {
          signupModal.classList.add("active");
        }
      } else {
        alert("로그인에 실패했습니다.");
      }
    }
  });
}

/* 회원가입 */
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#signupEmail").value;
    const password = document.querySelector("#signupPassword").value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      alert("회원가입이 완료되었습니다.");

      if (signupModal) {
        signupModal.classList.remove("active");
      }

      if (loginModal) {
        loginModal.classList.remove("active");
      }

    } catch (error) {
      console.error("회원가입 오류:", error.code);

      if (error.code === "auth/email-already-in-use") {
        alert("이미 가입된 이메일입니다.");
      } else if (error.code === "auth/weak-password") {
        alert("비밀번호는 6자 이상 입력해주세요.");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    }
  });
}

/* 구글 로그인 */
if (googleLoginBtn) {
  googleLoginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithPopup(auth, provider);

      alert(`${result.user.displayName || "사용자"}님 로그인 성공!`);

      if (loginModal) {
        loginModal.classList.remove("active");
      }

    } catch (error) {
      console.error("구글 로그인 오류:", error.code);
      alert("구글 로그인 실패");
    }
  });
}

/* 로그인 상태 감지 */
onAuthStateChanged(auth, (user) => {
  const loginLinks = document.querySelectorAll(".login-open");
  const loginTexts = document.querySelectorAll(".login-open span");

  if (user) {
    console.log("로그인됨", user.email);

    loginTexts.forEach((text) => {
      text.textContent = "로그아웃";
    });

    loginLinks.forEach((link) => {
      link.onclick = async (e) => {
        e.preventDefault();

        const ok = confirm("로그아웃 하시겠습니까?");

        if (ok) {
          await signOut(auth);
          alert("로그아웃되었습니다.");
        }
      };
    });

  } else {
    console.log("로그아웃 상태");

    loginTexts.forEach((text) => {
      text.textContent = "로그인";
    });

    loginLinks.forEach((link) => {
      link.onclick = null;
    });
  }
});